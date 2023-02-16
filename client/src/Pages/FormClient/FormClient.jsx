import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Footer from "../../Components/Footer/Footer";
import "./FormClient.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const FormClient = () => {
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
      .then((res) => alert("User create"))
      .catch((err) => alert(err));
  };

  return (
    <div>
      <NavbarTwo />
      <div className="formClientPage">
        <div className="backContainer">
          <NavLink className="back" to="/home">
            <iconify-icon
              icon="ion:arrow-back-circle"
              width="40"
              height="30"
            ></iconify-icon>
            BACK
          </NavLink>
        </div>

        <form onSubmit={submitHandler}>
          <div className="containerForm">
            <div className="cardForm">
              <a className="signupForm">Formulario del cliente</a>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={changeHandler}
                  name="name"
                />
                <span>NOMBRE</span>
              </div>
              <div className="inputBox1">
                <input
                  type="text"
                  required
                  value={form.email}
                  onChange={changeHandler}
                  name="email"
                />
                <span className="user">Email</span>
                {error.email && <span>{error.email}</span>}
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  value={form.dni}
                  onChange={changeHandler}
                  name="dni"
                />
                <span>DNI</span>
              </div>
              <button type="submit" className="enterForm">
                REGISTRARSE
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FormClient;
