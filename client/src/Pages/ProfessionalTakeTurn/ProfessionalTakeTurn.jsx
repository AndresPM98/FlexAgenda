import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail } from "../../Redux/Actions";
import Loading from "../Loading/Loading";
import style from "./ProfessionalTakeTurn.module.css";
import { useState } from "react";

import { Link } from "react-router-dom";

const ProfessionalPage = () => {
  const { id } = useParams();
  const professional = useSelector((state) => state.profDetail);
  const darkMode = useSelector((state) => state.darkMode);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfessionalDetail(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavbarTwo />
      <div
        className={darkMode === false ? style.container : style.containerDark}
      >
        <p> Professional Page</p>
        <div className={style.detailContainer}>
          <img
            style={{ borderRadius: "50%" }}
            src={
              professional?.image
                ? professional.image
                : "https://i.stack.imgur.com/4powQ.gif"
            }
            alt=""
          />
          <h1 className={style.name}>{professional?.name}</h1>
          <h2 className={style.category}>{professional?.category}</h2>
          <h4 className={style.phone}>{professional?.phone}</h4>
          <h4 className={style.adress}>{professional?.address}</h4>
          <h4 className={style.adress}>{professional?.email}</h4>
          <p className={style.description}>{professional?.description}</p>
        </div>
        {false ? (
          <Link to={`/formClient/${id}`}>
            <button className={style.btnTurn}>Registrarse</button>
          </Link>
        ) : (
          <Link to={`/form/${id}`}>
            <button className={style.btnTurn}>Sacar turno</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ProfessionalPage;
