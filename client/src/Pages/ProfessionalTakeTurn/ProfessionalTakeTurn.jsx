import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail, getServices } from "../../Redux/Actions";
import Loading from "../Loading/Loading";
import style from "./ProfessionalTakeTurn.module.css";
import { useState } from "react";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import { Link } from "react-router-dom";
import DisplayReview from "../../Components/DisplayReview/DisplayReview";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";

const ProfessionalPage = () => {
  const { id } = useParams();
  const professional = useSelector((state) => state.profDetail);
  const darkMode = useSelector((state) => state.darkMode);
  const [loading, setLoading] = useState(true);
  // const serv = useSelector((state) => state.allServices);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfessionalDetail(id)).then(() => setLoading(false));
    dispatch(getServices());
  }, [dispatch, id]);

  const reviews = () => {
    Swal.fire({
     
      title: "Reviews ⭐️",
      showConfirmButton: false,
      html: ReactDOMServer.renderToString(<DisplayReview review={professional.review} />)
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavbarTwo />
      <div
        className={darkMode === false ? style.container : style.containerDark}
      >
        <div className={style.detailContainer}>
          <div className={style.info}>
            <img
              style={{
                borderRadius: "50%",
                width: "200px",
                height: "200px",
                float: "left",
                marginRight: "10px",
              }}
              src={
                professional?.image
                  ? professional.image
                  : "https://i.stack.imgur.com/4powQ.gif"
              }
              alt=""
            />
            <h1 className={style.name}>Profesional: {professional?.name}</h1>
            <h2 className={style.category}>Area: {professional?.category}</h2>
            <h2 className={style.phone}>Contacto: {professional?.phone}</h2>
            <h2 className={style.adress}>Dirección: {professional?.address}</h2>
            <a href={professional.addresslocation} target="_blank">
              <h2 className={style.adress}>Google Maps</h2>
            </a>
            <h2 className={style.adress}>Email: {professional?.email}</h2>

            <h1 className={style.description}>
              Profesion: {professional?.description}
            </h1>
          </div>
          <h1>Servicios:</h1>
          <div className={style.card}>
            <ServiceCard />
          </div>

          {currentUser ? (
           <div>
           <Link to={`/form/${id}`}>
             <button className={style.btnEditar}>Sacar turno</button>
           </Link>
           <button onClick={reviews} className={style.btnEditar}>Reviews</button>
         </div>
            
          ) : (
            <>
              <Link to={`/formClient/${id}`}>
                <button className={style.btnEditar}>Registrarse</button>
              </Link>
              <Link to={`/loginClient/${id}`}>
                <button className={style.btnEditar}>Loguearse</button>
              </Link>
            </>
          )}
        </div>
        <div>
          {/* {professional?.review && (
            <DisplayReview review={professional.review} />
          )} */}
        </div>
      </div>
    </>
  );
};

export default ProfessionalPage;
