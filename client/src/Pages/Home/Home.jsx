import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProfessionals,
  getTurns,
  getProfClientsTurns,
} from "../../Redux/Actions";
import Cards from "../../Components/Cards/Cards";
import Filters from "../../Components/Filters/Filters";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import BotonProf from "../../Components/BottonProf/BottonProf";
import DarkMode from "../../Components/DarkMode/DarkMode";
import Loading from "../Loading/Loading";
import "./Home.css";

const Home = ({ id }) => {
  console.log(id);
  const allTurns = useSelector((state) => state.turnBackup);
  const turns = useSelector((state) => state.turns);

  const profClientsTurns = useSelector((state) => state.profClientsTurns);

  const darkMode = useSelector((state) => state.darkMode);

  const profDetail = useSelector((state) => state.profDetail);

  const [loading, setLoading] = useState(true);

  const allProfessionals = useSelector((state) => state.allProfessionals);

  const ultimoProfesional = id
    ? id
    : allProfessionals.length
    ? allProfessionals[allProfessionals.length - 1].id
    : "";

  const nameProfessional = allProfessionals.length
    ? allProfessionals[allProfessionals.length - 1].name
    : "";

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
      <NavbarTwo />

      <h1>Hola {nameProfessional} !</h1>
      <p>{profClientsTurns.length ? `Tienes ${profClientsTurns.length} turnos` : "No hay turnos"}</p>
      <div
        className={darkMode == false ? "homeContainer" : "homeContainerDark"}
        >
        <div className="filtersContainer">
          {/* {console.log(profDetail)} */}
          <BotonProf />
          <Filters lastProfessional={ultimoProfesional} />
        </div>
        <DarkMode />
        {profClientsTurns.length ? (
          <Cards turns={profClientsTurns} type="turns" />
        ) : (
          <h2>No hay turnos</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
