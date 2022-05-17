import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById } from "../../stores/actions/user";
import "./signup.css";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleChangeForm = (event) => {
    // console.log("User sedang mengetik");
    // console.log(event.target.name);
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(event.target.name);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log("Submit Login");
      // Input = email password di siapkan
      // console.log(form);
      // Proses = memanggil axios
      const resultLogin = await axios.post("auth/login", form);
      console.log(resultLogin.data.msg);
      // Output = suatu keadaan yang dapat diinfokan ke user bahwa proses sudah selesai
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);

      await dispatch(getUserById(resultLogin.data.data.id));

      if (resultLogin.data.msg === "succes login to admin") {
        navigate("/manageMovie");
      } else {
        navigate("/home");
      }
      //   UNTUK GET DATA USER
      //   const dataUser = JSON.parse(localStorage.getItem(dataUser));
    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset Form");
  };

  return (
    <>
      <main>
        <section className="signUp__image__login">
          <img src={require("./assets/tickitz 1.png")} alt="logoImg" className="tickitz" />
          <p className="tickitz__desc"> wait, watch, wow</p>
        </section>
        <section className="signUp">
          <img src={require("./assets/Tickitz 2.png")} alt="smallLogoImg" className="tickitzLogo" />
          <h1 className="signUp__header">Sign In</h1>
          <h3 className="signUp__subHeader">
            Sign in with your data that you entered during your registration
          </h3>
          {!message ? null : isError ? (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          ) : (
            <div className="alert alert-primary" role="alert">
              {message}
            </div>
          )}
          {/*handle submit---------------------------------*/}
          <h4 className="input__header">Email</h4>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <input
              type="email"
              placeholder="Write Your Email"
              name="email"
              className="signUp__input"
              onChange={handleChangeForm}
            />
            <h4 className="input__header">Password</h4>
            <input
              type="password"
              name="password"
              placeholder="Write Your Password"
              className="signUp__input"
              onChange={handleChangeForm}
            />
            <button className="button__signUp" type="submit">
              Sign In
            </button>
          </form>
          <p>
            dont have an account?<a href="/signin">SignUp</a>
          </p>
        </section>
      </main>
    </>
  );
}

export default SignUp;
