import React, { useEffect } from "react";
import { getTurns } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ turns, type, professionals }) => {
  return type === "turns" ? (
    <div className="cardsContainer">
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
    </div>
  ) : (
    <div>
      {professionals.map(({ id, name }) => {
        return <Card id={id} key={id} name={name} />;
      })}
    </div>
  );
};

export default Cards;
