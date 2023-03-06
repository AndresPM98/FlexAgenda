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
    const allProfessionals = useSelector((state) => state.allProfessionals);
    const {id} = useParams();
    

    const professional = allProfessionals.find(e => e.id === id);
    const imagen = professional?.image;
    console.log("IMAGEN", imagen);

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

{location.pathname === `/Calendarpage/${id}` || location.pathname === '/Login' || location.pathname === '/SignUp'|| location.pathname === "/allProfessionals"||location.pathname ==="/paymentApproved"||location.pathname === `/profTT/${id}`||location.pathname === `/loginClient/${id}` ? null : (
          <div>

            <Link
              to={`/Calendarpage/${id}`}
              style={{textDecoration:"none", color:"white", marginTop:"20px", display:"flex"}}
              >
              <div className={style.calendarIcon}>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="60"
                  viewBox="0 0 8 8"
                  style={{marginLeft: "0px"}}       
                  >
                  <path
                    fill="currentColor"
                    d="M0 0v2h7V0H0zm0 3v4.91c0 .05.04.09.09.09H6.9c.05 0 .09-.04.09-.09V3h-7zm1 1h1v1H1V4zm2 0h1v1H3V4zm2 0h1v1H5V4zM1 6h1v1H1V6zm2 0h1v1H3V6z"
                    />
                </svg>
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
          {location.pathname === '/Login' || location.pathname === '/SignUp'|| location.pathname === "/allProfessionals"||location.pathname ==="/paymentApproved"||location.pathname === `/profTT/${id}`||location.pathname === `/loginClient/${id}` ? null :
                          <button style={{ height:"40px", marginTop:"30px", cursor:"pointer", marginLeft:"-30px" }}onClick={handleLogout} className="allProfessionals">
                      CERRAR SESION
                    </button>
                    }
        </div>
    ) 
  }