import React, { useState } from "react";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

// FRONTEND
// 1. Slicing
// 2. Pembuatan fungsi
// 3. Integrasi
// 3.a input
// 3.b process
// 3.c output

function Login() {
  const navigate = useNavigate();
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
    console.log(form);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log("Submit Login");
      // Input = email password di siapkan
      // console.log(form);
      // Proses = memanggil axios
      const resultLogin = await axios.post("auth/login", form);
      // proses get data user by id
      //   const resultUser = await axios.get(`user/${resultLogin.data.data.id}`)
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
      navigate("/home");

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
    <div className="text-center container">
      <h1>Login Page</h1>
      {/* {isError && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )} */}
      {!message ? null : isError ? (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      ) : (
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input type="email" placeholder="Input email" name="email" onChange={handleChangeForm} />
        <br />
        <input
          type="password"
          placeholder="Input Password"
          name="password"
          onChange={handleChangeForm}
        />
        <br />
        <button className="btn btn-outline-primary" type="reset">
          Reset
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
