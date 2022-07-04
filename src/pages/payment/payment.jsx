import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./payment.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody, Alert } from "reactstrap";

function Payment() {
  const { state } = useLocation();
  const [payButton, setPayButton] = useState("");
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [pagination, setPagination] = useState("");
  const [show, setShow] = useState(true);
  const [form, setForm] = useState({
    userId: localStorage.getItem("id"),
    scheduleId: state[1].scheduleId,
    dateBooking: state[1].dateBooking,
    timeBooking: state[1].timeBooking,
    paymentMethod: "bca_kilckpay",
    totalPayment: state[0].length * state[1].price,
    statusPayment: "succes",
    seat: state[0]
  });
  console.log(form);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // Modal open state
  const [modal, setModal] = React.useState(false);
  useEffect(() => {
    getUserById();
  }, []);
  const getUserById = async () => {
    try {
      const result = await axios.get(`user/${localStorage.getItem("id")}`);
      setData(result.data.data[0]);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  console.log(pagination);
  const handleResponse = async (event) => {
    setModal(!modal);
  };
  const handleResponseModal = async (event) => {
    setModal(false);
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const resultBooking = await axios.post("booking", form);
      console.log(resultBooking);
      alert("Succes Create Booking Next Go To Transaction");
      setModal(false);
      window.location.replace(resultBooking.data.pagination);
    } catch (error) {
      console.log(error.response);
      setIsError(true);
      alert("Transaction Failed Please Re-Log In");
    }
  };
  const handlePreviousStep = () => {
    navigate("/home");
  };

  console.log(data);
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
                  <p className="flex__movie--results1">Rp.{state[1].price * state[0].length}</p>
                </div>
              </section>
            </div>
            <div className="buttons">
              <section className="button__changes">
                <button className="button__change--movies" onClick={handlePreviousStep}>
                  Previous Step
                </button>
              </section>
              <section className="button__checkouts">
                <button
                  className="button__checkout--movies"
                  // onClick={() =>
                  //   createBookingUser({
                  //     timeBooking: "09.00"
                  //   })
                  // }
                  onClick={handleResponse}
                >
                  Pay Your Order
                </button>
              </section>
              <Modal isOpen={modal} toggle={handleResponse} modalTransition={{ timeout: 1000 }}>
                <ModalHeader>
                  <div className="modal__headerBox">
                    <p className="modal__header">Payment Confirmation</p>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="modal__image">
                    {state[1].premiere === "hiflix" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema3.png")}
                        alt="cineOne21/image"
                        className="personal__box--image"
                      />
                    ) : state[1].premiere === "ebu.id" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema1.png")}
                        alt="cineOne21/image"
                        className="personal__box--image"
                      />
                    ) : state[1].premiere === "CineOne21" ? (
                      <img
                        src={require("../../assets/assets/VectorCinema2.png")}
                        alt="cineOne21/image"
                        className="personal__box--image"
                      />
                    ) : null}
                  </div>
                  <div className="modal__flex">
                    <p className="modal__flex1">Movie Selected</p>
                    <p className="modal__flex2">{state[2].name}</p>
                  </div>
                  <div className="modal__flex">
                    <p className="modal__flex1">{state[1].dateBooking}</p>
                    <p className="modal__flex2">{state[1].timeBooking}</p>
                  </div>
                  <div className="modal__flex">
                    <p className="modal__flex1">{state[0] + ","}</p>
                    <p className="modal__flex2">Rp. {state[0].length * state[1].price}</p>
                  </div>
                  <hr />
                  <div className="modal__footer">
                    <p className="modal__footerText">are you sure want to book?</p>
                  </div>
                  <div className="modal__footerFlex">
                    <button onClick={handleResponseModal} className="modal__footerFlex1">
                      cancel
                    </button>
                    <button onClick={handleSubmit} className="modal__footerFlex2">
                      yes
                    </button>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>

          {/* {<!----------------------------------Personal Info---------------------------------------------->} */}

          <div className="movieSelected__flexs2">
            <h1 className="container movieInfo__headerss">Personal Info</h1>
            <section className="personal__boxs">
              <h5 className="personal__box--headers">Full Name</h5>
              <input
                type="search"
                placeholder="Write Your Full Name"
                className="personal__box--names"
                value={data.firstName + " " + data.lastName}
              />
              <h5 className="personal__box--headers">Email</h5>
              <input
                type="email"
                placeholder="Write Your Email"
                className="personal__box--emails"
                value={data.email}
              />
              <h5 className="personal__box--headers">Phone Number</h5>
              <input
                type="tel"
                placeholder="Write Your phone number"
                className="personal__box--phones"
                data-format="+62"
                value={data.noTelp}
              />
            </section>
            <Link to="/home">
              <button className="orderPage__buttons" onClick={handleSubmit}>
                CheckOut Now
              </button>
            </Link>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default Payment;
