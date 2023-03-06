import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail, getServices, getProfessionals } from "../../Redux/Actions";
import Loading from "../Loading/Loading";
import style from "./ProfessionalPage.module.css";
import { useState } from "react";
import DisplayReview from "../../Components/DisplayReview/DisplayReview";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";

const ProfessionalPage = () => {
  const { id } = useParams();
  const professional = useSelector((state) => state.profDetail);
  const darkMode = useSelector((state) => state.darkMode);
  const [loading, setLoading] = useState(true)


  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getProfessionalDetail(id)).then(() => setLoading(false));
    dispatch(getServices())
    dispatch(getProfessionals())

  }, [dispatch, id]);

  const reviews = () => {
    Swal.fire({
     
      title: "Reviews ⭐️",
      showConfirmButton: false,
      html: ReactDOMServer.renderToString(<DisplayReview review={professional.review} />)
    });
  };


 if(loading) return <Loading/>


  
  
  return (
    <>
     
     <NavbarTwo/>
      <div className={darkMode === false ? style.container : style.containerDark}>
        <div className={style.backContainer}>
          <NavLink className={style.back} to={`/home/${id}`}>
            <iconify-icon
              icon="ion:arrow-back-circle"
              width="40"
              height="30"
            ></iconify-icon>
            BACK
          </NavLink>
        </div>

       
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
        <Link to={`/professional/edit/${id}`}>
        <button className={style.btnEditar}>Editar Perfil</button>
        </Link>
        <Link to={`/professional/edit/${id}/services`}>
        <button className={style.btnEditar}>Agregar Servicios</button>
        </Link>
        <button onClick={reviews} style={{overflow:"scroll"}}className={style.btnEditar}>Reviews</button>
        </div>
        {/* <div>
        {professional?.review && <DisplayReview review={professional.review} />}
        {console.log(professional.review)}
        </div> */}
      </div>
      
    </>
  );
};

export default ProfessionalPage;
