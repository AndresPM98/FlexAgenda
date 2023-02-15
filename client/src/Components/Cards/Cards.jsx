import React, { useEffect } from "react";
import { getClients} from "../../Redux/Actions"
import { useDispatch, useSelector} from "react-redux"; 
import Card from "../Card/Card";
import './Cards.css'

const Cards = () => {

    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients);

    useEffect(() => {
        dispatch(getClients());
        }, [dispatch]);

    return (
        <div className="cardsContainer">
            {clients.map((client) => {
            return (
            <Card
                id={client.id}
                key={client.id}
                name={client.name}
                email={client.email}
                dni={client.dni}
            />
            );
            })}
        </div> 
    )
  }
  
  export default Cards