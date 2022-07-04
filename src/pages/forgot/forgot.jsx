import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById } from "../../stores/actions/user";
import "./forgot.css";

function Forgot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: ""
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
      const resultLogin = await axios.post("auth/forgotPassword", form);
      console.log(resultLogin);
      // Output = suatu keadaan yang dapat diinfokan ke user bahwa proses sudah selesai
      setIsError(false);
      setMessage(resultLogin.data.msg);
      alert(resultLogin.data.msg);
      navigate("/login");
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
        <div className="signUp__image__login">
          <image src={require("./assets/Group 10.png")} />
          <img src={require("./assets/tickitz 1.png")} alt="smallLogoImg" className="tickitzs" />
          <p className="tickitzs__desc">Lets reset your password</p>
          <p className="tickitzs__descs">
            To be able to use your account again, please complete the following steps.
          </p>
          <p className="tickitzs__descss">1. Fill your complete email</p>
          <p className="tickitzs__descss">2. Check your email</p>
          <p className="tickitzs__descss">3. Enter your new password</p>
          <p className="tickitzs__descss">4. Done</p>
        </div>
        <section className="signUp">
          <img src={require("./assets/Tickitz 2.png")} alt="smallLogoImg" className="tickitzLogo" />
          <h1 className="signUp__headers">Fill your complete email</h1>
          <h3 className="signUp__subHeader">well send a link to your email shortly</h3>
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
            <button className="button__signUps" type="submit">
              Send
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Forgot;
