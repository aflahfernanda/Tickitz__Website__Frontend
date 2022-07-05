import React, { useState, useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import "./order.css";
import Footer from "../../components/footer";
import Seat from "../../components/seat";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

function OrderPage() {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const listSeat = ["A", "B", "C", "D", "E", "F", "G"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReversedSeat] = useState([]);

  console.log(state);

  useEffect(() => {
    getOrdereMovie();
  }, []);
  const getOrdereMovie = async () => {
    try {
      const scheduleMovie = await axios.get(
        `booking?scheduleId=${state[0].scheduleId}&dateBooking=&timeBooking=${state[0].timeBooking}`
      );
      setReversedSeat(scheduleMovie.data.data.map((item) => item.seat));
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSelectSeat = (seat) => {
    console.log(seat);
    if (selectedSeat.includes(seat)) {
      const deleteSeat = selectedSeat.filter((el) => {
        return el !== seat;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };
  const handleBooking = () => {
    console.log(state);
    console.log(selectedSeat);
  };
  const handlePayment = () => {
    // [1] = localstorage
    // [2] = lempar data dengan state
    navigate("/paymentpage", { state: [selectedSeat, state[0], state[1]] });
  };
  const handleChangeMovie = () => {
    // [1] = localstorage
    // [2] = lempar data dengan state
    navigate("/home/viewAll");
  };
  return (
    <div>
      <Navbar />
      <div className="order__background">
        <div className="container">
          {/*<!----------------------------------Movie Selected---------------------------------------------->*/}
          <section className="movieSelected">
            <section className="container movieSelected__flex">
              <div className="movieSelected__flex1">
                <h3 className="movieSelected__header">Movie Selected</h3>
                <div className="movieSelected__movieSelected">
                  <p className="movieSelected__movieSelected--title">{state[1].name}</p>

                  <button
                    className="movieSelected__movieSelected--button"
                    onClick={handleChangeMovie}>
                    Change Movie
                  </button>
                </div>
                <h3 className="seatSelected__header">Choose Your Seat</h3>
                <div className="seatSelected__movieSelected">
                  <p className="seatSelected__movieSelected--title">Screen</p>
                  <div className="seat__border--line"></div>
                  <section className="seat__border--main">
                    {listSeat.map((item) => (
                      <div key={item}>
                        <Seat
                          rowSeat={item}
                          selectedSeat={handleSelectSeat}
                          reserved={reservedSeat}
                          selected={selectedSeat}
                        />
                      </div>
                    ))}
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
                    <button className="button__change--movie" onClick={handleChangeMovie}>
                      Change Your Movie
                    </button>
                  </section>
                  <section className="button__checkout">
                    <button className="button__checkout--movie" onClick={handlePayment}>
                      Checkout Now
                    </button>
                  </section>
                </div>
              </div>
              {/*<!----------------------------------Movie Selected---------------------------------------------->*/}
              <div className="movieSelected__flex2">
                <h1 className="container movieInfo__header">Order Info</h1>
                <section className="personal__box">
                  <div className="personal__boxImage">
                    {state[0].premiere === "hiflix" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema3.png")}
                        alt="cineOne21/image"
                        className="personal__box--image"
                      />
                    ) : state[0].premiere === "ebu.id" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema1.png")}
                        alt="cineOne21/image"
                        className="personal__box--image"
                      />
                    ) : state[0].premiere === "CineOne21" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema2.png")}
                        alt="cineOne21/image"
                        className="personal__box--image"
                      />
                    ) : null}
                  </div>
                  <h3 className="personal__box--title">{state[0].premiere}</h3>
                  <section className="personal__box--flex">
                    <div className="flex__movie">
                      <p className="flex__movie--info">Movie Selected</p>
                    </div>
                    <div className="flex__result">
                      <p className="flex__movie--result">{state[1].name}</p>
                    </div>
                  </section>
                  <section className="personal__box--flex">
                    <div className="flex__movie">
                      <p className="flex__movie--info">{state[0].dateBooking}</p>
                    </div>
                    <div className="flex__result">
                      <p className="flex__movie--result">{state[0].timeBooking}</p>
                    </div>
                  </section>
                  <section className="personal__box--flex">
                    <div className="flex__movie">
                      <p className="flex__movie--info">One Ticket Price</p>
                    </div>
                    <div className="flex__result">
                      <p className="flex__movie--result">Rp.{state[0].price}</p>
                    </div>
                  </section>
                  <section className="personal__box--flex">
                    <div className="flex__movie">
                      <p className="flex__movie--info">Seat Choosed</p>
                    </div>
                    <div className="flex__result">
                      <p className="flex__movie--result">{selectedSeat + " "}</p>
                    </div>
                  </section>
                  <hr />
                  <section className="personal__box--flex">
                    <div className="flex__movie">
                      <p className="flex__movie--info1">Total Payment</p>
                    </div>
                    <div className="flex__result">
                      <p className="flex__movie--result1">
                        Rp.{state[0].price * selectedSeat.length}
                      </p>
                    </div>
                  </section>
                </section>
                <a href="/paymentpage">
                  <button className="orderPage__button" onClick={handlePayment}>
                    Checkout Now
                  </button>
                </a>
              </div>
            </section>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderPage;
