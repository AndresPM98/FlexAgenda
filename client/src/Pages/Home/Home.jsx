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
  // console.log(turns);
  // console.log(allTurns);
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
  
console.log(ultimoProfesional);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTurns()).then(() => { setLoading(false) });
  }, [dispatch]);


  useEffect(() => {
    dispatch(getProfessionals());
  }, [dispatch]);


  if (loading) {
    return <Loading/>;
  }

  return (
    <div>
      <NavbarTwo />

      {loading ? (
        <Loading />
      ) : (
        <div
          className={darkMode == false ? "homeContainer" : "homeContainerDark"}
        >
          <div className="filtersContainer">
            {/* {console.log(profDetail)} */}
            <BotonProf />
            <Filters lastProfessional={ultimoProfesional} />
          </div>
          <DarkMode />
          {profClientsTurns.length ? 
            <Cards turns={profClientsTurns} type="turns" />
          : <h2>No hay turnos</h2>}
        </div>
      )}
    </div>
  );
};

export default Home;
