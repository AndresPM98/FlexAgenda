import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";

import styles from "./Form.module.css";
import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getClients, getServices } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getClients());
    dispatch(getServices());
  }, []);


  const serv = useSelector((state)=> state.allServices)

  const [form, setForm] = useState({
    date: "",
    hour: "",
    ProfessionalId: "87de3b43-6331-4493-adfa-c73a4b0afaff",
    ClientId: "7e72a047-dc92-4f18-b0b6-f81527aabd08",
    ServiceId: "",
  });

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

    setForm({ ...form, [property]: value });
    validate({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("https://backend-pf-production-1672.up.railway.app/turn", form)
      .then((res) => {
        alert("Turn taken correctly");
        history.push(`/professionalDetail/87de3b43-6331-4493-adfa-c73a4b0afaff`);
      })
      .catch((err) => alert(err));
  };

  function handleSelectServ(event) {
    if (
      event.target.value !== "ServiceId" &&
      !form.ServiceId.includes(event.target.value)
    )
      setForm({
        ...form,
        ServiceId: [...form.ServiceId, event.target.value],
      });
    setError(
      validate({
        ...form,
        ServiceId: [...form.ServiceId, event.target.value],
      })
    );
  }

  return (
    <div>
      <NavbarTwo/>

      <div className={styles.container}>
        

        <form onSubmit={submitHandler} className={styles.form}>
          <h1 className={styles.tittle}>Schedule your turn</h1>

          <label className={styles.label}>DATE:</label>
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

          <label className={styles.label}>HOUR:</label>
          <input
            className={styles.input}
            type="time"
            value={form.hour}
            onChange={changeHandler}
            name="hour"
          />
          <div className={styles.error}>
            {error.hour && <span>{error.hour}</span>}{" "}
          </div>

          <label className={styles.label}>PROFESSIONAL:</label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.ProfessionalId}
                  readOnly
                  onChange={changeHandler}
                  name="ProfessionalId"
                />

              <label className={styles.label}>SERVICE:</label>
              <select
                name="ServiceId"
                onChange={handleSelectServ}
                className={styles.input}
              >
                <option value="ServiceId">Service</option>
                {serv?.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
                <div className={styles.error}>
                  {error.ServiceId && <span>{error.ServiceId}</span>}
                </div>
              </select>

              <label className={styles.label}> CLIENT:</label>
                <input
                  className={styles.input}
                  type="text"
                  value={form.ClientId}
                  readOnly
                  name="ClientId"
                  onChange={changeHandler}
                />

              <button className={styles.button} type="submit">
                TAKE TURN
              </button>
            </form>
        </div>
      
    </div>
  );
};

export default Form;
