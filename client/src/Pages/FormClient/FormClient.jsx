import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Footer from "../../Components/Footer/Footer";
import styles from "./FormClient.module.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const FormClient = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const history = useHistory();

  const [form, setForm] = useState({
    name: "",
    email: "",
    dni: "",
  });

  const [error, setErrors] = useState({
    name: "",
    email: "",
    dni: "",
  });

  const validate = (form) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      setErrors({ ...error, email: "" });
    } else {
      setErrors({ ...error, email: "Hay un error en email" });
    }

    if (form.email === "") setErrors({ ...error, email: "email " });
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    validate({ ...form, [property]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("https://backend-pf-production-1672.up.railway.app/client", form)
      .then((res) => {
        alert("Created correctly");
        history.push(`/form`);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <NavbarTwo />
      <div className={darkMode == false ? styles.container : styles.containerDark}>
        

        <form onSubmit={submitHandler} className={styles.form}>
        <h1 className={styles.tittle}>Formulario del cliente</h1> 


              <label className={styles.label}>NAME:</label>
                <input
                  className={styles.input}
                  type="text"
                  required
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                />

              <label className={styles.label}>EMAIL:</label>
                <input
                  className={styles.input}
                  type="text"
                  required
                  value={form.email}
                  onChange={changeHandler}
                  name="email"
                />
                {error.email && <span>{error.email}</span>}

                <label className={styles.label}>DNI:</label>
                <input
                  className={styles.input}
                  type="text"
                  required
                  value={form.dni}
                  onChange={changeHandler}
                  name="dni"
                />

              <button type="submit" className={styles.button}>
                REGISTRARSE
              </button>

            
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FormClient;