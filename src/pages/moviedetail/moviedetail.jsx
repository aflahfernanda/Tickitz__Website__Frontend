import React, { useState, useEffect } from "react";
import "./moviedetail.css";
import Navbar from "../../components/header/Navbar/index";
import Footer from "../../components/footer/index";
import Card from "../../components/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";

function Detail() {
  const params = useParams();
  const navigate = useNavigate();
  const [dataSchedule, setSchedule] = useState([]);
  const movieId = params.id;
  const [data, setData] = useState([]);
  const [dataOrder, setDataOrder] = useState({
    movieId: params.id,
    dateBooking: new Date().toISOString().split("T")[0]
  });
  // const [pageInfo, setPageInfo] = useState([]);
  useEffect(() => {
    getMovieId();
  }, []);
  useEffect(() => {
    getScheduleMovie();
  }, []);

  const getMovieId = async () => {
    try {
      const resultMovie = await axios.get(`movie/${movieId}`);
      setData(resultMovie.data.data[0]);
    } catch (error) {
      console.log(error.response);
    }
  };

  {
    /*handleDate----------------------------------------------------*/
  }
  const handleDate = () => {
    const dateChange = dataOrder.dateBooking;
    if (dateChange) {
      return Date;
    }
  };
  {
    /*ScheduleId----------------------------------------------------*/
  }
  const getScheduleMovie = async () => {
    try {
      const scheduleMovie = await axios.get(`schedule/${movieId}`);
      setSchedule(scheduleMovie.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const releaseDate = data.releaseDate?.split("T")[0];
  const changeDataBooking = (data) => {
    setDataOrder({ ...dataOrder, ...data });
  };
  const handleBooking = () => {
    // [1] = localstorage
    // [2] = lempar data dengan state
    navigate("/orderpage", { state: [dataOrder, data] });
  };
  console.log(dataOrder);
  return (
    <div className="container">
      <Navbar />
      {/*movie detail------------------------------------------------------------------------*/}
      <section className="container">
        <div className="movieDetailss">
          <img
            src={
              data.image
                ? `https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${data.image}`
                : "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/movie/ekmnkymc7uyk2uk0cxru.jpg"
            }
            alt="spiderman/image"
            height="80%"
            className="moviDetails__image"
          />

          <div className="container moviDetails__desc">
            <section className="movieDetail__desc">
              <p className="desc1">{data.name}</p>
              <p className="desc2">{data.category}</p>
              <section className="desc3">
                <div className="desc3__1">
                  <p className="desc3__1--releaseDate"> Release Date</p>
                  <p className="desc3__1--date"> {releaseDate}</p>
                </div>
                <div className="desc3__2">
                  <p className="desc3__1--releaseDate"> Directed By</p>
                  <p className="desc3__1--date"> {data.director}</p>
                </div>
                <div className="desc3__3">
                  <p className="desc3__1--releaseDate"> Duration</p>
                  <p className="desc3__1--date"> {data.duration}</p>
                </div>
                <div className="desc3__3">
                  <p className="desc3__1--releaseDate"> Casts</p>
                  <p className="desc3__1--date"> {data.cast}</p>
                </div>
              </section>
              <hr />
              <p className="desc4">
                <strong>Synopsis</strong>
                <br />
                {data.synopsis}
              </p>
            </section>
          </div>
        </div>
      </section>
      {/*show Times------------------------------------------------------------------------*/}
      <section className="showTimes">
        <h3 className="container showTimes__header">Show Times and Tickets</h3>
        <div className="container showTimes__dates">
          <input
            type="date"
            name="dates"
            value={dataOrder.dateBooking}
            onChange={handleDate}
            className="times__dropdown--dates"
            placeholder="Set A dates"
          />
          <select name="City" className="times__dropdown--location">
            {dataSchedule.map((item) => (
              <option key={item.id}>{item.location}</option>
            ))}
          </select>
        </div>
        {/*show Ticket------------------------------------------------------------------------*/}
        <div className="container showTickets">
          {dataSchedule.map((item) => (
            <div className="showTickets__box" key={item.id}>
              <div className="showTickets__header">
                <img
                  src={require("../../assets/assets/VectorCinema1.png")}
                  alt="ubv.id"
                  className="showTickets__box--image"
                />
                <section className="showTickets__box--title">
                  <h3 className="showTickets__box--header"> {item.premiere}</h3>
                  <p className="showTickets__box--location">{item.location}</p>
                </section>
              </div>
              <hr />
              <section className=" container showTickets__times">
                {item.time.split(",").map((itemTime) => (
                  <button
                    key={itemTime}
                    className="showTickets__times--timesLight"
                    onClick={() =>
                      changeDataBooking({
                        timeBooking: itemTime,
                        scheduleId: item.id,
                        premiere: item.premiere
                      })
                    }
                  >
                    {itemTime}
                  </button>
                ))}
              </section>

              <button
                className="showTickets__button"
                disabled={item.id === dataOrder.scheduleId ? false : true}
                onClick={handleBooking}
              >
                {" "}
                Book Now
              </button>
            </div>
          ))}
        </div>

        <p className="container or">View More</p>
      </section>
      <Footer />
    </div>
  );
}

export default Detail;
