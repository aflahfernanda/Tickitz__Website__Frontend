import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById } from "../../stores/actions/user";
import "./ticket.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer";

function Ticket() {
  const { state } = useLocation();
  const bookingId = state[0];
  const [data, setData] = useState([]);
  const [seat, setSeat] = useState([]);
  useEffect(() => {
    getDataBooking();
  }, []);
  const getDataBooking = async () => {
    const result = await axios.get(`booking/bookingId/${bookingId}`);
    setSeat(result.data.data.seatResult.map((item) => item.seat));
    setData(result.data.data[0]);
  };
  const date = data.dateBooking?.split("T")[0];
  const time = data.timeBooking?.split(".")[0];
  return (
    <>
      <Navbar />
      <h1>hello</h1>
      <div className="backgroundTicket">
        <div className="container">
          <div className="ticket__background">
            <p className="ticket__header">Proof Of Payment</p>
            <div className="ticket__headerTicket">
              <div className="ticket__headerTicket1">
                <img src={require("../signup/assets/tickitz 1.png")} alt="tickitz" width="20%" />
                <p className="ticket__headerDesc">Admit One</p>
              </div>
              <div className="ticket__headerTicket2">
                <img src={require("../signup/assets/tickitz 1.png")} alt="tickitz" width="50%" />
              </div>
            </div>
            <div className="ticket__bodyTicket">
              <div className="ticket__bodyTicket1">
                <p className="ticket__movieHeader">Movie</p>
                <p className="ticket__movieName">{data.name}</p>
                <div className="ticket__bodyTicketGrid">
                  <div>
                    <p className="ticket__bodyResultHeaders">Date</p>
                    <p className="ticket__bodyResultBody">{date}</p>
                  </div>
                  <div>
                    <p className="ticket__bodyResultHeaders">Time</p>
                    <p className="ticket__bodyResultBody">{time}</p>
                  </div>
                  <div>
                    <p className="ticket__bodyResultHeaders">Category</p>
                    <p className="ticket__bodyResultBody">{data.category}</p>
                  </div>
                  <div>
                    <p className="ticket__bodyResultHeaders">Count</p>
                    <p className="ticket__bodyResultBody">{data.totalTicket} pieces</p>
                  </div>
                  <div>
                    <p className="ticket__bodyResultHeaders">Seats</p>
                    <p className="ticket__bodyResultBody">{seat}</p>
                  </div>
                  <div>
                    <p className="ticket__bodyResultHeaders">Price</p>
                    <p className="ticket__bodyResultBody"> Rp.{data.totalPayment}</p>
                  </div>
                </div>
              </div>
              <div className="ticket__bodyTicket2">
                <img
                  src={require("../../assets/assets/QR Code 1.png")}
                  alt="tickitz"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Ticket;
