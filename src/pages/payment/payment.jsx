import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./payment.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Payment() {
  const { state } = useLocation();
  const [payButton, setPayButton] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: "",
    scheduleId: "",
    dateBooking: "",
    timeBooking: "",
    paymentMethod: "",
    totalPayment: "",
    statusPayment: "",
    seat: []
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // const [keyword, setKeyword] = useState("");

  // const handleChangeEmail = (event) => {
  //   console.log(event.target.value);
  //   setEmail(event.target.value);
  // };
  // const handlePassword = (event) => {
  //   if (event.key === "Enter") {
  //     console.log("user input a password");
  //     console.log("password is", event.target.value);
  //   }
  // };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log("Submit Login");
      // Input = email password di siapkan
      // console.log(form);
      // Proses = memanggil axios
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      const resultLogin = await axios.post("booking");
      console.log(resultLogin);
      console.log(resultLogin.data.message);
      // Output = suatu keadaan yang dapat diinfokan ke user bahwa proses sudah selesai
      setIsError(false);
      setMessage(resultLogin.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handlePayment = (event) => {
    setPayButton(event.target.name);
  };
  console.log(payButton);
  return (
    <>
      <Navbar />
      {/* { <!----------------------------------Payment Info---------------------------------------------->} */}
      <section className="movieSelecteds">
        <section className="container movieSelected__flexs">
          <div className="movieSelected__flexs1">
            <h3 className="movieSelected__headers">Payment Info</h3>
            <div className="container main__seat--movieInfos">
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Date & Time</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">
                    {`${state[1].dateBooking}` + " at" + ` ${state[1].timeBooking}`}
                  </p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Movie Selected</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">{state[2].name}</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Cinema Name</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">{state[1].premiere}</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos">Number Of Ticket</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results">{state[0].length + " Pieces"}</p>
                </div>
              </section>
              <hr />
              <section className="personal__box--flexs">
                <div className="flex__movies">
                  <p className="flex__movie--infos1">Total Payment</p>
                </div>
                <div className="flex__results">
                  <p className="flex__movie--results1">${50 * state[0].length}</p>
                </div>
              </section>
            </div>
            {/* {<!----------------------------------Choose Payment Method ---------------------------------------------->} */}
            <h1 className="container movieInfo__headers">Choose a Payment Method</h1>
            <section className="seat__borders">
              <section className="seat__border--boxs">
                <button className="border__box--grids" onClick={handlePayment} name="BCA Klickpay">
                  <img
                    src={require("../../assets/assets/Bank BCA Logo (SVG-240p) - FileVector69 1.png")}
                    alt="payment/image"
                    width="80%"
                    name="BCA"
                  />
                </button>
                <button className="border__box--grids" onClick={handlePayment} name="Dana">
                  <img
                    src={require("../../assets/assets/Logo DANA (PNG-240p) - FileVector69 1.png")}
                    alt="payment/image"
                    width="100%"
                    name="Dana"
                  />
                </button>
                <button className="border__box--grids" onClick={handlePayment} name="Gopay">
                  <img
                    src={require("../../assets/assets/Logo GoPay (SVG-240p) - FileVector69 1.png")}
                    alt="payment/image"
                    width="100%"
                  />
                </button>
                <button className="border__box--grids" onClick={handlePayment} name="Paypal">
                  <img
                    src={require("../../assets/assets/logos_paypal.png")}
                    alt="payment/image"
                    width="40%"
                  />
                </button>
                <button className="border__box--grids" onClick={handlePayment} name="Dana">
                  <img
                    src={require("../../assets/assets/Logo DANA (PNG-240p) - FileVector69 1.png")}
                    alt="payment/image"
                    width="100%"
                  />
                </button>
                <button className="border__box--grids" onClick={handlePayment} name="BCA Klickpay">
                  <img
                    src={require("../../assets/assets/Bank BCA Logo (SVG-240p) - FileVector69 1.png")}
                    alt="payment/image"
                    width="90%"
                  />
                </button>
                <button className="border__box--grids" onClick={handlePayment} name="Bank BRI">
                  <img
                    src={require("../../assets/assets/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.png")}
                    alt="payment/image"
                    width="60%"
                  />
                </button>

                <button className="border__box--grids" onClick={handlePayment} name="OVO">
                  <img src={require("../../assets/assets/ovo.png")} width="100%" />
                </button>
              </section>
              <p className="ors">or</p>
              <p className="links">
                Pay via cash.{" "}
                <a href="" className="link__workss">
                  See how it works
                </a>
              </p>
            </section>
            <div className="buttons">
              <section className="button__changes">
                <a href="orderPage.html">
                  <button className="button__change--movies">Previous Step</button>
                </a>
              </section>
              <section className="button__checkouts">
                <button
                  className="button__checkout--movies"
                  // onClick={() =>
                  //   createBookingUser({
                  //     timeBooking: "09.00"
                  //   })
                  // }
                  onClick={handleSubmit}
                >
                  Pay Your Order
                </button>
              </section>
            </div>
          </div>

          {/* {<!----------------------------------Personal Info---------------------------------------------->} */}

          <div className="movieSelected__flexs2">
            <h1 className="container movieInfo__headers">Personal Info</h1>
            <section className="personal__boxs">
              <h5 className="personal__box--headers">Full Name</h5>
              <input
                type="search"
                placeholder="Write Your Full Name"
                className="personal__box--names"
              />
              <h5 className="personal__box--headers">Email</h5>
              <input
                type="email"
                placeholder="Write Your Email"
                className="personal__box--emails"
              />
              <h5 className="personal__box--headers">Phone Number</h5>
              <input
                type="tel"
                placeholder="Write Your phone number"
                className="personal__box--phones"
                data-format="+62"
              />
              <div className="alerts">
                <h5 className="alert__texts">Fill Your Data Corectly</h5>
              </div>
            </section>
            <a href="paymentPage.html">
              <button className="orderPage__buttons">CheckOut Now</button>
            </a>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Payment;
