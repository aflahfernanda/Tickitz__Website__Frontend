import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer";
import { useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody, Alert } from "reactstrap";
import { Line } from "react-chartjs-2";
import chart from "chart.js/auto";

function Dashboard() {
  const [dashboard, setdashboard] = useState([]);
  const [movie, setMovie] = useState([]);
  const [movieId, setMovieId] = useState("1");
  const [location, setLocation] = useState("");
  const [premiere, setPremiere] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [jan, setJan] = useState([]);
  const [feb, setFeb] = useState([]);
  const [march, setMarch] = useState([]);
  const [apr, setApr] = useState([]);
  const [may, setMay] = useState([]);
  const [jun, setJun] = useState([]);
  const [jul, setJul] = useState([]);
  const [aug, setAug] = useState([]);
  const [sep, setSep] = useState([]);
  const [oct, setOct] = useState([]);
  const [nov, setNov] = useState([]);
  const [dec, setDec] = useState([]);

  const [date, setDate] = useState([]);
  const janMonth = jan.map((item) => item.totalPayment);
  const sumJan = janMonth.reduce((partialSum, a) => partialSum + a, 0);
  const febMonth = feb.map((item) => item.totalPayment);
  const sumFeb = febMonth.reduce((partialSum, a) => partialSum + a, 0);
  const marMonth = march.map((item) => item.totalPayment);
  const sumMar = marMonth.reduce((partialSum, a) => partialSum + a, 0);
  const aprMonth = apr.map((item) => item.totalPayment);
  const sumApr = aprMonth.reduce((partialSum, a) => partialSum + a, 0);
  const mayMonth = may.map((item) => item.totalPayment);
  const sumMay = mayMonth.reduce((partialSum, a) => partialSum + a, 0);
  const junMonth = jun.map((item) => item.totalPayment);
  const sumJun = junMonth.reduce((partialSum, a) => partialSum + a, 0);
  const julMonth = jul.map((item) => item.totalPayment);
  const sumJul = julMonth.reduce((partialSum, a) => partialSum + a, 0);
  const augMonth = aug.map((item) => item.totalPayment);
  const sumAug = augMonth.reduce((partialSum, a) => partialSum + a, 0);
  const sepMonth = sep.map((item) => item.totalPayment);
  const sumSep = sepMonth.reduce((partialSum, a) => partialSum + a, 0);
  const octMonth = oct.map((item) => item.totalPayment);
  const sumOct = octMonth.reduce((partialSum, a) => partialSum + a, 0);
  const novMonth = nov.map((item) => item.totalPayment);
  const sumNov = novMonth.reduce((partialSum, a) => partialSum + a, 0);
  const decMonth = dec.map((item) => item.totalPayment);
  const sumDec = decMonth.reduce((partialSum, a) => partialSum + a, 0);
  useEffect(() => {
    getDashboard();
  }, [movieId, premiere, location]);
  useEffect(() => {
    getDataMovie();
  }, []);
  useEffect(() => {
    getDataSchedule();
  }, [movieId]);
  const getDashboard = async () => {
    try {
      const result = await axios.get(
        `booking/dashboard?premiere=${premiere}&movieId=${movieId}&location=${location}`
      );
      //   setdashboard(result.data.data.map((item) => item.totalPayment));
      setJan(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "01"));
      setFeb(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "02"));
      setMarch(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "03"));
      setApr(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "04"));
      setMay(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "05"));
      setJun(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "06"));
      setJul(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "07"));
      setAug(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "08"));
      setSep(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "09"));
      setOct(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "10"));
      setNov(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "11"));
      setDec(result.data.data.filter((value) => value.dateBooking.split("-")[1] === "12"));
      setDate(result.data.data.map((item) => item.dateBooking.split("-")[1]));
    } catch (error) {
      console.log(error);
    }
  };
  const getDataMovie = async () => {
    const result = await axios.get("movie?page=1&limit=100&sort=&searchRelease=&searchName=");
    setMovie(result.data.data);
  };
  const getDataSchedule = async () => {
    const result = await axios.get(
      `schedule?page=1&limit=100&searchLocation=&searchMovieId=${movieId}&searchDate=`
    );
    setSchedule(result.data.data);
  };
  const handleMovieId = (e) => {
    setMovieId(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handlePremiere = (e) => {
    setPremiere(e.target.value);
  };
  const handleReset = () => {
    setPremiere("");
    setMovieId("");
    setLocation("");
  };
  {
    /*handle Chart--------------------------------------------*/
  }
  const datas = {
    labels: ["jan", "feb", "march", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    datasets: [
      {
        fill: false,
        label: "Data Dashboard",
        backgroundColor: "#5F2EEA",
        borderColor: "#5F2EEA",
        data: [
          sumJan,
          sumFeb,
          sumMar,
          sumApr,
          sumMay,
          sumJun,
          sumJul,
          sumAug,
          sumSep,
          sumOct,
          sumNov,
          sumDec
        ],
        yAxisID: "y-axis-1"
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      yAxis: [
        {
          //   type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            drawOnArea: false
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="dashboard__backgroundColor">
          <div className=" container dashboard__background">
            <h1>hello</h1>
            <div className="dashboard__flexBackground">
              <div className="dashboard__flex1">
                <p className="dashboard__header">Dashboard</p>
                <div className="dashboard__backgroundGrafic">
                  <Line data={datas} options={options} />
                </div>
              </div>
              <div className="dashboard__flex2">
                <p className="dashboard__header">Filtered</p>
                <div className="dashboard__backgroundGrafic">
                  <div>
                    <select name="" id="" className="dashboard__sortMovie" onChange={handleMovieId}>
                      {movie.map((item) => (
                        <option value={item.id} key={item.id} className="dashboard__option">
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name=""
                      id=""
                      className="dashboard__sortMovie"
                      onChange={handleLocation}>
                      <option value="" disabled selected>
                        Choose Your Option
                      </option>
                      {schedule.map((item) => (
                        <option value={item.location} key={item.id} className="dashboard__option">
                          {item.location}
                        </option>
                      ))}
                    </select>
                    <select
                      name=""
                      id=""
                      className="dashboard__sortMovie"
                      onChange={handlePremiere}>
                      <option value="" disabled selected>
                        Choose Your Option
                      </option>
                      {schedule.map((item) => (
                        <option value={item.premiere} key={item.id} className="dashboard__option">
                          {item.premiere}
                        </option>
                      ))}
                    </select>
                    <button className="dashboard__filter" onClick={handleReset}>
                      {" "}
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
