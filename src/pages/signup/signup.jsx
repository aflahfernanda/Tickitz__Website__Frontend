import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const resultLogin = await axios.post("auth/login", form);
      const resultUser = [
        {
          id: 1,
          name: "Bagus"
        }
      ];
      // Output = suatu keadaan yang dapat diinfokan ke user bahwa proses sudah selesai
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      localStorage.setItem("dataUser", JSON.stringify(resultUser[0]));
      navigate("/homePage");

      //   UNTUK GET DATA USER
      //   const dataUser = JSON.parse(localStorage.getItem(dataUser));
    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
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
          <h4 className="input">Email</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Write Your Email"
              className="signUp__input"
              onChange={handleChangeForm}
            />
            <h4 className="input">Password</h4>
            <input
              type="password"
              placeholder="Write Your Password"
              className="signUp__input"
              onKeyPress={handleChangeForm}
            />
            <button className="button__signUp">Sign In</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignUp;
