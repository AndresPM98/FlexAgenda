import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail } from "../../Redux/Actions";
import Loading from "../Loading/Loading";
import style from "./ProfessionalTakeTurn.module.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ProfessionalPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loginWithPopup, isAuthenticated, user, logout } = useAuth0();
  const professional = useSelector((state) => state.profDetail);
  const darkMode = useSelector((state) => state.darkMode);
  const [loading, setLoading] = useState(true);
  const [userRegistered, setUserRegistered] = useState(false);

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
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavbarTwo/>

      <div
        className={darkMode === false ? style.container : style.containerDark}
      >
        <p> Professional Page</p>
        <div className={style.detailContainer}>
          <img
            style={{ borderRadius: "50%", width: "200px", height: "200px" }}
            src={
              professional?.image
                ? professional.image
                : "https://i.stack.https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg.com/4powQ.gif"
            }
            alt=""
          />
          <h1 className={style.name}>{professional?.name}</h1>
          <h2 className={style.category}>{professional?.category}</h2>
          <h4 className={style.phone}>{professional?.phone}</h4>
          <h4 className={style.adress}>{professional?.address}</h4>
          <a href={professional.addresslocation} target="_blank">
            <h4 className={style.adress}>Google Maps</h4>
          </a>
          <h4 className={style.adress}>{professional?.email}</h4>
          <p className={style.description}>{professional?.description}</p>
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
          <button className={style.btnTurn}>Registrarse</button>
        </Link>
        <Link to={`/form/${id}`}>
          <button className={style.btnTurn}>Sacar turno</button>
        </Link>
      </div>
    </>
  );
};

export default ProfessionalPage;
