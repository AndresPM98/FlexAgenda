import React, { useState } from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Styles from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    image: "",
    category: "",
  });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    const value = event.target.value;
    const property = event.target.name;
    setForm({ ...form, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/professional", form)
      .then(() => alert("professional created successfully"))
      .catch((err) => alert(err));
  };
  return (
    <>
      <NavbarTwo />
      <div className={Styles.container}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h1 className={Styles.tittle}>Create Account</h1>

          <label className={Styles.label}>Name:</label>
          <input
            onChange={handleChange}
            className={Styles.input}
            type="text"
            name="name"
          />

          <label className={Styles.label}>Email:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={handleChange}
            name="email"
          />

          <label className={Styles.label}>Password:</label>
          <input
            className={Styles.input}
            type="password"
            onChange={handleChange}
            name="password"
          />

          <label className={Styles.label}>Phone:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={handleChange}
            name="phone"
          />

          <label className={Styles.label}>Adress:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={handleChange}
            name="address"
          />

          <label className={Styles.label}>Description:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={handleChange}
            name="description"
          />

          <label className={Styles.label}>Image:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={handleChange}
            name="image"
          />

          <label className={Styles.label}>Category:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={handleChange}
            name="category"
          />

          <button className={Styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;

// {
//     "name": "andrez",
//     "email": "andrez@mail.com",
//     "password": "54353",
//     "phone": "31231231",
//     "address": "Salta",
//     "description": "medico",
//     "image": "",
//     "category": "medicina"
// }
