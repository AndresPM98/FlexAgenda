import React, { useState } from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Styles from "./Login.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState({});
  const [disEna, setDisEna] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState({ email: "", isChanged: false });
  const history = useHistory();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError(validations({ ...form, [event.target.name]: event.target.value }));
    handleDisable(
      validations({ ...form, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/professional", form)
      .then((res) => {
        alert("Creado correctamente");
        history.push(`/home/${res.data.id}`);
      })
      .catch((err) => alert("Algo salió mal!"));
  };

  const handleEmailChange = (e) => {
    setForm({ ...form, email: e.target.value });
    setErrorEmail({ ...errorEmail, email: "" });

    // Espera 1 segundo antes de llamar a la API de validación
    setTimeout(() => {
      const validateEmail = async () => {
        try {
          const res = await axios.get(`/professional?email=${form.email}`);
          if (res.data.length > 0) {
            setError({ ...errorEmail, email: "Este email ya está registrado" });
          } else if (
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
          ) {
            setError({ ...errorEmail, email: "No es un email válido" });
          } else {
            setEmail({ ...email, email: "" });
          }
        } catch (error) {
          console.log(error);
          setErrorEmail({
            ...error,
            email: "Ocurrió un error al verificar el correo electrónico",
          });
        }
      };

      validateEmail();
    }, 1000);
  };

  const validations = (validation) => {
    let validError = {};
    if (!validation.name) {
      validError.name = "Introduce tu nombre";
    } else {
      if (/[0-9]/.test(validation.name)) {
        validError.name = "Solo letras por favor";
      } else {
        validError.name = "✅";
      }
    }

    // validacion de correo electrónico
    if (!validation.email) {
      validError.email = "Pon un email";
    } else {
      if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(validation.email)
      ) {
        validError.email = "✅";
      } else {
        validError.email = "No es un email valido";
      }

      if (!validation.password) {
        validError.password = "Pon una contraseña";
      } else {
        if (validation.password.length < 8) {
          validError.password =
            "La contraseña debe tener al menos 8 caracteres";
        } else {
          validError.password = "✅";
        }
      }

      if (!validation.phone) {
        validError.phone = "Pon un numero de telefono";
      } else {
        if (
          /^((\()?0?(11|\d{2})\)?\s?)?(\d{4}(-|\s)?\d{4})$/.test(
            validation.phone
          )
        ) {
          validError.phone = "✅";
        } else {
          validError.phone = "No es un numero valido";
        }
      }
    }
    if (!validation.address) {
      validError.address = "Pon una direccion";
    } else {
      validError.address = "✅";
    }
    if (!validation.description) {
      validError.description = "Pon una descripcion";
    } else {
      validError.description = "✅";
    }
    if (!validation.category) validError.category = "Pon una categoria";
    else {
      validError.category = "✅";
    }
    setError(validError);
    handleDisable(validError);
  };

  const handleDisable = (error) => {
    if (
      error?.name === undefined &&
      error?.address === undefined &&
      error?.description === undefined &&
      error?.category === undefined &&
      error?.phone === undefined &&
      error?.password === undefined &&
      error?.email === undefined
    ) {
      setDisEna(true);
    } else {
      setDisEna(false);
    }
  };

  return (
    <>
      <NavbarTwo />
      <div className={Styles.container}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h1 className={Styles.tittle}>Create Account</h1>

          <label className={Styles.label}>Name:</label>
          <input
            onChange={(e) => handleChange(e)}
            className={Styles.input}
            type="text"
            name="name"
            value={form.name}
          />
          <p>{error.name}</p>
          <br />

          <label className={Styles.label}>Email:</label>
          <input
            onChange={(e) => handleEmailChange(e)}
            className={Styles.input}
            type="text"
            name="email"
            value={form.email}
          />
          <p>{error.email}</p>

          <label className={Styles.label}>Password:</label>
          <input
            className={Styles.input}
            type="password"
            onChange={(e) => handleChange(e)}
            name="password"
            value={form.password}
          />
          <p>{error.password}</p>
          <label className={Styles.label}>Phone:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="phone"
            value={form.phone}
            placeholder="Ej: 3511234567"
          />
          <p>{error.phone}</p>

          <label className={Styles.label}>Adress:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="address"
          />
          <p>{error.address}</p>
          <label className={Styles.label}>Description:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="description"
            value={form.description}
          />
          <p>{error.description}</p>

          <label className={Styles.label}>Category:</label>
          <input
            className={Styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="category"
            value={form.category}
          />
          <p>{error.category}</p>

          <button className={Styles.button} type="submit">
            Login
          </button>
        </form>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Login;
