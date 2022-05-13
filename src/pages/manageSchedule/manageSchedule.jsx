import React, { useEffect, useState } from "react";
import "./manageSchedule.css";
import Navbar from "../../components/header/Navbar/index";
import Footer from "../../components/footer/index";

import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataSchedule } from "../../stores/actions/schedule";

function ManageSchedule() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    getdataSchedule();
  }, []);
  useEffect(() => {
    getdataSchedule();
  }, [page]);
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);
  const getdataSchedule = async () => {
    try {
      await dispatch(getDataSchedule());
    } catch (error) {
      console.log(error.response);
    }
  };
  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <div className="container">
      <Navbar />
      {/* Data Form Schedule -----------------------------------------------------*/}
      <div className="container manageSchedule">
        <div className="manageSchedule__image">
          <img src={require("../../assets/assets/Rectangle 119.png")} alt="" />{" "}
        </div>
        {/* Left Side Form -----------------------------------------------------*/}
        <div className="manageSchedule__movie">
          <h3> Movie Name</h3>
          <select name="name" id="">
            <option value="movie">movie1</option>
            <option value="movie">movie2</option>
            <option value="movie">movie3</option>
          </select>
          <h3> Price</h3>
          <input type="search" placeholder="input Price" name="price" />
          <h3> Premiere</h3>
          <button> ebu</button>
          <button> hiflix</button>
          <button> cineone</button>
        </div>
        {/* Right Side Form -----------------------------------------------------*/}
        <div className="manageSchedule__location">
          <h3> Location</h3>
          <input type="search" placeholder="Select Movie" name="location" />
          <div className="manageSchedule__date">
            <div className="manageSchedule__dateStart">
              <h3> Date Start</h3>
              <input type="date" placeholder="input Price" name="date" />
            </div>
            <div className="manageSchedule__dateEnd">
              <h3> Date End</h3>
              <input type="date" placeholder="input Price" name="date" />
            </div>
            <div className="manageSchedule__addTime">
              <h3>Input Time</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Button -----------------------------------------------------*/}
      <button> reset </button>
      <button> submit </button>
      {/* Card Form -----------------------------------------------------*/}
      <div className="dataSchedule__header">
        <h2>Data Schedule</h2>
        <div className="sortSearchSchedule">
          <input type="search" placeholder="sort" />
          <input type="search" placeholder="search" />
        </div>
      </div>
      {/* Card Form -----------------------------------------------------*/}
      <div className="cardTickets">
        <div className="showTickets__header">
          <img
            src={require("../../assets/assets/VectorCinema1.png")}
            alt="ubv.id"
            className="showTickets__box--image"
          />
          <section className="showTickets__box--title">
            <h3 className="showTickets__box--header"> evu</h3>
            <p className="showTickets__box--location">bandung</p>
          </section>
          <section className=" container showTickets__times">
            {/* {item.time.split(",").map((itemTime) => (
              <button
                key={itemTime}
                className="showTickets__times--timesLight"
                // onClick={() =>
                //   changeDataBooking({
                //     timeBooking: itemTime,
                //     scheduleId: item.id,
                //     premiere: item.premiere
                //   })
                // }
              >
                {itemTime}
              </button>
            ))} */}
          </section>

          <button
            className="showTickets__button"
            // disabled={item.id === dataOrder.scheduleId ? false : true}
            // onClick={handleBooking}
          >
            Update
          </button>
          <button
            className="showTickets__button"
            // disabled={item.id === dataOrder.scheduleId ? false : true}
            // onClick={handleBooking}
          >
            Delete
          </button>
        </div>
      </div>
      <Pagination
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
