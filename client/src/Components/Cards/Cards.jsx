import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ turns, type, professionals }) => {
  return type === "turns" ? (
    <div className={style.cardsContainer}>
      <div className={style.borderCards}></div>

      {turns.map((turn) => {
        return (
          <Card
            id={turn.id}
            key={turn.id}
            name={turn.client.name}
            date={turn.date}
            hour={turn.hour}
            type="turns"
          />
        );
      })}
      <div className={style.borderCards}></div>
    </div>
  ) : (
    <div>
      {professionals.map(({ id, name, email, address, description }) => {
        return (
          <Card
            id={id}
            key={id}
            name={name}
            email={email}
            address={address}
            description={description}
          />
        );
      })}
    </div>
  );
};

export default Cards;
