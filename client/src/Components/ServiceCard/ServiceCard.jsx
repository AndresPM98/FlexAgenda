import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import  Style  from "./ServiceCard.module.css";

const ServiceCard = () => {

    const { id } = useParams();
    const serv = useSelector((state) => state.allServices);
    const servicios = serv.filter((servicio) => servicio.ProfessionalId === id); 
  
    return (
      <>
        {servicios.map((service) => {
          return (
            <div className={Style.service}>
              <h1>Servicios</h1>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>{service.duration}</p>
              <p>{service.price}</p>
            </div>
          );
        })}
      </>
    );
  };
  
  export default ServiceCard;
