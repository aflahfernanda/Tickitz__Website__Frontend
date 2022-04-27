import React, { useState, useEffect } from "react";
import "./moviedetail.css";
import Navbar from "../../components/header/Navbar/index";
import Footer from "../../components/footer/index";
import Card from "../../components/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";

function Detail() {
  const params = useParams();
  const movieId = params.id;
  const getMovieId = async () => {
    try {
      const resultMovie = await axios.get(`movie/${movieId}`);
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Navbar />
      {/*movie detail------------------------------------------------------------------------*/}
      <section className="container">
        <div className="movieDetails">
          <img
            src={require("../../assets/assets/Rectangle 119.png")}
            alt="spiderman/image"
            width="80%"
            height="80%"
            className="moviDetails__image"
          />

          <div className="container moviDetails__desc">
            <section className="movieDetail__desc">
              <p className="desc1">Spider-Man: Homecoming</p>
              <p className="desc2">Adventure,Fantasy,Sci-fi</p>
              <section className="desc3">
                <div className="desc3__1">
                  <p className="desc3__1--releaseDate"> Release Date</p>
                  <p className="desc3__1--date"> June 28, 2017</p>
                </div>
                <div className="desc3__2">
                  <p className="desc3__1--releaseDate"> Directed By</p>
                  <p className="desc3__1--date"> Jon Watts</p>
                </div>
                <div className="desc3__3">
                  <p className="desc3__1--releaseDate"> Duration</p>
                  <p className="desc3__1--date"> 2 hours 13 minutes</p>
                </div>
                <div className="desc3__3">
                  <p className="desc3__1--releaseDate"> Casts</p>
                  <p className="desc3__1--date">
                    {" "}
                    Tom Holland, Robert Downey Jr, Micahel Keaton,...
                  </p>
                </div>
              </section>
              <hr />
              <p className="desc4">
                <strong>Synopsis</strong>
                <br />
                Thrilled by his experience with the Avengers, Peter returns home, where he lives
                with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries
                to fall back into his normal daily routine - distracted by thoughts of proving
                himself to be more than just your friendly neighborhood Spider-Man - but when the
                Vulture emerges as a new villain, everything that Peter holds most important will be
                threatened.
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
            className="times__dropdown--dates"
            placeholder="Set A dates"
          />
          <select name="City" className="times__dropdown--location">
            <option>Purwekerto</option>
            <option>Bandung</option>
            <option>Jakarta</option>
            <option>Semarang</option>
            <option>Surabaya</option>
            <option>Yogyakarta</option>
          </select>
        </div>
        {/*show Ticket------------------------------------------------------------------------*/}
        <div className="container showTickets">
          <div className="showTickets__box">
            <div className="showTickets__header">
              <img
                src={require("../../assets/assets/VectorCinema1.png")}
                alt="ubv.id"
                className="showTickets__box--image"
              />
              <section className="showTickets__box--title">
                <h3 className="showTickets__box--header"> ebv.id</h3>
                <p className="showTickets__box--location">
                  {" "}
                  Whatever street No.12, <br />
                  South Purwokerto
                </p>
              </section>
            </div>
            <hr />
            <section className=" container showTickets__times">
              <p className="showTickets__times--times">08.30 am</p>
              <p className="showTickets__times--times">10.30 pm</p>
              <p className="showTickets__times--timesLight">12.00 pm</p>
              <p className="showTickets__times--times">02.00 pm </p>
              <p className="showTickets__times--times">04.30 pm</p>
              <p className="showTickets__times--timesLight">07.00 pm</p>
              <p className="showTickets__times--times">08.30 pm</p>
            </section>
            <a href="orderPage.html">
              <button className="showTickets__button"> Book Now</button>
            </a>
          </div>
          <div className="showTickets__box">
            <div className="showTickets__header">
              <img
                src={require("../../assets/assets/VectorCinema2.png")}
                alt="ubv.id"
                className="showTickets__box--image"
              />
              <section className="showTickets__box--title">
                <h3 className="showTickets__box--header"> cineOne21</h3>
                <p className="showTickets__box--location">
                  {" "}
                  Downcare street No. 21,
                  <br />
                  East Purwokerto
                </p>
              </section>
            </div>
            <hr />
            <section className=" container showTickets__times">
              <p className="showTickets__times--times">08.30 am</p>
              <p className="showTickets__times--times">10.00 pm</p>
              <p className="showTickets__times--timesLight">12.00 pm</p>
              <p className="showTickets__times--times">02.00 pm </p>
              <p className="showTickets__times--times">04.00 pm</p>
              <p className="showTickets__times--timesLight">06.00 pm</p>
              <p className="showTickets__times--times">08.00 pm</p>
            </section>
            <a href="orderPage.html">
              <button className="showTickets__button"> Book Now</button>
            </a>
          </div>
          <div className="showTickets__box">
            <div className="showTickets__header">
              <img
                src={require("../../assets/assets/VectorCinema3.png")}
                alt="ubv.id"
                className="showTickets__box--image"
              />
              <section className="showTickets__box--title">
                <h3 className="showTickets__box--header"> hiflix cinema</h3>
                <p className="showTickets__box--location">
                  {" "}
                  Colonel street No. 2, East
                  <br />
                  Purwokerto
                </p>
              </section>
            </div>
            <hr />
            <section className=" container showTickets__times">
              <p className="showTickets__times--times">08.30 am</p>
              <p className="showTickets__times--times">10.00 pm</p>
              <p className="showTickets__times--timesLight">12.00 pm</p>
              <p className="showTickets__times--times">02.00 pm </p>
              <p className="showTickets__times--times">04.00 pm</p>
              <p className="showTickets__times--timesLight">06.00 pm</p>
              <p className="showTickets__times--times">08.00 pm</p>
            </section>
            <a href="orderPage.html">
              <button className="showTickets__button"> Book Now</button>
            </a>
          </div>
          <div className="showTickets__box">
            <div className="showTickets__header">
              <img
                src={require("../../assets/assets/VectorCinema1.png")}
                alt="ubv.id"
                className="showTickets__box--image"
              />
              <section className="showTickets__box--title">
                <h3 className="showTickets__box--header"> ebv.id</h3>
                <p className="showTickets__box--location">
                  {" "}
                  Whatever street No.12, <br />
                  South Purwokerto
                </p>
              </section>
            </div>
            <hr />
            <section className=" container showTickets__times">
              <p className="showTickets__times--times">08.30 am</p>
              <p className="showTickets__times--times">10.30 pm</p>
              <p className="showTickets__times--timesLight">12.00 pm</p>
              <p className="showTickets__times--times">02.00 pm </p>
              <p className="showTickets__times--times">04.30 pm</p>
              <p className="showTickets__times--timesLight">07.00 pm</p>
              <p className="showTickets__times--times">08.30 pm</p>
            </section>
            <a href="orderPage.html">
              <button className="showTickets__button"> Book Now</button>
            </a>
          </div>
          <div className="showTickets__box">
            <div className="showTickets__header">
              <img
                src={require("../../assets/assets/VectorCinema2.png")}
                alt="ubv.id"
                className="showTickets__box--image"
              />
              <section className="showTickets__box--title">
                <h3 className="showTickets__box--header"> cineOne21</h3>
                <p className="showTickets__box--location">
                  {" "}
                  Downcare street No. 21,
                  <br />
                  East Purwokerto
                </p>
              </section>
            </div>
            <hr />
            <section className=" container showTickets__times">
              <p className="showTickets__times--times">10.00 pm</p>
              <p className="showTickets__times--times">10.00 pm</p>
              <p className="showTickets__times--timesLight">12.00 pm</p>
              <p className="showTickets__times--times">02.00 pm </p>
              <p className="showTickets__times--times">04.00 pm</p>
              <p className="showTickets__times--timesLight">06.00 pm</p>
              <p className="showTickets__times--times">08.00 pm</p>
            </section>
            <a href="orderPage.html">
              <button className="showTickets__button"> Book Now</button>
            </a>
          </div>
          <div className="showTickets__box">
            <div className="showTickets__header">
              <img
                src={require("../../assets/assets/VectorCinema3.png")}
                alt="ubv.id"
                className="showTickets__box--image"
              />
              <section className="showTickets__box--title">
                <h3 className="showTickets__box--header"> hiflix cinema</h3>
                <p className="showTickets__box--location">
                  {" "}
                  Colonel street No. 2, East
                  <br />
                  Purwokerto
                </p>
              </section>
            </div>
            <hr />
            <section className=" container showTickets__times">
              <p className="showTickets__times--times">08.30 am</p>
              <p className="showTickets__times--times">10.00 pm</p>
              <p className="showTickets__times--timesLight">12.00 pm</p>
              <p className="showTickets__times--times">02.00 pm </p>
              <p className="showTickets__times--times">04.00 pm</p>
              <p className="showTickets__times--timesLight">06.00 pm</p>
              <p className="showTickets__times--times">08.00 pm</p>
            </section>
            <a href="orderPage.html">
              <button className="showTickets__button"> Book Now</button>
            </a>
          </div>
        </div>
        <p className="container or">View More</p>
      </section>
      <Footer />
    </>
  );
}

export default Detail;
