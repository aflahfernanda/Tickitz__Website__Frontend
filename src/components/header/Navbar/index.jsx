import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import axios from "../../../utils/axios";

function Navbar() {
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState("");

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    alert("Succes Log Out");
    navigate("/");
  };
  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      const id = localStorage.getItem("id");
      const result = await axios.get(`user/${id}`);
      setData(result.data.data[0]);
      setIsAdmin(result.data.data[0].role);
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log(isAdmin);
  const handleHome = () => {
    navigate("/home");
  };
  const handleHamburger = () => {
    if (showMenu == false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };
  return (
    <div>
      <div className="navBackground">
        {isAdmin === "ADMIN" ? (
          <nav className="container-fluid navbar navbar-expand-lg navbar-light nav--edit background">
            <div className="container-fluid">
              <a className="navbar-brand" href="/manageMovie">
                <img
                  src={require("./assets/Tickitz 2.png")}
                  alt="logo/image"
                  width="60%"
                  onClick={handleHome}
                />
              </a>
              <div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={handleHamburger}>
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="dropdown-content">
                  <a href="#">Edit Profile</a>
                  <a href="/login">Log Out</a>
                </div>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/manageMovie">
                      Manage Movie
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/manageSchedule">
                      Manage Schedule
                    </a>
                  </li>
                </ul>
                <form className="d-flex">
                  <input type="text" name="search" placeholder="Search.." className="inputSearch" />
                </form>
                <div className="dropdown">
                  <button className="dropbtn borderbox">
                    <img
                      src={
                        "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/user/pablzpvknbdiz3zdbgv4.png"
                      }
                      alt=""
                      width="100%"
                      className="imagepx"
                    />
                  </button>
                  <div className="dropdown-content">
                    <a onClick={handleLogout} href="" className="dropdown_edit">
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="container-fluid navbar navbar-expand-lg navbar-light nav--edit background">
            <div className="container-fluid">
              <a className="navbar-brand" href="/home">
                <img
                  src={require("./assets/Tickitz 2.png")}
                  alt="logo/image"
                  width="60%"
                  onClick={handleHome}
                />
              </a>
              <div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={handleHamburger}>
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="dropdown-content">
                  <a href="#">Edit Profile</a>
                  <a href="/login">Log Out</a>
                </div>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/home">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/home/viewAll">
                      List Movie
                    </a>
                  </li>
                </ul>
                <form className="d-flex">
                  <input type="text" name="search" placeholder="Search.." className="inputSearch" />
                </form>
                <div className="dropdown">
                  <button className="dropbtn">
                    {data.image == null ? (
                      <img
                        src={
                          "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/user/pablzpvknbdiz3zdbgv4.png"
                        }
                        alt=""
                        className="imagepx"
                      />
                    ) : (
                      <img
                        src={`https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${data.image}`}
                        alt=""
                        className="imagepx"
                      />
                    )}
                  </button>
                  <div className="dropdown-content">
                    <a href="/profile" className="dropdown_edit">
                      Edit Profile
                    </a>
                    <a onClick={handleLogout} href="" className="dropdown_edit">
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
      <h1>hello</h1>
      {isAdmin === "ADMIN" ? (
        showMenu ? (
          <div className="hamburger__menu">
            <a
              href="/manageMovie"
              style={{ textDecoration: "none", backgroundColor: "none", color: "black" }}>
              <p className="hamburger__menu--button">Manage Movie</p>
            </a>
            <a
              href="/manageSchedule"
              style={{ textDecoration: "none", backgroundColor: "none", color: "black" }}>
              {" "}
              <p className="hamburger__menu--button">Manage Schedule</p>
            </a>
            <a
              href="/dashboard"
              style={{ textDecoration: "none", backgroundColor: "none", color: "black" }}>
              {" "}
              <p className="hamburger__menu--button">Dashboard</p>
            </a>

            <p className="hamburger__menu--button" onClick={handleLogout}>
              Logout
            </p>
            <p className="hamburger__menu--footer">© 2020 Tickitz. All Rights Reserved.</p>
          </div>
        ) : null
      ) : showMenu ? (
        <div className="hamburger__menu">
          <a
            href="/home"
            style={{ textDecoration: "none", backgroundColor: "none", color: "black" }}>
            <p className="hamburger__menu--button">Home</p>
          </a>
          <a
            href="/home/viewAll"
            style={{ textDecoration: "none", backgroundColor: "none", color: "black" }}>
            {" "}
            <p className="hamburger__menu--button">List Movie</p>
          </a>
          <a
            href="/profile"
            style={{ textDecoration: "none", backgroundColor: "none", color: "black" }}>
            {" "}
            <p className="hamburger__menu--button">Profile</p>
          </a>

          <p className="hamburger__menu--button" onClick={handleLogout}>
            Logout
          </p>
          <p className="hamburger__menu--footer">© 2020 Tickitz. All Rights Reserved.</p>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
