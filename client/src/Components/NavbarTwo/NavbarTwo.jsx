import style from "./NavbarTwo.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import {Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";



export default function NavbarTwo(props){

    const darkMode = useSelector((state) => state.darkMode)
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();
    const location = useLocation();
    

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
            <div className={style.logoTwo} style={{textDecoration:"none", color: "white"}}>
                <Link to= "/">
                <iconify-icon icon="fluent-mdl2:calendar-agenda" width="25"></iconify-icon>
                <iconify-icon icon="fluent-mdl2:gripper-bar-vertical" width="40" height="30"></iconify-icon>
                </Link>
                <h1>FLEXAGENDA</h1>
            </div>
           
{location.pathname === '/Login' || location.pathname === '/SignUp'|| location.pathname === "/allProfessionals"||location.pathname ==="/paymentApproved" ? null :
                <button style={{ height:"40px", marginTop:"20px", cursor:"pointer"}}onClick={handleLogout} className="allProfessionals">
            CERRAR SESION
          </button>
          }
        </div>
    ) 
}