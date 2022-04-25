import React, { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./signIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  // const [keyword, setKeyword] = useState("");

  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    if (event.key === "Enter") {
      console.log("user input a password");
      console.log("password is", event.target.value);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <>
      <main>
        <section className="signUp__image">
          <img src={require("./assets/tickitz 1.png")} alt="logoImg" className="tickitz" />
          <p className="tickitz__desc"> wait, watch, wow</p>
        </section>
        <section className="signUp">
          <img src={require("./assets/Tickitz 2.png")} alt="smallLogoImg" className="tickitzLogo" />
          <h1 className="signUp__header">Sign Up</h1>
          <h3 className="signUp__subHeader">fill your aditional details</h3>
          <h4 className="input">First Name</h4>
          <input type="text" placeholder="Write Your First Name" className="signUp__input" />
          <h4 className="input">Last Name</h4>
          <input type="text" placeholder="Write Your Last Name" className="signUp__input" />
          <h4 className="input">Phone Number</h4>
          <input type="number" placeholder="Write Your Phone Number" className="signUp__input" />
          <h4 className="input">Email</h4>
          <input
            type="email"
            placeholder="Write Your Email"
            className="signUp__input"
            onChange={handleChangeEmail}
          />
          <h4 className="input">Password</h4>
          <input
            type="password"
            placeholder="Write Your Password"
            className="signUp__input"
            onKeyPress={handlePassword}
          />
          <button onClick={handleSubmit} className="button__signUp">
            Sign Up
          </button>
        </section>
      </main>
    </>
  );
}

export default SignIn;
