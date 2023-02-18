import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfClientsTurns, getTurns } from "../../Redux/Actions";
import Cards from "../../Components/Cards/Cards"
import Filters from "../../Components/Filters/Filters";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import BotonProf from "../../Components/BottonProf/BottonProf"; 
import DarkMode from '../../Components/DarkMode/DarkMode'
import './Home.css';
import Loading from "../Loading/Loading";

const Home = () => {

    const [loading, setLoading] = useState(true)

    const allTurns = useSelector((state) => state.turnBackup);
    const turns = useSelector(state => state.turns);
    const profClientsTurns = useSelector((state) => state.profClientsTurns)

    const darkMode = useSelector((state) => state.darkMode)

    const profDetail = useSelector(state => state.profDetail)

  const allProfessionals = useSelector(state => state.allProfessionals)

    const ultimoProfesional = allProfessionals.length
  ? allProfessionals[allProfessionals.length - 1]
  : "";
   
   

    const dispatch = useDispatch();
   
useEffect(() => {
    dispatch(getTurns());
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

      {/* renderizar Loading mientras loading es true */}
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
