import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function Seat(props) {
  const { rowSeat, selectedSeat, reserved, selected } = props;
  const [leftSeat, setLeftSeat] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [rightSeat, setRightSeat] = useState([8, 9, 10, 11, 12, 13, 14]);

  useEffect(() => {
    setUpSeat();
  }, []);
  const setUpSeat = () => {
    const leftSeatRow = leftSeat.map((item) => `${rowSeat}${item}`);
    const rightSeatRow = rightSeat.map((item) => `${rowSeat}${item}`);
    setLeftSeat(leftSeatRow);
    setRightSeat(rightSeatRow);
  };
  return (
    <div className="seat">
      <div className="row seat__row">
        <div className="col seat__col">{rowSeat}</div>

        {leftSeat.map((item) => (
          <div className="col seat__col" key={item}>
            <div
              className={`seat__list ${
                reserved.includes(item)
                  ? "seat__list--sold"
                  : selected.includes(item)
                  ? "seat__list--selected"
                  : "seat__list--available"
              }`}
              key={item}
              onClick={() => {
                reserved.includes(item) ? null : selectedSeat(item);
              }}></div>
          </div>
        ))}

        <div className="col seat__col"></div>

        {rightSeat.map((item) => (
          <div className="col seat__col" key={item}>
            <div
              className={`seat__list ${
                reserved.includes(item)
                  ? "seat__list--sold"
                  : selected.includes(item)
                  ? "seat__list--selected"
                  : "seat__list--available"
              }`}
              key={item}
              onClick={() => {
                reserved.includes(item) ? null : selectedSeat(item);
              }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seat;
