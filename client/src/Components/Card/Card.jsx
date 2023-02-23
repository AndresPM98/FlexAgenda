import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ name, date, hour, id, type, email, address, description }) => {
  return type === "turns" ? (
          <NavLink to={`/queryDetail/${id}`} className={style.card}>
      {/* <div className={style.card}> */}
        <div className={style.name}>
            {name}
        </div>
        <div className={style.info}>
          <p>{date}</p>
          <p>{hour}</p>
        </div>
      {/* </div> */}
          </NavLink>
  ) : (
      <div className={style.card}>
        <div className={style.name}>
          <NavLink to={`/queryDetail/${id}`} className={style.nameLink}>
            {name}
          </NavLink>
        </div>
        <div className={style.info}>
          <p>{email}</p>
          <p>{address}</p>
          <p>{description}</p>
        </div>
      </div>
  );
};

export default Card;
