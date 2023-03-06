import style from "./NavbarTwo.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import {Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";



export default function NavbarTwo(props){

    const darkMode = useSelector((state) => state.darkMode)
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    

    const handleLogout = async () => {
        try {
          await signOut(auth);
          
          setCurrentUser(null)
          await Swal.fire({
            icon: "success",
            title: "Sesion cerrada",
            showConfirmButton: false,
            timer: 1500,
          });
          history.push("/")
        } catch (error) {
          // Manejar el error
          console.error(error);
        }
      };

 

    return(
        <div className={!darkMode? style.navbarContainer : style.navbarContainerDark}>
            <div className={style.logoTwo}>
                <h1><span class="icono">FLEX</span>AGENDA</h1>
            </div>
           
{location.pathname === '/Login' || location.pathname === '/SignUp'|| location.pathname === "/allProfessionals"||location.pathname ==="/paymentApproved"||location.pathname === `/profTT/${id}` ? null :
                <button style={{ height:"40px", marginTop:"20px", cursor:"pointer"}}onClick={handleLogout} className="allProfessionals">
            CERRAR SESION
          </button>
          }
        </div>
    ) 
}