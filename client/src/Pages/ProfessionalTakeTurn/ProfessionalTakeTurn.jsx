import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail, getServices } from "../../Redux/Actions";
import Loading from "../Loading/Loading";
import style from "./ProfessionalTakeTurn.module.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DisplayReview from "../../Components/DisplayReview/DisplayReview";

const ProfessionalPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loginWithPopup, isAuthenticated, user, logout } = useAuth0();
  const professional = useSelector((state) => state.profDetail);
  const darkMode = useSelector((state) => state.darkMode);
  const [loading, setLoading] = useState(true);
  const [userRegistered, setUserRegistered] = useState(false);
  const serv = useSelector((state) => state.allServices);

  console.log(serv);

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookieName = cookies[i].split("=")[0];
      document.cookie =
        cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    }
  }

  useEffect(() => {
    const userRegisteredInLocalStorage = localStorage.getItem("userRegistered");

    if (user && !userRegistered && !userRegisteredInLocalStorage) {
      axios
        .post("https://backend-pf-production-1672.up.railway.app/client", {
          name: user.name,
          email: user.email,
        })
        .then(() => {
          alert("Created correctly");
          history.push(`/form/${id}`);
          setUserRegistered(true);
          localStorage.setItem("userRegistered", true); // guardamos el estado de userRegistered en localStorage
        })
        .catch((err) => alert(err));
    }
  }, [user, userRegistered]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfessionalDetail(id)).then(() => setLoading(false));
    dispatch(getServices())
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>

      <NavbarTwo/>
      <div className={darkMode === false ? style.container : style.containerDark}>

        
        <div className={style.detailContainer}>
         <div className={style.info}>
        <img style={{borderRadius:"50%",width:"200px", height:"200px", float:"left", marginRight:"10px"}} src={professional?.image ? professional.image: "https://i.stack.imgur.com/4powQ.gif" } alt="" />
        <h1 className={style.name}>Profesional: {professional?.name}</h1>
        <h2 className={style.category}>Area: {professional?.category}</h2>
        <h2 className={style.phone}>Contacto: {professional?.phone}</h2>
        <h2 className={style.adress}>Dirección: {professional?.address}</h2>
        <a href={professional.addresslocation} target="_blank">

          <h2 className={style.adress}>Google Maps</h2>
          </a>
        <h2 className={style.adress}>Email: {professional?.email}</h2>
        
        <h1 className={style.description}>Profesion: {professional?.description}</h1>
         </div>
         <h1>Servicios:</h1>
         <div className={style.card}>
        <ServiceCard/>
          </div>
        
        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              localStorage.setItem("userRegistered", false);
            }}
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => {
              loginWithPopup();
            }}
          >
            REGISTRARSE
          </button>
        )}

        <Link to={`/formClient/${id}`}>
          <button className={style.btnEditar}>Registrarse</button>
        </Link>
        <Link to={`/form/${id}`}>
          <button className={style.btnEditar}>Sacar turno</button>
        </Link>
     </div>
      <div>
      {professional?.review && <DisplayReview review={professional.review} />}
      </div>
     </div>
    </>
  );
};

export default ProfessionalPage;
