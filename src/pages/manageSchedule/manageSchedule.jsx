import React, { useState, useEffect } from "react";
import "./manageSchedule.css";
import AdminNavbar from "../../components/header/AdminNavbar";
import Footer from "../../components/footer/index";
import ScheduleCard from "../../components/ScheduleCard";

import { Link, Navigate, useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import axios from "../../utils/axios";

import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovie, postMovie, updateMovie, deleteMovie } from "../../stores/actions/movie";
import {
  getDataSchedule,
  postSchedule,
  updateSchedule,
  deleteSchedule
} from "../../stores/actions/schedule";
import AdminCard from "../../components/adminCard";

function ManageSchedule() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const limit = 8;
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const movie = useSelector((state) => state.movie);
  const schedule = useSelector((state) => state.schedule);
  const [form, setForm] = useState({
    movieId: "",
    price: "",
    premiere: "",
    location: "",
    dateStart: "",
    dateEnd: "",
    time: []
  });

  useEffect(() => {
    getdataSchedule();
  }, []);
  useEffect(() => {
    getdataSchedule();
    const params = {};
    if (page !== "1") {
      params.page = page;
    }
    if (isUpdate) {
      params.isUpdate = isUpdate;
    }
    navigate({
      pathname: "/manageSchedule",
      search: `?${createSearchParams(params)}`
    });
  }, [page, isUpdate]);

  const getdataSchedule = async () => {
    try {
      await dispatch(getDataSchedule(page, limit));
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
    console.log(data);
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
      dispatch(postSchedule(formData));
      getDataSchedule();
    } catch (error) {
      console.log(error.response);
    }
  };

  const setUpdate = (data) => {
    const { id, name, movieId, price, premiere, location, dateStart, dateEnd, time } = data;
    setForm({
      ...form,
      id,
      name,
      movieId,
      price,
      premiere,
      location,
      dateStart,
      dateEnd,
      time
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
    dispatch(updateSchedule(idMovie, formData));
    getDataSchedule();
  };
  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteMovie(id));
    getDataMovie();
  };
  const handleReset = (id) => {
    console.log(id);
    dispatch(deleteMovie(id));
    getDataMovie();
  };
  return (
    <div className="container">
      <AdminNavbar />
      <h2 className="manageMovie__tittle">Form Scehdule</h2>
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
              placeholder="input director name"
              name="name"
              onChange={(event) => handleChangeForm(event)}
              value={form.name}
              className="manageMovie__inputType"
            />
            {/* <select name="movie" id="" onChange={(event) => handleChangeForm(event)}>
              {schedule.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select> */}
            <h5 className="manageMovie__header">Price</h5>
            <input
              type="search"
              placeholder="input director name"
              name="price"
              onChange={(event) => handleChangeForm(event)}
              value={form.price}
              className="manageMovie__inputType"
            />
            <h5 className="manageMovie__header">Premiere</h5>
            <input
              type="search"
              placeholder="input release date"
              name="premiere"
              onChange={(event) => handleChangeForm(event)}
              value={form.premiere}
              className="manageMovie__inputType"
            />
          </div>
          <div className="manageMovie__updateMovie--category">
            <h5 className="manageMovie__header">Location</h5>
            <input
              type="search"
              placeholder="input category"
              name="location"
              onChange={(event) => handleChangeForm(event)}
              value={form.location}
              className="manageMovie__inputType"
            />
            <h5 className="manageMovie__header">Date Start</h5>
            <input
              type="search"
              placeholder="input cast name"
              name="dateStart"
              onChange={(event) => handleChangeForm(event)}
              value={form.dateStart}
              className="manageMovie__inputType"
            />
            <div className="manageMovie__updateMovie--duration">
              <div className="manageMovie__updateMovie--durationHour">
                <h5 className="manageMovie__header">Date End</h5>
                <input
                  type="search"
                  placeholder="input hour"
                  name="dateEnd"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.dateEnd}
                  className="manageMovie__inputType"
                />
              </div>
              <div className="manageMovie__updateMovie--time">
                <div className="manageMovie__updateMovie--time">
                  <h5 className="manageMovie__header">Time</h5>
                  <input
                    type="search"
                    placeholder="input hour"
                    name="time"
                    onChange={(event) => handleChangeForm(event)}
                    value={form.time}
                    className="manageMovie__inputType"
                  />
                </div>
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
        <div className="manageMovie__submitReset">
          <button className="manageMovie__submitReset--button">Reset</button>
          <button type="submit" className="manageMovie__submitReset--button">
            {isUpdate ? "Update" : "Submit"}
          </button>
        </div>
      </form>
      {/* ------------------------------manageMovie Input-------------------------------- */}
      <div className="dataMovie__header">
        <h2 className="dataMovie">Data Schedule</h2>
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
          schedule.data.map((item) => (
            <ScheduleCard
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
        pageCount={schedule.pageInfo.totalPage}
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

export default ManageSchedule;
