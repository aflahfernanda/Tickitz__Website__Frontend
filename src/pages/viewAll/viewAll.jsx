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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [release, setRelease] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    getDataMovie();
  }, []);
  useEffect(() => {
    getDataMovie();
  }, [page]);
  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  const getDataMovie = async () => {
    try {
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&sort=${sort}&searchRelease=${release}&searchName=${search}`
      );
      console.log(resultMovie);
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
      console.log(event.target.value);
    }
  };
  const handleSort = (event) => {
    setSort(event.target.value);
  };
  const handleMonth = (event) => {
    setRelease(event.target.id);
  };
  const handleDetailMovie = (id) => {
    navigate(`/moviedetail/${id}`);
  };
  return (
    <>
      <Navbar />
      {/*--------------------------UpcomingMonth-----------------------------*/}

      <section className=" upcomingView" style={{ width: "100%" }}>
        <div className="container upcomingView__header">
          <p className="upcoming__header--upcomingView"> List Movies</p>
          <select name="" id="" placeholder="sort" className="sort__asc" onChange={handleSort}>
            <option value="name ASC">From Top</option>
            <option value="name DESC">From Bottom</option>
          </select>
          <input
            type="search"
            placeholder="searchMovieName"
            className="upcomingView__header--viewAll"
            onKeyPress={handleSearch}
          />
        </div>

        <div className="upcoming__month">
          <button className="upcomingView__month--button" id="" onClick={handleMonth}>
            All Month
          </button>
          <button className="upcomingView__month--button" id="01" onClick={handleMonth}>
            January
          </button>
          <button className="upcomingView__month--button" id="02" onClick={handleMonth}>
            February
          </button>
          <button className="upcomingView__month--button" id="03" onClick={handleMonth}>
            March
          </button>
          <button className="upcomingView__month--button" id="04" onClick={handleMonth}>
            April
          </button>
          <button className="upcomingView__month--button" id="05" onClick={handleMonth}>
            May
          </button>
          <button className="upcomingView__month--button" id="06" onClick={handleMonth}>
            June
          </button>
          <button className="upcomingView__month--button" id="07" onClick={handleMonth}>
            July
          </button>
          <button className="upcomingView__month--button" id="08" onClick={handleMonth}>
            August
          </button>
          <button className="upcomingView__month--button" id="09" onClick={handleMonth}>
            September
          </button>
          <button className="upcomingView__month--button" id="10" onClick={handleMonth}>
            October
          </button>
          <button className="upcomingView__month--button" id="11" onClick={handleMonth}>
            November
          </button>
          <button className="upcomingView__month--button" id="12" onClick={handleMonth}>
            Desember
          </button>
        </div>
        {/*--------------------------Movie details-----------------------------*/}
        <div className="movieDetailsView">
          {data.map((item) => (
            <Card data={item} key={item.id} handleDetail={handleDetailMovie} />
          ))}
        </div>
      </section>
      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={3}
        onPageChange={handlePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        initialPage={page - 1}
      />
      <Footer />
    </>
  );
}

export default ViewAll;
