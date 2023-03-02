import { useEffect, useState } from "react";
import { auth, createUser, RegisterEmailUser } from "../../firebase-config";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Swal from "sweetalert2";
import styles from "./Singup.module.css";
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

  // ir seteando el form
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      //registramos el usuario
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
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "El correo electrónico ingresado ya está en uso.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <NavbarTwo />
      <div className={styles.container}>
        <form onSubmit={handleRegister} className={styles.form}>
          <h1 className={styles.tittle}>CREACION DE CUENTA</h1>
          <label className={styles.label}>NOMBRE:</label>
          <br />
          <input
            className={styles.input}
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            value={form.name}
          />

          <br />

          <label className={styles.label}>EMAIL:</label>
          <br />
          <input
            className={styles.input}
            onChange={(e) => handleChange(e)}
            type="text"
            name="email"
            value={form.email}
          />

          <label className={styles.label}>CONTRASEÑA:</label>
          <br />
          <input
            className={styles.input}
            type="password"
            onChange={(e) => handleChange(e)}
            name="password"
            value={form.password}
          />

          <label className={styles.label}>CONTACTO:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="phone"
            value={form.phone}
            placeholder="Ej: 3511234567"
          />

          <label className={styles.label}>DIRECCIÓN:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="address"
          />

          <label className={styles.label}>DESCRIPCION/PROFESION:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="description"
            value={form.description}
          />

          <label className={styles.label}>ÁREA:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            onChange={(e) => handleChange(e)}
            name="category"
            value={form.category}
          />

          <button className={styles.button} type="submit">
            REGISTRARSE
          </button>
        </form>

        {/* <div>
            <button onClick={handleSignInWithGoogle}>
              Sign in with Google
            </button>
          </div> */}
      </div>
      <br />
      <br />
      <br />
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
