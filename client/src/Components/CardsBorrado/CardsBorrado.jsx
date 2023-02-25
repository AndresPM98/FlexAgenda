import React from "react";
import CardBorrado from "../CardBorrado/CardBorrado";
import style from "./CardsBorrado.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfessionals, filterCanceled } from "../../Redux/Actions";
import Loading from "../../Pages/Loading/Loading";

const CardsBorrado = ({ turns, type, professionals , id}) => {

 const [loading, setLoading] = useState(true);

 const dispatch = useDispatch();

 useEffect(() => {

    dispatch(getProfessionals());
      dispatch(filterCanceled()).then(() => {
        setLoading(false);
      })
      
    }, [dispatch])
    

const turnStates = turns.filter((turn) => turn.professionalId === id && turn.status === "false");

if(loading){
  return <Loading />
}

return  type === "turns" ? (
  <div className={style.cardsContainer}>
    <div className={style.borderCards}></div>
    {turnStates.length > 0 &&
      turnStates.map((turn) => {
        return (
          <CardBorrado
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
        <CardBorrado
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
  
  export default CardsBorrado;