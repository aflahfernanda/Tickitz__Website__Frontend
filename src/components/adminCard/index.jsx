import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./index.css";

function AdminCard(props) {
  //   const { name, category, src } = props;
  //   const handleDetail = () => {
  //     props.handleDetail(1, data);
  const navigate = useNavigate();
  const { id, name, category, image } = props.data;
  const handleMovieDetail = () => {
    navigate("/moviedetail");
  };
  return (
    <>
      <section className="card">
        <img
          src={
            image
              ? `https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${image}`
              : "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/movie/ekmnkymc7uyk2uk0cxru.jpg"
          }
          alt="imageJohnWick"
          style={{ width: "300px" }}
        />
        <h2 className="card__titleMovie">{name}</h2>
        <p className="card__genreMovie">{category}</p>
        <a>
          <button className="card__buttonMovie" onClick={() => props.setUpdate(props.data)}>
            Update
          </button>
          <button
            className="card__buttonMovie"
            style={{
              color: "red",
              border: "solid red 1px",
              marginLeft: "10px"
            }}
            onClick={() => props.handleDelete(id)}>
            Delete
          </button>
        </a>
      </section>
      {/* <div className="card" style={{ width: "80%" }}>
        <img
          className="card-img-top"
          src={
            image
              ? `https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${image}`
              : "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/movie/ekmnkymc7uyk2uk0cxru.jpg"
          }
          alt="Card image cap"
          style={{ width: "250px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{category}</p>
          <button
            className="btn btn-outline-primary"
            style={{
              border: "solid blueviolet 1px",
              color: "blueviolet",
              margin: "0px 10px",
              fontWeight: "bold"
            }}
            onClick={() => props.setUpdate(props.data)}
          >
            Update
          </button>
          <button
            className="btn btn-outline-danger"
            style={{ margin: "0px 10px", fontWeight: "bold" }}
            onClick={() => props.handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div> */}
    </>
  );
}
AdminCard.defaultProps = {
  name: "default name",
  category: "default category"
};

export default AdminCard;
