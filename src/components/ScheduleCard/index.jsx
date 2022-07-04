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
      <div className="showTickets__box">
        <div className="showTickets__header">
          {premiere === "hiflix" ? (
            <img
              src={require("../../assets/assets/VectorCinema3.png")}
              alt="ubv.id"
              className="showTickets__box--images"
            />
          ) : premiere === "ebu.id" ? (
            <img
              src={require("../../assets/assets/VectorCinema1.png")}
              alt="ubv.id"
              className="showTickets__box--images"
            />
          ) : premiere === "CineOne21" ? (
            <img
              src={require("../../assets/assets/VectorCinema2.png")}
              alt="ubv.id"
              className="showTickets__box--images"
            />
          ) : null}

          <section className="showTickets__box--title">
            <h3 className="showTickets__box--header"> {premiere}</h3>
            <p className="showTickets__box--location">{location}</p>
          </section>
        </div>
        <hr />
        <section className=" container showTickets__times">
          {time.split(",").map((itemTime) => (
            <button
              key={itemTime}
              className="showTickets__times--timesLight"
              // onClick={() =>
              //   changeDataBooking({
              //     timeBooking: itemTime,
              //     scheduleId: item.id,
              //     premiere: item.premiere,
              //     price: item.price
              //   })
              // }
            >
              {itemTime}
            </button>
          ))}
        </section>
        <div className="card__priceTicket">
          <p className="card__priceTicket__price">Price</p>
          <p className="card__priceTicket__total">Rp.{price}</p>
        </div>
        <button
          className="showTickets__button"
          // disabled={item.id === dataOrder.scheduleId ? false : true}
          onClick={() => props.setUpdate(props.data)}
          style={{ marginBottom: "0" }}
        >
          {" "}
          Update
        </button>
        <button
          className="showTickets__button"
          // disabled={item.id === dataOrder.scheduleId ? false : true}
          onClick={() => props.handleDelete(id)}
          style={{ backgroundColor: "red" }}
        >
          {" "}
          Delete
        </button>
      </div>
    </>
  );
}
ScheduleCard.defaultProps = {
  name: "default name",
  category: "default category"
};

export default ScheduleCard;
