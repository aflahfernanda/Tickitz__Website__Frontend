import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Footer() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };
  const handleList = () => {
    navigate("/list");
  };
  return (
    <div className="container">
      <div className="footer">
        <section className=" footer__flexFirst">
          <img
            src={require("./assets/Tickitz 2.png")}
            alt="imageTickitz"
            className="footer__flexFirst__image"
            width={"100%"}
          />
          <p className="footer__flexFirst__caption">
            Stop waiting in line. Buy tickets <br />
            conveniently, watch movies quietly.
          </p>
        </section>
        <section className="footer__flexSecond">
          <h3 className="footer__flexSecond__title"> Explore</h3>
          <a onClick={handleHome} href="" className="footer__flexSecond__listOne">
            Home
          </a>
          <a onClick={handleList} href="" className="footer__flexSecond__listTwo">
            List Movie
          </a>
        </section>
        <section className="footer__flexThird">
          <h3 className="footer__flexThird__title"> Our Sponsor</h3>
          <img
            src={require("./assets/VectorCinema1.png")}
            alt="image"
            className="footer__flexThird__image"
          />
          <img
            src={require("./assets/VectorCinema2.png")}
            alt="image"
            className="footer__flexThird__image"
          />
          <img
            src={require("./assets/VectorCinema3.png")}
            alt="image"
            className="footer__flexThird__image"
          />
        </section>
        <section className="footer__flexFourth">
          <h3 className="footer__flexFourth__title"> Follow Us</h3>
          <p className="footer__flexFourth__link">
            <img
              src={require("./assets/VectorIcon1.png")}
              alt="image"
              className="footer__flexFourth__image"
            />
            &emsp;&ensp;;Tickitz Cinema Id
          </p>
          <p className="footer__flexFourth__link">
            <img
              src={require("./assets/bx_bxl-instagram.png")}
              alt="image"
              className="footer__flexFourth__image"
            />
            &emsp;tickitz.id
          </p>
          <p className="footer__flexFourth__link">
            <img
              src={require("./assets/VectorIcon2.png")}
              alt="image"
              className="footer__flexFourth__image"
            />
            &emsp;&nbsp;tickitz.id
          </p>
          <p className="footer__flexFourth__link">
            <img
              src={require("./assets/feather_youtube.png")}
              alt="image"
              className="footer__flexFourth__image"
            />
            &emsp;Tickitz Cinema Id
          </p>
        </section>
        <section className=" container footer__flexFourth__mobile">
          <img
            src={require("./assets/VectorIcon1.png")}
            alt="image"
            className="footer__flexFourth__images"
          />
          <img
            src={require("./assets/bx_bxl-instagram.png")}
            alt="image"
            className="footer__flexFourth__images"
          />
          <img
            src={require("./assets/VectorIcon2.png")}
            alt="image"
            className="footer__flexFourth__images"
          />
          <img
            src={require("./assets/feather_youtube.png")}
            alt="image"
            className="footer__flexFourth__images"
          />
        </section>
      </div>
      <p className="footer__license">© 2020 Tickitz. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
