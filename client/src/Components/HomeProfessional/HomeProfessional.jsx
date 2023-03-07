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
  const turns = useSelector((state) => state.turns);
  const [loading, setLoading] = useState(true);

  const allProfessionals = useSelector((state) => state.allProfessionals);

  const ultimoProfesional = id
    ? id
    : allProfessionals.length
    ? allProfessionals[allProfessionals.length - 1].id
    : "";

  const findProfessional = allProfessionals.find((prof) => id === prof.id);



  const filteredTurns = turns.filter((turn) => turn.professionalID === id);
  const turnsWithStatus = filteredTurns.map((turn) => {
    return turn.status;
  });



  const turnStates2 = turns.filter(
    (turn) => turn.professionalID === id && turn.status === "false"
  );

  const turnStatesTrue = turns.filter(
    (turn) => turn.professionalID === id && turn.status === "true"
  );



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
    <div>
      <div className={style.nav}><NavbarTwo/></div>
      
      <div
        className={!darkMode ? style.homeContainer : style.homeContainerDark}
      >
        <div className={style.filtersAndButtons}>
          {/* <BotonProf id={id} /> */}
          <Filters lastProfessional={ultimoProfesional} />
          {/* <DarkMode /> */}
        </div>
        <div className={style.content}>
          <div className={style.header}>
            <h1>Hola {findProfessional.name} !</h1>
            <p>
              {turnStatesTrue.length === 1
                ? "Tienes 1 turno confirmado"
                : `Tienes ${turnStatesTrue.length} turnos confirmados`}
              {turnStates2.length === 1
                ? ` y 1 turno cancelado.`
                : turnStates2.length > 1
                ? ` y ${turnStates2.length} turnos cancelados.`
                : "."}
            </p>
          </div>
          {profClientsTurns.length ? (
            <Cards turns={profClientsTurns} type="turns" />
          ) : (
            <h2>No hay turnos</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProfessional;
