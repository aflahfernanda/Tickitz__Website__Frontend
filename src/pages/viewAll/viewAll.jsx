import React, { useState, useEffect } from "react";
import "./viewAll.css";
import Navbar from "../../components/header/Navbar/index";
import Footer from "../../components/footer/index";
import Card from "../../components/card";
import { Link, useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import axios from "../../utils/axios";
import Pagination from "react-paginate";

function ViewAll() {
  // const handleDetailMovie = (id) => {
  //   console.log("detailClick", id);
  // };
  const limit = 8;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const [search, setSearch] = useState(params.search ? params.search : "");
  const [sort, setSort] = useState(params.sort ? params.sort : "");

  const [release, setRelease] = useState(params.releaseDate ? params.releaseDate : "");
  const [page, setPage] = useState(params.page ? params.page : "1");
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  console.log(data);
  useEffect(() => {
    getDataMovie();
  }, []);
  useEffect(() => {
    getDataMovie();
    const params = {};
    if (page !== "1") {
      params.page = page;
    }
    if (release) {
      params.release = release;
    }
    if (search) {
      params.search = search;
    }
    if (sort) {
      params.sort = sort;
    }
    navigate({
      pathname: "/home/viewAll",
      search: `?${createSearchParams(params)}`
    });
  }, [page, release, search, sort]);
  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  const getDataMovie = async () => {
    try {
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=8&sort=${sort}&searchRelease=${release}&searchName=${search}`
      );
      console.log(resultMovie);
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
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
    <div>
      <Navbar />
      <div className="container">
        {/*--------------------------UpcomingMonth-----------------------------*/}

        <section className=" upcomingView" style={{ width: "100%" }}>
          <div className="container upcomingView__header">
            <p className="upcoming__header--upcomingView"> List Movies</p>
            <select name="" id="" placeholder="sort" className="sort__asc" onChange={handleSort}>
              <option value="name ASC"> From A-Z</option>
              <option value="name DESC"> From Z-A</option>
            </select>
            <input
              type="search"
              placeholder="searchMovieName"
              className="upcomingView__header--viewAll"
              onChange={handleSearch}
            />
          </div>

          <div className="upcoming__month">
            <button className="upcomingView__month--buttons" id="" onClick={handleMonth}>
              All Month
            </button>
            <button className="upcomingView__month--buttons" id="01" onClick={handleMonth}>
              January
            </button>
            <button className="upcomingView__month--buttons" id="02" onClick={handleMonth}>
              February
            </button>
            <button className="upcomingView__month--buttons" id="03" onClick={handleMonth}>
              March
            </button>
            <button className="upcomingView__month--buttons" id="04" onClick={handleMonth}>
              April
            </button>
            <button className="upcomingView__month--buttons" id="05" onClick={handleMonth}>
              May
            </button>
            <button className="upcomingView__month--buttons" id="06" onClick={handleMonth}>
              June
            </button>
            <button className="upcomingView__month--buttons" id="07" onClick={handleMonth}>
              July
            </button>
            <button className="upcomingView__month--buttons" id="08" onClick={handleMonth}>
              August
            </button>
            <button className="upcomingView__month--buttons" id="09" onClick={handleMonth}>
              September
            </button>
            <button className="upcomingView__month--buttons" id="10" onClick={handleMonth}>
              October
            </button>
            <button className="upcomingView__month--buttons" id="11" onClick={handleMonth}>
              November
            </button>
            <button className="upcomingView__month--buttons" id="12" onClick={handleMonth}>
              Desember
            </button>
          </div>
          {/*--------------------------Movie details-----------------------------*/}
          {data.length == 0 ? (
            <p className="viewAll__noDataFound">
              ---------------------------No Data Found---------------------------
            </p>
          ) : (
            <div className="movieDetailsViews">
              {data.map((item) => (
                <Card data={item} key={item.id} handleDetail={handleDetailMovie} />
              ))}
            </div>
          )}
        </section>
        <Pagination
          previousLabel={
            <div>
              <p className="pagination_previous">Previous</p>
            </div>
          }
          nextLabel={
            <div>
              <p className="pagination_previous">Next</p>
            </div>
          }
          breakLabel={"..."}
          pageCount={pageInfo.totalPage}
          onPageChange={handlePagination}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          // pageClassName="paginations"
          pageLinkClassName="paginations"
          initialPage={page - 1}
        />
        <Footer />
      </div>
    </div>
  );
}

export default ViewAll;
