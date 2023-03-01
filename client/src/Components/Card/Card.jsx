import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
const Card = ({ name, date, hour, id, type, email, address, description, status  }) => {




  return type === "turns" ? (
          <NavLink to={`/queryDetail/${id}`} className={style.card}>
      {/* <div className={style.card}> */}
        <div className={style.name}>
            {name}
        </div>
        <div className={style.info}>
          <p style={{marginBottom:"40px"}}>{date} </p>
          <p style={{marginBottom:"40px"}}>{hour}</p>
          <p style={status === "Cancelado" ? {color: 'red', fontWeight: 'bold', marginBottom:"40px"} : {color: 'green', fontWeight: 'bold', marginBottom:"40px"}}> {status} </p>
        </div>
        
          </NavLink>
  ) : (
      <div className={style.card}>
        <div className={style.name}>
          <NavLink to={`/Calendarpage/${id}`} className={style.nameLink}>
            {name}
          </NavLink>
        </div>
        <div className={style.info}>
          <p style={{marginBottom:"40px"}}>{email}</p>
          <p> {address} </p>
          <p> {description}</p>
          
        </div>
      </div>
  );
};

export default Card;
