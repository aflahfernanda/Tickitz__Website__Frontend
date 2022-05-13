import React, { useState, useEffect } from "react";
import "./manageMovie.css";
import Navbar from "../../components/header/Navbar/index";
import Footer from "../../components/footer/index";
import AdminCard from "../../components/adminCard";

import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovie, postMovie, updateMovie, deleteMovie } from "../../stores/actions/movie";

function ManageMovie() {
  const limit = 8;
  const search = "Lupin";
  const [page, setPage] = useState(1);

  useEffect(() => {
    getdataMovie();
  }, []);
  useEffect(() => {
    getdataMovie();
  }, [page]);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    director: "",
    category: "",
    releaseDate: "",
    cast: "",
    duration: "",
    synopsis: "",
    image: null
  });
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const movie = useSelector((state) => state.movie);
  const getdataMovie = async () => {
    try {
      await dispatch(getDataMovie(page, limit));
    } catch (error) {
      console.log(error.response);
    }
  };

  const getSearchMovie = async () => {
    try {
      const resultSearch = await axios.get(
        `movie?page=${page}&limit=${limit}&searchName=${search}`
      );
      console.log(resultSearch);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    console.log(id);
  };
  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };

  const handleChangeForm = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(form);
      setImage(null);
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      dispatch(postMovie(formData));
      getDataMovie();
    } catch (error) {
      console.log(error.response);
    }
  };
  const setUpdate = (data) => {
    const { id, name, director, category, releaseDate, cast, duration, synopsis, image } = data;
    setForm({
      ...form,
      name,
      director,
      category,
      releaseDate,
      cast,
      duration,
      synopsis,
      image
    });
    setIdMovie(id);
    setIsUpdate(true);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(form);
    console.log(idMovie);
    setIsUpdate(false);
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    dispatch(updateMovie(idMovie, formData));
    getDataMovie();
  };
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteMovie(id));
    getDataMovie();
  };
  return (
    <div className="container">
      <Navbar />
      <h2>Form Movie</h2>
      {/* ------------------------------manageMovie Input-------------------------------- */}
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
        <div className="manageMovie__updateMovie">
          <div className="manageMovie__updateMovie--image">
            <div>
              {image && <img src={image} alt="Image Movie Preview" width="50%" />}
              <input type="file" name="image" onChange={(event) => handleChangeForm(event)} />
            </div>
          </div>
          <div className="manageMovie__updateMovie--name">
            <h5>Movie Name</h5>
            <input
              type="search"
              placeholder="input movie name"
              name="name"
              onChange={(event) => handleChangeForm(event)}
              value={form.name}
            />
            <h5>Director</h5>
            <input
              type="search"
              placeholder="input director name"
              name="director"
              onChange={(event) => handleChangeForm(event)}
              value={form.director}
            />
            <h5>Release Date</h5>
            <input
              type="date"
              placeholder="input release date"
              name="releaseDate"
              onChange={(event) => handleChangeForm(event)}
              value={form.releaseDate}
            />
          </div>
          <div className="manageMovie__updateMovie--category">
            <h5>Category</h5>
            <input
              type="search"
              placeholder="input category"
              name="category"
              onChange={(event) => handleChangeForm(event)}
              value={form.category}
            />
            <h5>Cast</h5>
            <input
              type="search"
              placeholder="input cast name"
              name="cast"
              onChange={(event) => handleChangeForm(event)}
              value={form.cast}
            />
            <div className="manageMovie__updateMovie--duration">
              <div className="manageMovie__updateMovie--durationHour">
                <h5>Duration Hour</h5>
                <input
                  type="search"
                  placeholder="input hour"
                  name="duration"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.duration}
                />
              </div>
              {/* <div className="manageMovie__updateMovie--durationMinute">
                <h5>Duration Minute</h5>
                <input
                  type="search"
                  placeholder="input minute"
                  name="durationMinute"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.duration}
                />
              </div> */}
            </div>
          </div>
          {/* ------------------------------manageMovie Input-------------------------------- */}
        </div>
        <div>
          <h3>synopsis</h3>
          <input
            type="search"
            placeholder="input synopsis"
            name="synopsis"
            onChange={(event) => handleChangeForm(event)}
            value={form.synopsis}
          />
        </div>

        <button>Reset</button>
        <button type="submit">{isUpdate ? "Update" : "Submit"}</button>
      </form>
      {/* ------------------------------manageMovie Input-------------------------------- */}
      <div className="dataMovie__header">
        <h2 className="dataMovie">Data Movie</h2>
        <div className="sortSearch">
          <input type="search" placeholder="sort" />
          <input type="search" placeholder="search" />
        </div>
      </div>
      <div className="dataMovie__update">
        {movie.isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          movie.data.map((item) => (
            <AdminCard
              data={item}
              key={item.id}
              handleDetail={handleDetailMovie}
              setUpdate={setUpdate}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={movie.pageInfo.totalPage}
        onPageChange={handlePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        initialPage={page - 1}
      />
      <Footer />
    </div>
  );
}

export default ManageMovie;
