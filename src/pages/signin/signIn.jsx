import React, { useState } from "react";
import axios from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./signIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // const [keyword, setKeyword] = useState("");
  console.log(form);
  const handleChangeForm = (event) => {
    // console.log("User sedang mengetik");
    // console.log(event.target.name);
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };
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
      const resultLogin = await axios.post("auth/register", form);
      const resultUser = [
        {
          id: 1,
          name: "aflah",
          role: "admin"
        }
      ];
      console.log(resultLogin);
      console.log(resultLogin.data.msg);
      // Output = suatu keadaan yang dapat diinfokan ke user bahwa proses sudah selesai
      setIsError(false);
      setMessage(resultLogin.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
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
          {!message ? null : isError ? (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          ) : (
            <div className="alert alert-primary" role="alert">
              {message}
            </div>
          )}
          <h4 className="input">First Name</h4>
          <input
            type="search"
            placeholder="write your first name"
            className="signUp__inputName"
            onChange={handleChangeForm}
            name="firstName"
          />
          <h4 className="input">Last Name</h4>
          <input
            type="search"
            placeholder="write your first name"
            className="signUp__inputName"
            onChange={handleChangeForm}
            name="lastName"
          />
          <h4 className="input">Phone Number</h4>
          <input
            type="number"
            placeholder="Write Your Phone Number"
            className="signUp__input"
            onChange={handleChangeForm}
            name="noTelp"
          />
          <h4 className="input">Email</h4>
          <input
            type="email"
            placeholder="Write Your Email"
            className="signUp__input"
            onChange={handleChangeForm}
            name="email"
          />
          <h4 className="input">Password</h4>
          <input
            type="password"
            placeholder="Write Your Password"
            className="signUp__input"
            onChange={handleChangeForm}
            name="password"
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
