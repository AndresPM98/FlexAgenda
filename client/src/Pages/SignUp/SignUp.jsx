import { useEffect, useState } from "react";
import { auth, createUser, RegisterEmailUser } from "../../firebase-config";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Swal from "sweetalert2";
import styles from "./Singup.module.css";
import { validate } from "./validate";
// import AuthProvider from "../../Components/AuthProvider/AuthProvider";

function SignUp() {
  const history = useHistory();

  // depende el estado se renderiza algo, no funcionando actualmente
  const [state, setCurrentState] = useState(null);

  //para enviar al post de professionales
  const [form, setForm] = useState({
    firebaseId: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    category: "",
  });

  // ir seteando el form
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
    if (property !== "email") {
      setErrors(
        validate({
          ...form,
          [property]: value,
        })
      );
    }
  };

  const blurvalidation = async (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const allProfessionals = await axios.get("/professional");
    if (property === "email") {
      setErrors(
        validate(
          {
            ...form,
            [property]: value,
          },
          allProfessionals.data
        )
      );
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password || !form.phone) {
      Swal.fire({
        title: "Error",
        text: "debes rellenar los campos requeridos.",
        icon: "error",
      });
      return;
    }
    //registramos el usuario
    if (!errors.name && !errors.email && !errors.password && !errors.contact) {
      const { user } = await RegisterEmailUser(auth, form);
      // guardamos en db de firestore
      await createUser(user.uid, form);
      //guardamos en nuestra db
      if (user) {
        const prof = await axios.post("/professional", {
          ...form,
          firebaseId: user.uid,
        });
        // pop up que todo salio OK
        await Swal.fire({
          title: "Registro exitoso",
          icon: "success",
          text: "El usuario ha sido registrado correctamente.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          // redirigir cuando acepta popup
          history.push(`/Calendarpage/${prof.data.id}`);
        });
      }
    } else {
      await Swal.fire({
        title: "ha ocurrido un error",
        icon: "error",
        text: "Debes validar todos los campos.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <NavbarTwo />
      <div className={styles.container3}>
        <div className={styles.img3}></div>
        <form onSubmit={handleRegister} className={styles.form3}>
          <h1 className={styles.tittle3}>CREACION DE CUENTA</h1>
          <label className={styles.name}>NOMBRE*</label>
          <input
            className={styles.name_input}
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            value={form.name}
          />
          {errors.name && <p className={styles.name_error}>{errors.name}</p>}

          <label className={styles.email}>EMAIL*</label>
          <input
            className={styles.email_input}
            onChange={handleChange}
            onBlur={blurvalidation}
            type="text"
            name="email"
            value={form.email}
          />
          {errors.email && <p className={styles.error_email}>{errors.email}</p>}
          <label className={styles.password}>CONTRASEÑA*</label>
          <input
            className={styles.password_input}
            type="password"
            onChange={handleChange}
            name="password"
            value={form.password}
          />
          {errors.password && (
            <p className={styles.error_password}>{errors.password}</p>
          )}
          <label className={styles.contact}>CONTACTO*</label>
          <input
            className={styles.contact_input}
            type="text"
            onChange={handleChange}
            name="phone"
            value={form.phone}
            placeholder="Ej: 3511234567"
          />
          {errors.phone && (
            <p className={styles.contact_error}>{errors.phone}</p>
          )}

          <label className={styles.address}>DIRECCIÓN:</label>
          <input
            className={styles.address_input}
            type="text"
            onChange={handleChange}
            name="address"
          />

          <label className={styles.description}>DESCRIPCION/PROFESION:</label>
          <input
            className={styles.description_input}
            type="text"
            onChange={handleChange}
            name="description"
            value={form.description}
          />
          <label className={styles.area}>ÁREA:</label>
          <input
            className={styles.area_input}
            type="text"
            onChange={handleChange}
            name="category"
            value={form.category}
          />

          <button className={styles.login} type="submit">
            REGISTRARSE
          </button>
          <div className={styles.register}>
            <div className={styles.register_items}>
              <p className={styles.text}>Ya te has regstrado?</p>
              <a href={`/login`} className={styles.signUp}>
                Iniciar Sesion
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;

// const handleSignInWithGoogle = async () => {
//   const googleProvider = new GoogleAuthProvider();
//   // HAY QUE REVISAR EL REGISTRO CON GOOGLE

//   const signInWithGoogle = async (googleProvider) => {
//     try {
//       const res = await signInWithPopup(auth, googleProvider);
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   await signInWithGoogle(googleProvider);
// };

// const handleUserLoggedIn = (id) => {
//   console.log("esto se esta ejecutando");
//   history.push(`/Calendarpage/${id}`);
// };
// const handleUserNotLoggedIn = () => {
//   setCurrentState(2);
// };
// const handleUserNotRegistered = () => {};

// return (
//   <>
//     <NavbarTwo />
//     {/* implementar un mejor loading */}
//     <AuthProvider
//       onUserLoggedIn={handleUserLoggedIn}
//       onUserNotLoggedIn={handleUserNotLoggedIn}
//       onUserNotRegistered={handleUserNotRegistered}
//     >
//       <div>loading...</div>
//     </AuthProvider>
//   </>
// );
