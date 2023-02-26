import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail, getServices } from "../../Redux/Actions";
import Loading from "../Loading/Loading";
import style from "./ProfessionalPage.module.css";
import { useState } from "react";

import { Link } from "react-router-dom";

const ProfessionalPage = () => {
  const { id } = useParams();
  const professional = useSelector((state) => state.profDetail);
  const darkMode = useSelector((state) => state.darkMode);
  const [loading, setLoading] = useState(true)



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfessionalDetail(id)).then(() => setLoading(false));
    dispatch(getServices())

  }, [dispatch, id]);


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

        <p>Professional Page</p>
        <div className={style.detailContainer}>

        <img style={{borderRadius:"50%",width:"200px", height:"200px", float:"left", marginRight:"10px"}} src={professional?.image ? professional.image: "https://i.stack.imgur.com/4powQ.gif" } alt="" />
        <h1 className={style.name}>{professional?.name}</h1>
        <h2 className={style.category}>{professional?.category}</h2>
        <h4 className={style.phone}>{professional?.phone}</h4>
        <h4 className={style.adress}>{professional?.address}</h4>
        <a href={professional.addresslocation} target="_blank">

          <h4 className={style.adress}>Google Maps</h4>
          </a>
        <h4 className={style.adress}>{professional?.email}</h4>
        
        <p className={style.description}>{professional?.description}</p>
        <ServiceCard/>

        <Link to={`/professional/edit/${id}`}>
        <button className={style.btnEditar}>Editar Perfil</button>
        </Link>
        <Link to={`/professional/edit/${id}/services`}>
        <button className={style.btnEditar}>Agregar Servicios</button>
        </Link>
        </div>
      </div>
      
    </>
  );
};

export default ProfessionalPage;
