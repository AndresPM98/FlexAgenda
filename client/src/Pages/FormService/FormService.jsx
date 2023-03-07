/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import styles from "./FormService.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getClients, getServices, getProfessionals } from "../../Redux/Actions";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const Form = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getProfessionals());
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const allClients = useSelector((state) => state.allClients);
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const serv = useSelector((state) => state.allServices);
  const servProfs = serv.filter((service) => service.ProfessionalId === id);
  console.log(servProfs);

  const findProfessional = allProfessionals.find((prof) => id === prof.id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
    ProfessionalId: id,
    ClientId: "",
    ServiceId: "",
  });

  // useEffect(() => {
  //   if (allClients.length && allProfessionals.length) {
  //     setForm({
  //       ...form,
  //       ProfessionalId: id,
  //     });
  //   }
  // }, [allClients, allProfessionals]);

  function validate(form) {
    let error = {};

    if (!form.date) {
      error.name = "Date is required";
    }

    if (!form.price) {
      error.price = "Price is required";
    }

    if (!form.ServiceId[0]) {
      error.ServiceId = "Service is required";
    }
    return error;
  }

  const changeHandler = (event) => {
  
    const { name, value } = event.target;
    let newValue = value;

    setForm({ ...form, [name]: newValue });
    validate({ ...form, [name]: newValue });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://backend-pf-production-1672.up.railway.app/service/", form);
      await Swal.fire({
        title: "Servicio Agregado",
        icon: "success",
        text: "Se ha agregado un nuevo servicio al perfil.",
        confirmButtonText: "Aceptar",
      });
      history.push(`/professionalDetail/${findProfessional.id}`);
    } catch (error) {
      await Swal.fire({
        title: "Error",
        icon: "error",
        text: "Tienes que completar todos los campos.",
        confirmButtonText: "Aceptar",
      });;
    }
  };

  return (
    <div>
       <div className={styles.backContainer}>
        <NavLink className={styles.back} to={`/professionalDetail/${id}`}>
          <iconify-icon
            icon="ion:arrow-back-circle"
            width="40"
            height="30"
          ></iconify-icon>
          CANCEL
        </NavLink>
      </div>
      <NavbarTwo />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.label}>
            <h1>{findProfessional.name}</h1>
          </div>
          <form onSubmit={submitHandler} className={styles.form}>
            <h1 className={styles.tittle}>AGREGA UN SERVICIO</h1>

            <label className={styles.label}>NOMBRE DEL SERVICIO:</label>
            <input
              className={styles.input}
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
            />
            <div className={styles.error}>
              {error.name && <span>{error.name}</span>}{" "}
            </div>

            <label className={styles.label}>PRECIO:</label>
            <input
              className={styles.input}
              type="number"
              value={form.price}
              onChange={changeHandler}
              name="price"
            />
            <div className={styles.error}>
              {error.price && <span>{error.price}</span>}{" "}
            </div>

            <label className={styles.label}>DESCRIPCION:</label>
            <input
              className={styles.input}
              type="text"
              value={form.description}
              onChange={changeHandler}
              placeholder="¿Quieres agregar una descripcion?"
              name="description"
            />
            <div className={styles.error}>
              {error.description && <span>{error.description}</span>}{" "}
            </div>

            <label className={styles.label}>DURACION (en horas):</label>
            <input
              className={styles.input}
              type="number"
              value={form.duration}
              onChange={changeHandler}
              placeholder="¿Quieres agregar una duracion aproximada en horas?"
              name="duration"
              // min="0"
              // step="00.10"
            />
            <div className={styles.error}>
              {error.price && <span>{error.price}</span>}{" "}
            </div>

            <button className={styles.button} type="submit">
              AGREGAR SERVICIO
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
