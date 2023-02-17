import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { cleanProfDetail, getProfessionalDetail } from "../../Redux/Actions";

import style from "./ProfessionalPage.module.css";


import { Link } from "react-router-dom";

const ProfessionalPage = () => {
  const { id } = useParams();
  const professional = useSelector((state) => state.profDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfessionalDetail(id));
    return () => {
      dispatch(cleanProfDetail());
    };
  }, [dispatch, id]);

  return (
    <>
      <NavbarTwo />
      <div className={style.container}>
        <p>Professional Page</p>
        <div className={style.detailContainer}>
        <h1 className={style.name}>{professional?.name}</h1>
        <h2 className={style.category}>{professional?.category}</h2>
        <h4 className={style.phone}>{professional?.phone}</h4>
        <h4 className={style.adress}>{professional?.adress}</h4>
        <p className={style.description}>{professional?.description}</p>
        <img style={{borderRadius:"50%"}} src={professional?.image ? professional.image: "https://i.stack.imgur.com/4powQ.gif" } alt="" />
        </div>
        <Link to={`/professional/edit/${id}`}>
        <button className={style.btnEditar}>Editar Perfil</button>
        </Link>
      </div>

    </>
  );
};

export default ProfessionalPage;
