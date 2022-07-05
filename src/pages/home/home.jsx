import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/header/Navbar/index";
import Footer from "../../components/footer/index";
import Card from "../../components/card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

function Home() {
  // const handleDetailMovie = (id) => {
  //   console.log("detailClick", id);
  // };
  const navigate = useNavigate();
  const limit = 100;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [dataMovie, setDataMovie] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchRelease, setSearchRelease] = useState("");
  useEffect(() => {
    getDataMovie();
  }, []);
  useEffect(() => {
    getDataMovieRelease();
  }, [page, searchRelease, limit]);
  const getDataMovie = async () => {
    try {
      const resultMovie = await axios.get(
        "movie?page=1&limit=100&sort=&searchRelease=&searchName="
      );
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getDataMovieRelease = async () => {
    try {
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&sort=&searchRelease=${searchRelease}&searchName=`
      );
      setDataMovie(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleDetailMovie = (id) => {
    navigate(`/moviedetail/${id}`);
    console.log(id);
  };
  const handleviewAllMovie = () => {
    navigate("/home/viewAll");
  };
  const handleMonth = (event) => {
    console.log(event.target.id);
    setSearchRelease(event.target.id);
  };
  return (
    <div>
      <Navbar />
      <div></div>
      <div className="container">
        <main>
          {/*--------------------------Welcome-----------------------------*/}
          <section className="container homeColumn">
            <div className="homeColumn__grid" />
            <div className="col homeColumn1">
              <h5 className="home__welcome--lineFirst">Nearest Cinema, Neawest Movie</h5>
              <h1 className="home__welcome--lineSecond">Find Out Now !</h1>
            </div>
            <div className="col homeColumn2 ">
              <img src={require("./assets/Group 15.png")} alt="logoImg" width={"100%"} />
            </div>
          </section>
        </main>
      </div>
      <div className="background__nowShowing">
        <div className="container">
          {/*--------------------------Now Showing-----------------------------*/}
          <div
            className=" container nowShowing"
            style={{ width: "100%", position: "relative", bottom: "10px" }}>
            <div className="nowShowing__header">
              <p className="nowShowing__header--nowShowing"> Now Showing </p>
              <p className="nowShowing__header--viewAll" onClick={handleviewAllMovie}>
                View All
              </p>
            </div>
            <div className="movieDetails_scroll">
              {data.map((item) => (
                <div key={item.id}>
                  <Card data={item} handleDetail={handleDetailMovie} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*--------------------------UpcomingMonth-----------------------------*/}
        <div className="container">
          <section className=" container upcoming" style={{ width: "100%" }}>
            <div className="upcoming__header">
              <p className="upcoming__header--upcoming"> Upcoming Movies</p>
              <p className="upcoming__header--viewAll" onClick={handleviewAllMovie}>
                View All
              </p>
            </div>

            <div className="upcoming__month">
              <button className="upcoming__month--button" id="" onClick={handleMonth}>
                All Month
              </button>
              <button className="upcoming__month--button" id="1" onClick={handleMonth}>
                January
              </button>
              <button className="upcoming__month--button" id="02" onClick={handleMonth}>
                February
              </button>
              <button className="upcoming__month--button" id="03" onClick={handleMonth}>
                March
              </button>
              <button className="upcoming__month--button" id="04" onClick={handleMonth}>
                April
              </button>
              <button className="upcoming__month--button" id="05" onClick={handleMonth}>
                May
              </button>
              <button className="upcoming__month--button" id="06" onClick={handleMonth}>
                June
              </button>
              <button className="upcoming__month--button" id="07" onClick={handleMonth}>
                July
              </button>
              <button className="upcoming__month--button" id="08" onClick={handleMonth}>
                August
              </button>
              <button className="upcoming__month--button" id="09" onClick={handleMonth}>
                September
              </button>
              <button className="upcoming__month--button" id="10" onClick={handleMonth}>
                October
              </button>
              <button className="upcoming__month--button" id="11" onClick={handleMonth}>
                November
              </button>
              <button className="upcoming__month--button" id="12" onClick={handleMonth}>
                Desember
              </button>
            </div>
            {/*--------------------------Movie details-----------------------------*/}
            {/* <div className=" movieDetails ">
          {data.map((item) => (
            <Card data={item} key={item.id} handleDetail={handleDetailMovie} />
          ))}
        </div> */}
            <div className="movieDetails_scroll">
              {dataMovie.length == [0] ? (
                <p className="datamovie__datanotfound">
                  -------------- no data found in this month --------------
                </p>
              ) : (
                dataMovie.map((item) => (
                  <div key={item.id}>
                    <Card data={item} handleDetail={handleDetailMovie} />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
        {/*--------------------------Movie details-----------------------------*/}
        <div className="container">
          <div className="inputs_box">
            <section className="input__aligns">
              <h3 className="input__descs">Be the vanguard of the</h3>
              <h1 className="input__titless">Moviegoers</h1>
              <input type="email" placeholder="Type Your Email" className="input__emails" />
              <button className="input__buttons">join now</button>
              <span className="input__captions">
                By joining you as a Tickitz member, we will always send you the latest updates via
                email{" "}
              </span>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
