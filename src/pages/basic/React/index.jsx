import React, { useState } from "react";

import styles from "./React.module.css";
import Navbar from "../../../components/basic/Navbar";

function BasicReact() {
  const data = [
    { id: 1, name: "spiderman" },
    { id: 2, name: "batman" },
    { id: 3, name: "lego" }
  ];
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showDate, setShowDate] = useState(false);

  const handleClick = (age, name) => {
    alert("Button clicked !");
    console.log(name, age);
  };

  const handleSubmit = (event, data) => {
    event.preventDefault();
    console.log("Submit", data);
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset");
  };

  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handleSearch = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      console.log("user press enter");
      console.log("keyword", event.target.value);
    }
  };
  return (
    <>
      <h1>Basic React Page</h1>
      <h3>Component</h3>
      <Navbar />
      <hr />
      <h3>mapping</h3>
      {data.map((item, index) => (
        <div key={item.id}>
          <button>{item.name}</button>
        </div>
      ))}
      <h3>Event</h3>
      <h5>Button</h5>
      {/*onCLick*/}
      <button onClick={handleClick}> click me</button>
      <button onClick={() => handleClick}> click me</button>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <button onClick={handleClick}> Click Me</button>
        <button type="submit"> onSubmit</button>
        <button type="reset">onReset</button>
      </form>
      <h5>Input</h5>
      {/*onChange*/}
      <input
        type="email"
        placeholder="input your email"
        onChange={handleChangeEmail}
        // onChange={(event) => setEmail(event.target.value)}
      />
      <h6>Your Email is {email}</h6>
      {/*onKeyPress*/}
      <input type="text" placeholder="search" onKeyPress={handleSearch} />
      <h3>Conditional Rendering</h3>
      <h5>Short Logic</h5>
      <button onClick={() => setShowDate(!showDate)}>Show Date</button>
      {showDate && <h1>{new Date().toLocaleDateString()}</h1>}
      <h5>Ternary operator</h5>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={item.id}>
            <button>{item.name}</button>
          </div>
        ))
      ) : (
        <h6>data not found</h6>
      )}
      <h3>Style in React</h3>
      {/* react module */}
      <h1 className={`${styles.heading} ${styles.textUnderline} text-center`}>Hello World</h1>
      <h1 className={(styles.heading, styles.textUnderline)}>Hello World</h1>
      <h1 className={styles.heading2}>Hello World</h1>
    </>
  );
}

export default BasicReact;
