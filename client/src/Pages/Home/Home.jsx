import React, {useEffect, useState} from "react";
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

    const [loading, setLoading] = useState(true)

    const allTurns = useSelector((state) => state.turnBackup);
    const turns = useSelector(state => state.turns);
    const profClientsTurns = useSelector((state) => state.profClientsTurns)


  const allProfessionals = useSelector((state) => state.allProfessionals);

  const ultimoProfesional = id
    ? id
    : allProfessionals.length
    ? allProfessionals[0].id
    : "";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTurns());

  }, []);

  useEffect(() => {
    dispatch(getProfClientsTurns(ultimoProfesional));
  }, [ultimoProfesional]);

        }, [dispatch]);

useEffect(() => {
    dispatch(getProfClientsTurns(ultimoProfesional.id))
},[ultimoProfesional.id])


useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div>
      <NavbarTwo />


      
      {loading ? (
        <Loading />
      ) : (
        <div className={darkMode == false ? "homeContainer" : "homeContainerDark"}>
          <div className="filtersContainer">
            {/* {console.log(profDetail)} */}
            <BotonProf />
            <Filters lastProfessional={ultimoProfesional} />
          </div>
          <DarkMode />
          {profClientsTurns.length && <Cards turns={profClientsTurns} />}
        </div>
      )}

    </div>
  );
};

export default Home;
