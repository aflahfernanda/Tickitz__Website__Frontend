import React from "react";
import Navbar from "../../components/header/Navbar";
import "./order.css";
import Footer from "../../components/footer";

function OrderPage() {
  return (
    <>
      <Navbar />
      {/*<!----------------------------------Movie Selected---------------------------------------------->*/}
      <section className="movieSelected">
        <section className="container movieSelected__flex">
          <div className="movieSelected__flex1">
            <h3 className="movieSelected__header">Movie Selected</h3>
            <div className="movieSelected__movieSelected">
              <p className="movieSelected__movieSelected--title">SpiderMan : Homecoming</p>
              <a href="homeDekstop.html">
                <button className="movieSelected__movieSelected--button">Change Movie</button>
              </a>
            </div>
            <h3 className="seatSelected__header">Choose Your Seat</h3>
            <div className="seatSelected__movieSelected">
              <p className="seatSelected__movieSelected--title">Screen</p>
              <div className="seat__border--line"></div>
              <section className="seat__border--main">
                {/* <img src="./orderPage/assets/seat 1.png" alt="seat/image" width="100%" /> */}
              </section>
              <section className="seat__border--box">
                <h4 className="seat__border--headerTwo">Seating Key</h4>

                <div className="headerTwo__box1">
                  <span className="headerTwo__desc">Available</span>
                </div>
                <div className="headerTwo__box2">
                  <span className="headerTwo__desc">Selected</span>
                </div>
                <div className="headerTwo__box3">
                  <span className="headerTwo__desc">Sold</span>
                </div>
              </section>
            </div>
            <div className="button">
              <section className="button__change">
                <a href="homeDekstop.html">
                  <button className="button__change--movie">Change Your Movie</button>
                </a>
              </section>
              <section className="button__checkout">
                <a href="paymentPage.html">
                  <button className="button__checkout--movie">Checkout Now</button>
                </a>
              </section>
            </div>
          </div>
          {/*<!----------------------------------Movie Selected---------------------------------------------->*/}
          <div className="movieSelected__flex2">
            <h1 className="container movieInfo__header">Order Info</h1>
            <section className="personal__box">
              <img
                src={require("../../assets/assets/VectorCinema2.png")}
                alt="cineOne21/image"
                className="personal__box--image"
              />
              <h3 className="personal__box--title">CineOne21 Cinema</h3>
              <section className="personal__box--flex">
                <div className="flex__movie">
                  <p className="flex__movie--info">Movie Selected</p>
                </div>
                <div className="flex__result">
                  <p className="flex__movie--result">Spiderman:HomeComing</p>
                </div>
              </section>
              <section className="personal__box--flex">
                <div className="flex__movie">
                  <p className="flex__movie--info">Tuesday, 07 July 2020</p>
                </div>
                <div className="flex__result">
                  <p className="flex__movie--result">02:00</p>
                </div>
              </section>
              <section className="personal__box--flex">
                <div className="flex__movie">
                  <p className="flex__movie--info">One Ticket Price</p>
                </div>
                <div className="flex__result">
                  <p className="flex__movie--result">$10</p>
                </div>
              </section>
              <section className="personal__box--flex">
                <div className="flex__movie">
                  <p className="flex__movie--info">Seat Choosed</p>
                </div>
                <div className="flex__result">
                  <p className="flex__movie--result">C4, C5, C6</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flex">
                <div className="flex__movie">
                  <p className="flex__movie--info1">Total Payment</p>
                </div>
                <div className="flex__result">
                  <p className="flex__movie--result1">$30</p>
                </div>
              </section>
            </section>
            <a href="paymentPage.html">
              <button className="orderPage__button">CheckOut Now</button>
            </a>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}

export default OrderPage;
