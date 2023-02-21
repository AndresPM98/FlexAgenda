import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import styles from "./FormService.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getClients, getServices, getProfessionals } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true)


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

  console.log(serv);

  const ultimoCliente = allClients.length
    ? allClients[allClients.length - 1]
    : "";
  const ultimoProfesional = allProfessionals.length
    ? allProfessionals[allProfessionals.length - 1]
    : "";

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    duration: "",
    ProfessionalId: "",
    ClientId: "",
    ServiceId: "",
  });

  useEffect(() => {
    if (allClients.length && allProfessionals.length) {
      setForm({
        ...form,
        ClientId: ultimoCliente.id,
        ProfessionalId: ultimoProfesional.id,
      });
    }
  }, [allClients, allProfessionals, ultimoCliente.id, ultimoProfesional.id, form]);

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
    // const property = event.target.name;
    // const value = event.target.value;
    // setForm({ ...form, [property]: value });
    const { name, value } = event.target;
    let newValue = value;

    // if (name === "duration") {
    //     const minutes = parseFloat(value) * 60;
    //     let step, updatedValue;
    //     if (minutes >= 60) {
    //       const hours = Math.floor(minutes / 60);
    //       const remainder = minutes % 60;
    //       const formattedRemainder = remainder.toFixed(0).padStart(2, "0");
    //       updatedValue = `${hours.toString()}.${formattedRemainder}`;
    //       step = 60;
    //     } else {
    //       const formattedValue = minutes.toFixed(0).padStart(2, "0");
    //       updatedValue = `0.${formattedValue}`;
    //       step = 10;
    //     }
    //     event.target.step = step;
    //     newValue = updatedValue;
    //   }
    setForm({ ...form, [name]: newValue });
    validate({ ...form, [name]: newValue });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("https://backend-pf-production-1672.up.railway.app/service/", form)
      .then((res) => {
        alert("Turn taken correctly");
        history.push(`/professionalDetail/${ultimoProfesional.id}`);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <NavbarTwo />
{loading ? <Loading/> : 
      <div className={styles.container}>
        <div className={styles.label}>
          SOY:
          <h2>{ultimoProfesional.name}</h2>
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

          <label className={styles.label}>DURACION:</label>
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
      }
    </div>
  );
};

export default Form;
