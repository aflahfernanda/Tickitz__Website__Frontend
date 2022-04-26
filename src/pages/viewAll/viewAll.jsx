import React, { useState, useEffect } from "react";
import "./viewAll.css";
import Navbar from "../../components/header/Navbar/index";
import Footer from "../../components/footer/index";
import Card from "../../components/card";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Pagination from "react-paginate";

function ViewAll() {
  // const handleDetailMovie = (id) => {
  //   console.log("detailClick", id);
  // };
  const limit = 8;
  const search = "Lupin";
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    getDataMovie();
  }, []);
  const getDataMovie = async () => {
    try {
      console.log("getDataMovie");
      //   console.log(limit);
      //   console.log(page);
      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      console.log(resultMovie);
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getSearchMovie = async () => {
    try {
      console.log("getSearchMovie");
      console.log(search);
      const resultSearch = await axios.get(
        `movie?page=${page}&limit=${limit}&searchName=${search}`
      );
      console.log(resultSearch);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    console.log(id);
  };
  getSearchMovie();
  console.log(search);
  return (
    <>
      <Navbar />
      {/*--------------------------UpcomingMonth-----------------------------*/}

      <section className=" upcomingView" style={{ width: "100%" }}>
        <div className="container upcomingView__header">
          <p className="upcoming__header--upcomingView"> List Movies</p>
          <select name="" id="" placeholder="sort" className="sort__asc">
            <option value="">From Top</option>
            <option value="">From Bottom</option>
          </select>
          <input
            type="search"
            placeholder="searchMovieName"
            className="upcomingView__header--viewAll"
          />
        </div>

        <div className="upcoming__month">
          <button className="upcomingView__month--button">January</button>
          <button className="upcomingView__month--button">February</button>
          <button className="upcomingView__month--button">March</button>
          <button className="upcomingView__month--button">April</button>
          <button className="upcomingView__month--button">May</button>
          <button className="upcomingView__month--button">June</button>
          <button className="upcomingView__month--button">July</button>
          <button className="upcomingView__month--button">August</button>
          <button className="upcomingView__month--button">September</button>
          <button className="upcomingView__month--button">October</button>
          <button className="upcomingView__month--button">November</button>
          <button className="upcomingView__month--button">Desember</button>
        </div>
        {/*--------------------------Movie details-----------------------------*/}
        <div className="movieDetailsView">
          {data.map((item) => (
            <Card data={item} key={item.id} handleDetail={handleDetailMovie} />
          ))}
        </div>
      </section>
      <Pagination previousLabel={"previous"} nextLabel={"next"} breakLabel={"..."} pageCount={10} />
      <Footer />
    </>
  );
}

export default ViewAll;
