/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getClients, getServices, getProfessionals } from "../../Redux/Actions";
import { useHistory, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { onAuthStateChanged } from "firebase/auth";
import { auth, userExists } from "../../firebase-config";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState({});

  const [currentUser, setCurrentUser] = useState(null);
  const [userDb, setUserDb] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user.displayName) setCurrentUser(user.displayName);
      const newUser = await userExists(user.uid);

      setUserDb(newUser.name);
    });
  }, []);
  console.log(currentUser);
  console.log(userDb);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getProfessionals());
    dispatch(getServices());
  }, [dispatch]);

  const allClients = useSelector((state) => state.allClients);
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const serv = useSelector((state) => state.allServices);

  const servProfs = serv.filter((service) => service.ProfessionalId === id);

  const clienteLog = allClients.find(clien => clien.name === currentUser || userDb)
  console.log(clienteLog);
  const findProfesional = allProfessionals.find((prof) => id === prof.id);

  const [form, setForm] = useState({
    date: "",
    hour: "",
    ProfessionalId: "",
    ClientId: "",
    ServiceId: "",
  });

  useEffect(() => {
    if ((currentUser || userDb) && allProfessionals.length) {
      setForm({
        ...form,
        ClientId: clienteLog.id,
        ProfessionalId: findProfesional.id,
      });
    }
  }, [allClients, allProfessionals]);

  function validate(form) {
    let error = {};

    if (!form.date) {
      error.date = "Date is required";
    }

    if (!form.hour) {
      error.hour = "Hour is required";
    }

    if (!form.ServiceId[0]) {
      error.ServiceId = "Service is required";
    }
    return error;
  }

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    const selectedDate = new Date(event.target.value);
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 5) {
      setError((prevErrors) => ({
        ...prevErrors,
        date: "No hay turnos para este día",
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        date: "",
      }));
      setForm((prevForm) => ({
        ...prevForm,
        date: event.target.value,
      }));
    }

    setForm({ ...form, [property]: value });
    validate({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const servElegido = serv.filter((ser) => ser.id == form.ServiceId);
    const send = {
      ...form,
      quantity: 1,
      price: servElegido[0].price,
      title: servElegido[0].name,
      turnId: `${servElegido[0].id}${servElegido[0].price}${form.ClientId}${form.ProfessionalId}${form.date}${form.hour}`,
    };

    const cookies = new Cookies();
    cookies.set("turnToPost", form, { path: "/" });
    cookies.set("idProfessional", id, { path: "/" });
    cookies.set("findProfessional", findProfesional, { path: "/" });

    axios
      .post("https://backend-pf-production-1672.up.railway.app/payment", send)
      .then((res) => {
        localStorage.removeItem("form");
        window.location.href = res.data.response.body.init_point;
      })
      .catch((error) => console.log(error));
  };

  function handleSelectServ(event) {
    const selected = event.target.value;
    if (
      event.target.value !== "ServiceId" &&
      !form.ServiceId.includes(event.target.value)
    )
      setForm({
        ...form,
        ServiceId: selected,
      });
    setError(
      validate({
        ...form,
        ServiceId: selected,
      })
    );
  }

  useEffect(() => {
    const storedForm = JSON.parse(localStorage.getItem("form"));
    if (storedForm) {
      setForm(storedForm);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(form));
  }, [form]);

  return (
    <div>
      <NavbarTwo />

      <div className={styles.container}>
        <form onSubmit={submitHandler} className={styles.form}>
          <h1 className={styles.tittle}>AGENDÁ TU TURNO</h1>

          <label className={styles.label}>FECHA:</label>
          <br />
          <input
            className={styles.input}
            type="date"
            value={form.date}
            onChange={changeHandler}
            name="date"
          />
          <div className={styles.error}>
            {error.date && <span>{error.date}</span>}{" "}
          </div>

          <label className={styles.label}>HORA:</label>
          <br />
          <input
            className={styles.input}
            type="time"
            value={form.hour}
            onChange={changeHandler}
            name="hour"
            step="1800"
            min="00:00"
            max="23:30"
          />

          <div className={styles.error}>
            {error.hour && <span>{error.hour}</span>}{" "}
          </div>

          <label className={styles.label}>
            PROFESIONAL:
            {findProfesional && (
              <h2 className={styles.nombres}>{findProfesional.name}</h2>
            )}
          </label>
          <label className={styles.label}>
            CLIENTE:
            <h2 className={styles.nombres}>{clienteLog.name}</h2>
          </label>

          <label className={styles.label}>SERVICIO:</label>
          <select
            name="ServiceId"
            onChange={handleSelectServ}
            className={styles.input}
          >
            <option value="ServiceId" className={styles.input}>
              Servicio
            </option>
            {servProfs?.map((element, index) => (
              <option key={index} value={element.id} className={styles.input}>
                {element.name}
              </option>
            ))}
            <div className={styles.error}>
              {error.ServiceId && <span>{error.ServiceId}</span>}
            </div>
          </select>
          <button className={styles.button} type="submit">
            CONFIRMAR TURNO
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
