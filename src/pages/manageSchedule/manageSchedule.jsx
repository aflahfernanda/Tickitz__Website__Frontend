import React, { useState, useEffect } from "react";
import "./manageSchedule.css";
import Navbar from "../../components/header/Navbar";
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
  const [scheduleId, setScheduleId] = useState("");
  const params = Object.fromEntries([...searchParams]);
  const limit = 100;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [scheduleLocation, setScheduleLocation] = useState([]);
  const [image, setImage] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchMovieId, setSearchMovieId] = useState("1");
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
  }, [searchMovieId]);
  useEffect(() => {
    getdataMovie();
  }, []);
  useEffect(() => {
    getdataMovieId();
  }, []);
  useEffect(() => {
    getdataScheduleLocation();
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
  }, [page, isUpdate, sort, searchDate]);
  console.log(schedule);
  const getdataMovie = async () => {
    try {
      await dispatch(getDataMovie(page, limit, sort, search));
      getdataMovieId();
    } catch (error) {
      console.log(error.response);
    }
  };
  const getdataMovieId = async () => {
    try {
      const result = await axios.get(`movie/${searchMovieId}`);

      setImage(result.data.data[0].image);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getdataScheduleLocation = async () => {
    try {
      const result = await dispatch(getDataSchedule(page, limit, "", searchMovieId, ""));
      setScheduleLocation(result.action.payload.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getdataSchedule = async () => {
    try {
      await dispatch(getDataSchedule(page, limit, sort, searchMovieId, searchDate));
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSort = (event) => {
    console.log(event.target.value);
    setSort(event.target.value);
  };
  const handleDetailMovie = (id) => {
    console.log(id);
  };
  console.log(scheduleId);
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
      await dispatch(postSchedule(form));
      alert("Succes Create Schedule, New Schedule Has Been Added");
      getdataSchedule();
      handleReset();
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
  console.log(form);
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(form);
    console.log(idMovie);
    setIsUpdate(false);
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    await dispatch(updateSchedule(idMovie, form));
    alert("Succes Update Schedule");
    getdataSchedule();
    handleReset();
  };
  const handleDelete = async (id) => {
    console.log(id);
    await dispatch(deleteSchedule(id));
    alert("Succes Delete Schedule");
    getdataSchedule();
  };
  const handleReset = () => {
    setForm({
      movieId: "",
      price: "",
      premiere: "",
      location: "",
      dateStart: "",
      dateEnd: "",
      time: []
    });
  };
  const handleDataMovie = (e) => {
    setSearchMovieId(e.target.value);
    setForm({ ...form, movieId: e.target.value });
  };
  const handleFormPremiere = (value) => {
    setForm({ ...form, premiere: value });
  };
  const handleDate = (event) => {
    setSearchDate(event.target.value);
    // if (dateChange) {
    //   return Date;
    // }
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="manageMovie__tittle">a</h2>
        {/* ------------------------------manageMovie Input-------------------------------- */}
        <h2 className="manageMovie__tittles">Form Scehdule</h2>
        <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
          <div className="manageMovie__updateMovie">
            <div className="manageMovie__updateMovie--image" style={{ border: "none" }}>
              <img
                src={
                  image
                    ? `https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${image}`
                    : "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/movie/ekmnkymc7uyk2uk0cxru.jpg"
                }
                alt="Image Movie Preview"
                width="50%"
                // style={{ marginTop: "50px" }}
                className="manageMovie__updateMovie--image--preview"
              />
            </div>
            <div className="manageMovie__updateMovie--name">
              <h5 className="manageMovie__header">Movie Name</h5>
              <select name="Movie" className="manageMovie__inputTypes" onChange={handleDataMovie}>
                {movie.data.map((item) => (
                  <option key={item.id} value={item.id} id={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <h5 className="manageMovie__header">Price</h5>
              <input
                type="search"
                placeholder="input Price"
                name="price"
                onChange={(event) => handleChangeForm(event)}
                value={form.price}
                className="manageMovie__inputType"
              />
              <h5 className="manageMovie__header">Premiere</h5>
              <div className="manageSchedule__premiereFlex">
                <div
                  onClick={(value) => handleFormPremiere("hiflix")}
                  className="manageSchedule__premiereName">
                  <img
                    src={require("../../assets/assets/VectorCinema3.png")}
                    alt=""
                    onClick={(value) => handleFormPremiere("hiflix")}
                  />
                </div>
                <div className="manageSchedule__premiereName">
                  <img
                    src={require("../../assets/assets/VectorCinema1.png")}
                    alt=""
                    onClick={(value) => handleFormPremiere("ebu.id")}
                    width="90%"
                  />
                </div>
                <div className="manageSchedule__premiereName">
                  <img
                    src={require("../../assets/assets/VectorCinema2.png")}
                    alt=""
                    onClick={(value) => handleFormPremiere("CineOne21")}
                  />
                </div>
              </div>
            </div>
            <div className="manageMovie__updateMovie--category">
              <h5 className="manageMovie__header">Location</h5>
              <input
                type="search"
                placeholder="input location"
                name="location"
                onChange={(event) => handleChangeForm(event)}
                value={form.location}
                className="manageMovie__inputType"
              />
              <div className="manageMovie__updateMovie--duration">
                <div className="manageMovie__updateMovie--durationHour">
                  <h5 className="manageMovie__header">Date Start</h5>
                  <input
                    type="date"
                    placeholder="input release date"
                    name="dateStart"
                    onChange={(event) => handleChangeForm(event)}
                    value={form.dateStart.split("T")[0]}
                    className="manageMovie__inputType"
                  />
                </div>
                <div className="manageMovie__updateMovie--time">
                  <div className="manageMovie__updateMovie--time">
                    <h5 className="manageMovie__header">Date End</h5>
                    <input
                      type="date"
                      placeholder="input release date"
                      name="dateEnd"
                      onChange={(event) => handleChangeForm(event)}
                      value={form.dateEnd.split("T")[0]}
                      className="manageMovie__inputType"
                    />
                  </div>
                </div>
              </div>
              <h5 className="manageMovie__header">Time</h5>
              <input
                type="search"
                placeholder="input time"
                name="time"
                onChange={(event) => handleChangeForm(event)}
                value={form.time}
                className="manageMovie__inputType"
              />
            </div>
            {/* ------------------------------manageMovie Input-------------------------------- */}
          </div>
          <div className="manageSchedule__submitReset">
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
            <select name="City" className="sortSearch__sort" onChange={handleSort}>
              {scheduleLocation.map((item) => (
                <option key={item.id} value={item.location}>
                  {item.location}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="dates"
              onChange={handleDate}
              className="sortSearch__search"
              placeholder="Set A dates"
            />
          </div>
        </div>
        <div className="dataMovie__update">
          {schedule.isLoading ? (
            <div className="d-flex justify-content-center  dataMovie__loading">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <div className="scheduleCard">
              {schedule.data.map((item) => (
                <ScheduleCard
                  data={item}
                  key={item.id}
                  handleDetail={handleDetailMovie}
                  setUpdate={setUpdate}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
        <Pagination
          previousLabel={
            <div>
              <p className="pagination_previous">Previous</p>
            </div>
          }
          nextLabel={
            <div>
              <p className="pagination_previous">Next</p>
            </div>
          }
          breakLabel={"..."}
          pageCount={movie.pageInfo.totalPage}
          onPageChange={handlePagination}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          // pageClassName="paginations"
          pageLinkClassName="paginations"
          initialPage={page - 1}
        />
        <Footer />
      </div>
    </div>
  );
}

export default ManageSchedule;
