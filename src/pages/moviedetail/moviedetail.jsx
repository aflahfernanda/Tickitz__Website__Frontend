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
  const [scheduleLocation, setScheduleLocation] = useState([]);
  const movieId = params.id;
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [dataOrder, setDataOrder] = useState({
    movieId: params.id,
    dateBooking: new Date().toISOString().split("T")[0]
  });
  // const [pageInfo, setPageInfo] = useState([]);
  useEffect(() => {
    getMovieId();
  }, []);
  useEffect(() => {
    getScheduleLocationMovie();
  }, []);
  useEffect(() => {
    getScheduleMovie();
  }, [location, date]);

  const getMovieId = async () => {
    try {
      const resultMovie = await axios.get(`movie/${movieId}`);
      setData(resultMovie.data.data[0]);
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log(scheduleLocation);
  {
    /*handleDate----------------------------------------------------*/
  }
  const handleDate = (event) => {
    setDate(event.target.value);
    // if (dateChange) {
    //   return Date;
    // }
  };
  console.log(date);
  {
    /*ScheduleId----------------------------------------------------*/
  }
  const getScheduleMovie = async () => {
    try {
      const scheduleMovie = await axios.get(
        `schedule?page=1&limit=10&searchLocation=${location}&searchMovieId=${movieId}&searchDate=${date}`
      );
      setSchedule(scheduleMovie.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getScheduleLocationMovie = async () => {
    try {
      const scheduleMovie = await axios.get(
        `schedule?page=1&limit=10&searchLocation=&searchMovieId=${movieId}&searchDate=`
      );
      setScheduleLocation(scheduleMovie.data.data);
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
  const handleLocation = (value) => {
    setLocation(value.target.value);
  };
  const allDate = () => {
    setLocation("");
    setDate("");
  };
  console.log(dataOrder);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        {/*movie detail------------------------------------------------------------------------*/}

        <div className="movieDetails__cardFlexs">
          <img
            src={
              data.image
                ? `https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${data.image}`
                : "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/movie/ekmnkymc7uyk2uk0cxru.jpg"
            }
            alt="spiderman/image"
            height="80%"
            className="movieDetails__imageBox"
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
                <p className="desc3__1--synopsis"> Synopsis</p>
                <br />
                {data.synopsis}
              </p>
            </section>
          </div>
        </div>
      </div>
      <div className="showtimes__background">
        {/*show Times------------------------------------------------------------------------*/}
        <section className=" container showTimes">
          <h3 className="container showTimes__header">Show Times and Tickets</h3>
          <div className="container showTimes__dates">
            <input
              type="date"
              name="dates"
              onChange={handleDate}
              className="times__dropdown--dates"
              placeholder="Set A dates"
            />
            <select name="City" className="times__dropdown--location" onChange={handleLocation}>
              {scheduleLocation.map((item) => (
                <option key={item.id} value={item.location}>
                  {item.location}
                </option>
              ))}
            </select>
            <button className="button__showAllDate" onClick={allDate}>
              show all date and location
            </button>
          </div>
          {/*show Ticket------------------------------------------------------------------------*/}

          {dataSchedule.length == 0 ? (
            <p className="noDataFound">
              -------------------No Data Found Try Another Date And Location-----------------
            </p>
          ) : (
            <div className="container showTickets">
              {dataSchedule.map((item) => (
                <div className="showTickets__box" key={item.id}>
                  <div className="showTickets__header">
                    {item.premiere === "hiflix" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema3.png")}
                        alt="ubv.id"
                        className="showTickets__box--images"
                      />
                    ) : item.premiere === "ebu.id" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema1.png")}
                        alt="ubv.id"
                        className="showTickets__box--images"
                      />
                    ) : item.premiere === "CineOne21" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema2.png")}
                        alt="ubv.id"
                        className="showTickets__box--images"
                      />
                    ) : null}

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
                            premiere: item.premiere,
                            price: item.price
                          })
                        }>
                        {itemTime}
                      </button>
                    ))}
                  </section>
                  <div className="card__priceTicket">
                    <p className="card__priceTicket__price">Price</p>
                    <p className="card__priceTicket__total">Rp.{item.price}</p>
                  </div>
                  <button
                    className="showTickets__button"
                    disabled={item.id === dataOrder.scheduleId ? false : true}
                    onClick={handleBooking}>
                    {" "}
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* <p className="container or">View More</p> */}
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Detail;
