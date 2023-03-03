import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, deleteServices } from "../../Redux/Actions";
import { useParams, useLocation } from "react-router-dom";
import  Style  from "./ServiceCard.module.css";
import Swal from "sweetalert2";

const ServiceCard = () => {
  const { id } = useParams();
  const serv = useSelector((state) => state.allServices);
  const servicios = serv.filter((servicio) => servicio.ProfessionalId === id);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleDeleteService = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro de que deseas borrar este servicio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });
    if (isConfirmed) {
    dispatch(deleteServices(id));
    await Swal.fire({
      title: "Servicio eliminado",
      icon: "success",
      text: "Se ha eliminado el servicio.",
      confirmButtonText: "Aceptar",
    });
  };
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
            {location.pathname === `/professionalDetail/${id}` && (
              <button className={Style.btnborrar} onClick={() => handleDeleteService(service.id)}>
                Eliminar
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ServiceCard;
