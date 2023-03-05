import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Navbar(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Actualizar el estado de la sesión
      setCurrentUser(null);
    } catch (error) {
      // Manejar el error
      console.error(error);
    }
  };
  return (
    <div className="navbarContainer">
      <div className="logo">
        <h1><span class="icono">FLEX</span>AGENDA</h1>
      </div>
      <div className="buttons">
        <NavLink to="/allProfessionals" className="allProfessionals">
          All Professionals
        </NavLink>

        {currentUser ? (
          <button onClick={handleLogout} className="allProfessionals">
            CERRAR SESION
          </button>
        ) : (
          <>
            <NavLink to="/SignUp" className="login">
              SIGN UP
            </NavLink>
            <NavLink to="/Login" className="signUp">
              LOGIN
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
