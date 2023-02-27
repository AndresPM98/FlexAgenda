import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  auth,
  createUser,
  RegisterEmailUser,
  userExists,
} from "../../firebase-config";

import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthProvider from "../../Components/AuthProvider/AuthProvider";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Swal from "sweetalert2";
import { async } from "@firebase/util";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionals } from "../../Redux/Actions";
function SignUp() {
  const history = useHistory();
  const [state, setCurrentState] = useState(null);
  const dispatch = useDispatch();
  const professionals = useSelector((state) => state.allProfessionals);
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

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     // el usuario se registro
  //     if (user) {
  //       //
  //       const register = await userExists(user.uid);
  //       console.log("estoy aca culiao", register);
  //       const prof = await axios.get("/professional");
  //       console.log("ando x aca", prof);
  //       console.log(prof.data);
  //       console.log(register.email);
  //       const findProf = prof.data.filter(
  //         (prof) => prof.email === register.email
  //       );
  //       console.log(findProf);
  //       if (register) {
  //         console.log("usuario registrado y logueado");
  //       } else {
  //         console.log("el usuario esta logueado pero no registrado");
  //       }
  //     } else {
  //       console.log("el usuraio no esta logueado y no esta registrado");
  //       // console.log("no hay nadie autenticado");
  //     }
  //   });
  // }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

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

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      //registramos el usuario
      const { user } = await RegisterEmailUser(auth, form);
      // guardamos en db de firestore
      await createUser(user.uid, form);
      //guardamos en db nuestra
      if (user) {
        const prof = await axios.post("/professional", {
          ...form,
          firebaseId: user.uid,
        });
        await Swal.fire({
          title: "Registro exitoso",
          icon: "success",
          text: "El usuario ha sido registrado correctamente.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          history.push(`/Calendarpage/${prof.data.id}`);
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <NavbarTwo />
      <div>
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>

          <label>Name:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="name"
            value={form.name}
          />

          <br />

          <label>Email:</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="email"
            value={form.email}
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => handleChange(e)}
            name="password"
            value={form.password}
          />

          <label>Phone:</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            name="phone"
            value={form.phone}
            placeholder="Ej: 3511234567"
          />

          <label>Adress:</label>
          <input type="text" onChange={(e) => handleChange(e)} name="address" />

          <label>Description:</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            name="description"
            value={form.description}
          />

          <label>Category:</label>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            name="category"
            value={form.category}
          />

          <button type="submit">Register</button>
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
}

export default SignUp;
