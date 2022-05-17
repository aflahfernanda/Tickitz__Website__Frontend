import React, { useState, useEffect } from "react";
import "./manageMovie.css";
import AdminNavbar from "../../components/header/AdminNavbar/index";
import Footer from "../../components/footer/index";
import AdminCard from "../../components/adminCard";

import { Link, Navigate, useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import axios from "../../utils/axios";

import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovie, postMovie, updateMovie, deleteMovie } from "../../stores/actions/movie";

function ManageMovie() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const limit = 8;
  const [page, setPage] = useState(params.page ? params.page : "1");
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const movie = useSelector((state) => state.movie);
  const [search, setSearch] = useState({
    search: ""
  });
  // const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getdataMovie();
  }, []);
  useEffect(() => {
    getdataMovie();
    const params = {};
    if (page !== "1") {
      params.page = page;
    }
    if (search) {
      params.search = search;
    }
    if (sort) {
      params.sort = sort;
    }
    if (isUpdate) {
      params.isUpdate = isUpdate;
    }
    navigate({
      pathname: "/manageMovie",
      search: `?${createSearchParams(params)}`
    });
  }, [page, search, sort, isUpdate]);
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

  const getdataMovie = async () => {
    try {
      await dispatch(getDataMovie(page, limit, sort));
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSearch = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      setSearch(event.target.value);
      // console.log(event.target.value);
    }
  };
  const handleSort = (event) => {
    console.log(event.target.value);
    setSort(event.target.value);
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
      handleReset();
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
    handleReset();
  };
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteMovie(id));
    getDataMovie();
  };
  const handleReset = () => {
    setForm({
      name: "",
      director: "",
      category: "",
      releaseDate: "",
      cast: "",
      duration: "",
      synopsis: "",
      image: null
    });
  };
  return (
    <div className="container">
      <AdminNavbar />
      <h2 className="manageMovie__tittle">Form Movie</h2>
      {/* ------------------------------manageMovie Input-------------------------------- */}
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
        <div className="manageMovie__updateMovie">
          <div className="manageMovie__updateMovie--image">
            <div>
              <input
                type="file"
                name="image"
                onChange={(event) => handleChangeForm(event)}
                className="manageMovie__updateMovie--image--file"
              />
              {image && (
                <img
                  src={image}
                  alt="Image Movie Preview"
                  width="50%"
                  className="manageMovie__updateMovie--image--preview"
                />
              )}
            </div>
          </div>
          <div className="manageMovie__updateMovie--name">
            <h5 className="manageMovie__header">Movie Name</h5>
            <input
              type="search"
              placeholder="input movie name"
              name="name"
              onChange={(event) => handleChangeForm(event)}
              value={form.name}
              className="manageMovie__inputType"
            />
            <h5 className="manageMovie__header">Director</h5>
            <input
              type="search"
              placeholder="input director name"
              name="director"
              onChange={(event) => handleChangeForm(event)}
              value={form.director}
              className="manageMovie__inputType"
            />
            <h5 className="manageMovie__header">Release Date</h5>
            <input
              type="date"
              placeholder="input release date"
              name="releaseDate"
              onChange={(event) => handleChangeForm(event)}
              value={form.releaseDate}
              className="manageMovie__inputType"
            />
          </div>
          <div className="manageMovie__updateMovie--category">
            <h5 className="manageMovie__header">Category</h5>
            <input
              type="search"
              placeholder="input category"
              name="category"
              onChange={(event) => handleChangeForm(event)}
              value={form.category}
              className="manageMovie__inputType"
            />
            <h5 className="manageMovie__header">Cast</h5>
            <input
              type="search"
              placeholder="input cast name"
              name="cast"
              onChange={(event) => handleChangeForm(event)}
              value={form.cast}
              className="manageMovie__inputType"
            />
            <div className="manageMovie__updateMovie--duration">
              <div className="manageMovie__updateMovie--durationHour">
                <h5 className="manageMovie__header">Duration Hour</h5>
                <input
                  type="search"
                  placeholder="input hour"
                  name="duration"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.duration}
                  className="manageMovie__inputType"
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
          <h3 className="manageMovie__header">synopsis</h3>
          <input
            type="search"
            placeholder="input synopsis"
            name="synopsis"
            onChange={(event) => handleChangeForm(event)}
            value={form.synopsis}
            className="manageMovie__inputTypeSynopsis"
          />
        </div>
        <div className="manageMovie__submitReset">
          <button className="manageMovie__submitReset--button">Reset</button>
          <button type="submit" className="manageMovie__submitReset--button">
            {isUpdate ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      {/* ------------------------------manageMovie Input-------------------------------- */}
      <div className="dataMovie__header">
        <h2 className="dataMovie">Data Movie</h2>
        <div className="sortSearch">
          <select name="" id="" onChange={handleSort} className="sortSearch__sort">
            <option value="name ASC"> From Top</option>
            <option value="name DESC"> From Bottom</option>
          </select>
          <input
            type="search"
            placeholder="searchMovieName"
            onKeyPress={() => handleSearch(event)}
            className="sortSearch__search"
          />
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
        className="pagination"
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
