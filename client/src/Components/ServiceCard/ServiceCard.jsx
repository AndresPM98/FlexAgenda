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
              <h2>{service.name}</h2>
              <p>Servicio: {service.description}</p>
              <p>Duración: {service.duration}  hs</p>
              <p>Precio: {service.price}</p>
            </div>
          );
        })}
      </>
    );
  };
  
  export default ServiceCard;
