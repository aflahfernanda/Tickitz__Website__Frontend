import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./index.css";

function ScheduleCard(props) {
  //   const { name, category, src } = props;
  //   const handleDetail = () => {
  //     props.handleDetail(1, data);
  const navigate = useNavigate();
  const { id, image, name, movieId, price, premiere, location, dateStart, dateEnd, time } =
    props.data;
  const handleMovieDetail = () => {
    navigate("/moviedetail");
  };
  return (
    // <section className="movieDetails__movie1">
    // <img
    //   src={
    //     image
    //       ? `https://res.cloudinary.com/da776aoko/image/upload/v1651001489/${image}`
    //       : "https://res.cloudinary.com/da776aoko/image/upload/v1651001489/Tickitz/movie/ekmnkymc7uyk2uk0cxru.jpg"
    //   }
    //   alt="imageJohnWick"
    //   style={{ width: "300px" }}
    // />
    //   <h2 className="movieDetails__title">{name}</h2>
    //   <p className="movieDetails__genre">{category}</p>
    //   <a>
    //     <button className="movieDetails__button" onClick={() => props.handleDetail(id)}>
    //       Details
    //     </button>
    //   </a>
    // </section>
    <>
      <div className="card" style={{ width: "80%" }}>
        <img
          className="card-img-top"
          src={require("../../assets/assets/VectorCinema1.png")}
          alt="Card image cap"
          style={{ width: "250px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{premiere}</h5>
          <p className="card-text">{location}</p>
          {time.split(",").map((item) => (
            <button
              key={item}
              className="showTickets__times--timesLight"
              // onClick={() =>
              //   changeDataBooking({
              //     timeBooking: itemTime,
              //     scheduleId: item.id,
              //     premiere: item.premiere
              //   })
              // }
            >
              {item}
            </button>
          ))}
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
      </div>
    </>
  );
}
ScheduleCard.defaultProps = {
  name: "default name",
  category: "default category"
};

export default ScheduleCard;
