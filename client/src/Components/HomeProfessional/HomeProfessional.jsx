import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfessionals, getTurns } from "../../Redux/Actions";
import Cards from "../Cards/Cards";
import Filters from "../Filters/Filters";
import NavbarTwo from "../NavbarTwo/NavbarTwo";
import BotonProf from "../BottonProf/BottonProf";
import DarkMode from "../DarkMode/DarkMode";
import Loading from "../../Pages/Loading/Loading";
import style from "./HomeProfessional.module.css";

const HomeProfessional = ({ id }) => {
  const profClientsTurns = useSelector((state) => state.profClientsTurns);

  const darkMode = useSelector((state) => state.darkMode);

  const [loading, setLoading] = useState(true);

  const allProfessionals = useSelector((state) => state.allProfessionals);

  const ultimoProfesional = id
    ? id
    : allProfessionals.length
    ? allProfessionals[allProfessionals.length - 1].id
    : "";

  const findProfessional = allProfessionals.find((prof) => id === prof.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessionals());
    dispatch(getTurns()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={!darkMode ? style.homeContainer : style.homeContainerDark}>
        <div className={style.filtersAndButtons}>
          <BotonProf id={id} />
          <Filters lastProfessional={ultimoProfesional} />
      {/* <DarkMode /> */}
        </div>
      <div className={style.content}>
          <div className={style.header}>
            <h1>Hola {findProfessional.name} !</h1>
            <p>
              {profClientsTurns.length
                ? `Tienes ${profClientsTurns.length} turnos`
                : "No hay turnos"}
            </p>
          </div>
          {profClientsTurns.length ? (
            <Cards turns={profClientsTurns} type="turns" />
          ) : (
            <h2>No hay turnos</h2>
          )}
      </div>
    </div>
  );
};

export default HomeProfessional;
