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
  const limit = 6;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    getDataMovie();
  }, []);
  const getDataMovie = async () => {
    try {
      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleDetailMovie = (id) => {
    navigate(`/moviedetail/${id}`);
    console.log(id);
  };
  return (
    <>
      <Navbar />
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

      {/*--------------------------Now Showing-----------------------------*/}
      <div className=" nowShowing" style={{ width: "100%" }}>
        <div className="container nowShowing__header">
          <p className="nowShowing__header--nowShowing"> Now Showing </p>
          <p className="nowShowing__header--viewAll"> View All</p>
        </div>
        <div className="movieCard">
          <div className="movieDetails">
            {data.map((item) => (
              <Card data={item} key={item.id} handleDetail={handleDetailMovie} />
            ))}
          </div>
        </div>
      </div>
      {/*--------------------------UpcomingMonth-----------------------------*/}

      <section className=" upcoming" style={{ width: "100%" }}>
        <div className="container upcoming__header">
          <p className="upcoming__header--upcoming"> Upcoming Movies</p>
          <p className="upcoming__header--viewAll"> View All</p>
        </div>

        <div className="upcoming__month">
          <button className="upcoming__month--button">January</button>
          <button className="upcoming__month--button">February</button>
          <button className="upcoming__month--button">March</button>
          <button className="upcoming__month--button">April</button>
          <button className="upcoming__month--button">May</button>
          <button className="upcoming__month--button">June</button>
          <button className="upcoming__month--button">July</button>
          <button className="upcoming__month--button">August</button>
          <button className="upcoming__month--button">September</button>
          <button className="upcoming__month--button">October</button>
          <button className="upcoming__month--button">November</button>
          <button className="upcoming__month--button">Desember</button>
        </div>
        {/*--------------------------Movie details-----------------------------*/}
        <div className="movieDetails">
          {data.map((item) => (
            <Card data={item} key={item.id} handleDetail={handleDetailMovie} />
          ))}
        </div>
      </section>
      {/*--------------------------Movie details-----------------------------*/}
      <div className="container">
        <div className="inputs">
          <section className="input__aligns">
            <h3 className="input__descs">Be the vanguard of the</h3>
            <h1 className="input__titles">Moviegoers</h1>
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
    </>
  );
}

export default Home;
