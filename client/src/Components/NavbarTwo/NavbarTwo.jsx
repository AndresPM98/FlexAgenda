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
import { Icon } from '@iconify/react';



export default function NavbarTwo(props){

    const darkMode = useSelector((state) => state.darkMode)
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const allProfessionals = useSelector((state) => state.allProfessionals);
    const {id} = useParams();
    

    const professional = allProfessionals.find(e => e.id === id);
    const imagen = professional?.image;


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
           

{/* icono calendario  */}

{location.pathname === `/Calendarpage/${id}` || location.pathname === '/Login' || location.pathname === '/SignUp'|| location.pathname === "/allProfessionals"||location.pathname ==="/paymentApproved"||location.pathname === `/profTT/${id}`||location.pathname === `/loginClient/${id}` ||location.pathname === `/form/${id}`? null : (
          <div>

            <Link
              to={`/Calendarpage/${id}`}
              style={{textDecoration:"none", color:"white", marginTop:"20px", display:"flex"}}
              >
              <div className={style.calendarIcon}>
              <Icon icon="system-uicons:calendar-date" width="60" height="60"/>
              </div>
            </Link>
          </div>) }
              

          {/* icono cliente  */}
          {/* <div>
            <Link
              to={`/profTT/${id}`}
              style={{textDecoration:"none", color:"white", marginTop:"-8px", display:"flex"}}
              >
              <div>
                <p className={style.textProf}>Cliente</p>
                <iconify-icon
                  icon="healthicons:ui-user-profile-negative"
                  width="60"
                  height="60"
                  ></iconify-icon>
              </div>
            </Link>
          </div> */}


          {/* icono perfil */}

          {location.pathname === '/Login' ||location.pathname === `/professionalDetail${id}` ||location.pathname === '/SignUp'|| location.pathname === "/allProfessionals"||location.pathname ==="/paymentApproved"||location.pathname === `/profTT/${id}`||location.pathname === `/loginClient/${id}` ? null :
          <div>
            

            <Link
              to={`/professionalDetail/${id}`}
              style={{textDecoration:"none", color:"white", marginTop:"20px", display:"flex", marginLeft:"120px"}}
              >
              <div>
                
                {/* <iconify-icon
                  icon="healthicons:ui-user-profile-negative"
                  width="60"
                  height="60"
                  border-radius="50%"
                  ></iconify-icon> */}

                  <img className={style.imagenPerfil} src={imagen} alt="" />
              </div>
            </Link>
          </div>
          }
          {location.pathname === '/Login' || location.pathname === `/form/${id}` || location.pathname === '/SignUp'|| location.pathname === "/allProfessionals"||location.pathname ==="/paymentApproved"||location.pathname === `/profTT/${id}`||location.pathname === `/loginClient/${id}` ? null :
                          <button style={{ height:"40px", marginTop:"30px", cursor:"pointer", marginLeft:"-30px" }}onClick={handleLogout} className="allProfessionals">
                      CERRAR SESION
                    </button>
                    }
        </div>
    ) 
  }