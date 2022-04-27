import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./index.css";

function Card(props) {
  //   const { name, category, src } = props;
  //   const handleDetail = () => {
  //     props.handleDetail(1, data);
  const navigate = useNavigate();
  const { id, name, category, image } = props.data;
  const handleMovieDetail = () => {
    navigate("/moviedetail");
  };
  return (
    <section className="movieDetails__movie1">
      <img
        src={
          image
            ? `https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${image}`
            : "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/movie/ekmnkymc7uyk2uk0cxru.jpg"
        }
        alt="imageJohnWick"
        style={{ width: "100%" }}
      />
      <h2 className="movieDetails__title">{name}</h2>
      <p className="movieDetails__genre">{category}</p>
      <a>
        <button className="movieDetails__button" onClick={() => props.handleDetail(id)}>
          Details
        </button>
      </a>
    </section>
  );
}
Card.defaultProps = {
  name: "default name",
  category: "default category"
};

export default Card;
