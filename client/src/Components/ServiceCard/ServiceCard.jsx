import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, deleteServices } from "../../Redux/Actions";
import { useParams } from "react-router-dom";
import  Style  from "./ServiceCard.module.css";

const ServiceCard = () => {
  const { id } = useParams();
  const serv = useSelector((state) => state.allServices);
  const servicios = serv.filter((servicio) => servicio.ProfessionalId === id);

  const dispatch = useDispatch();

  const handleDeleteService = (id) => {
    dispatch(deleteServices(id));

  };

  return (
    <>
      {servicios.map((service) => {
        return (
          <div className={Style.service} key={service.id}>
            <h2>{service.name}</h2>
            <p>Servicio: {service.description}</p>
            <p>Duración: {service.duration} hs</p>
            <p>Precio: {service.price}</p>
            <button onClick={() => handleDeleteService(service.id)}>
              Eliminar
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ServiceCard;
