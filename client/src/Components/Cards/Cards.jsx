import React, { useEffect } from "react";
import { getTurns} from "../../Redux/Actions"
import { useDispatch, useSelector} from "react-redux"; 
import Card from "../Card/Card";
import './Cards.css'

const Cards = ({turns}) => {
        
    return (
        <div className="cardsContainer">
            {turns.map((turn) => {
                
            return (
            <Card
                id={turn.id}
                key={turn.id}
                name={turn.client.name}  
                date={turn.date}
                hour={turn.hour}
            />
            );
            })}
        </div> 
    )
  }
  
  export default Cards