import React from "react";
import "./home.css";
import Navbar from "../../components/basic/Navbar/index";

function Home() {
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
            <div className="movieDetails__movies1">
              <img src={require("./assets/Rectangle 112.png")} alt="logoImg" width={"220px"} />
              <div className="movieCards">
                <h2 className="movieDetails__titles">John Wick</h2>
                <p className="movieDetails__genres">Action,Adventure,Thriller</p>
                <a href="movieDetail.html">
                  <button className="movieDetails__buttons"> Details</button>
                </a>
              </div>
            </div>
            <div className="movieDetails__movies2">
              <img src={require("./assets/Rectangle 112.png")} alt="logoImg" width={"220px"} />
              <div className="movieCards">
                <h2 className="movieDetails__titles">John Wick</h2>
                <p className="movieDetails__genres">Action,Adventure,Thriller</p>
                <a href="movieDetail.html">
                  <button className="movieDetails__buttons"> Details</button>
                </a>
              </div>
            </div>
            <div className="movieDetails__movies3">
              <img src={require("./assets/Rectangle 112.png")} alt="logoImg" width={"220px"} />
              <div className="movieCards">
                <h2 className="movieDetails__titles">John Wick</h2>
                <p className="movieDetails__genres">Action,Adventure,Thriller</p>
                <a href="movieDetail.html">
                  <button className="movieDetails__buttons"> Details</button>
                </a>
              </div>
            </div>
            <div className="movieDetails__movies4">
              <img src={require("./assets/Rectangle 112.png")} alt="logoImg" width={"220px"} />
              <div className="movieCards">
                <h2 className="movieDetails__titles">John Wick</h2>
                <p className="movieDetails__genres">Action,Adventure,Thriller</p>
                <a href="movieDetail.html">
                  <button className="movieDetails__buttons"> Details</button>
                </a>
              </div>
            </div>
            <div className="movieDetails__movies5">
              <img src={require("./assets/Rectangle 112.png")} alt="logoImg" width={"220px"} />
              <div className="movieCards">
                <h2 className="movieDetails__titles">John Wick</h2>
                <p className="movieDetails__genres">Action,Adventure,Thriller</p>
                <a href="movieDetail.html">
                  <button className="movieDetails__buttons"> Details</button>
                </a>
              </div>
            </div>
            <div className="movieDetails__movies6">
              <img src={require("./assets/Rectangle 112.png")} alt="logoImg" width={"220px"} />
              <div className="movieCards">
                <h2 className="movieDetails__titles">John Wick</h2>
                <p className="movieDetails__genres">Action,Adventure,Thriller</p>
                <a href="movieDetail.html">
                  <button className="movieDetails__buttons"> Details</button>
                </a>
              </div>
            </div>
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
          <section className="movieDetails__movie1">
            <img
              src={require("./assets/Rectangle 112.png")}
              alt="imageJohnWick"
              style={{ width: "100%" }}
            />
            <h2 className="movieDetails__title">John Wick</h2>
            <p className="movieDetails__genre">Action,Adventure,Thriller</p>
            <a href="movieDetail.html">
              <button className="movieDetails__button"> Details</button>
            </a>
          </section>
          <section className="movieDetails__movie2">
            <img
              src={require("./assets/Rectangle 112.png")}
              alt="imageLionKing"
              style={{ width: "100%" }}
            />
            <h2 className="movieDetails__title">Lion King</h2>
            <p className="movieDetails__genre">Action,Adventure,Fantasy</p>
            <a href="movieDetail.html">
              <button className="movieDetails__button"> Details</button>
            </a>
          </section>
          <section className="movieDetails__movie3">
            <img
              src={require("./assets/Rectangle 112.png")}
              alt="imageSpiderman"
              style={{ width: "100%" }}
            />
            <h2 className="movieDetails__title">Spiderman Homecoming</h2>
            <p className="movieDetails__genre">Action,Adventure,Fantasy</p>
            <a href="movieDetail.html">
              <button className="movieDetails__button"> Details</button>
            </a>
          </section>
          <section className="movieDetails__movie4">
            <img
              src={require("./assets/Rectangle 112.png")}
              alt="imageJohnWick"
              style={{ width: "100%" }}
            />
            <h2 className="movieDetails__title">John Wick</h2>
            <p className="movieDetails__genre">Action,Adventure,Thriller</p>
            <a href="movieDetail.html">
              <button className="movieDetails__button"> Details</button>
            </a>
          </section>
          <section className="movieDetails__movie5">
            <img
              src={require("./assets/Rectangle 112.png")}
              alt="imageLionKing"
              style={{ width: "100%" }}
            />
            <h2 className="movieDetails__title">Lion King</h2>
            <p className="movieDetails__genre">Action,Adventure,Fantasy</p>
            <a href="movieDetail.html">
              <button className="movieDetails__button"> Details</button>
            </a>
          </section>
          <section className="movieDetails__movie6">
            <img
              src={require("./assets/Rectangle 112.png")}
              alt="imageSpiderman"
              style={{ width: "100%" }}
            />
            <h2 className="movieDetails__title">Spiderman Homecoming</h2>
            <p className="movieDetails__genre">Action,Adventure,Fantasy</p>
            <a href="movieDetail.html">
              <button className="movieDetails__button"> Details</button>
            </a>
          </section>
        </div>
      </section>
      {/*--------------------------Movie details-----------------------------*/}
      <div className="container input">
        <section className="input__align">
          <h3 className="input__desc">Be the vanguard of the</h3>
          <h1 className="input__title">Moviegoers</h1>
          <input type="email" placeholder="Type Your Email" className="input__email" />
          <button className="input__button">join now</button>
          <span className="input__caption">
            By joining you as a Tickitz member, we will always send you the latest updates via email{" "}
          </span>
        </section>
      </div>
    </>
  );
}

export default Home;
