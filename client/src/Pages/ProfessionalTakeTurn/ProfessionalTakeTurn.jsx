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
          <h4 className={style.adress}>{professional?.email}</h4>
          <p className={style.description}>{professional?.description}</p>
        </div>
        <Link to={`/formClient`}>
          <button className={style.btnTurn}>Sacar turno</button>
        </Link>
      </div>
    </>
  );
};

export default ProfessionalPage;
