import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfClientsTurns, getTurns } from "../../Redux/Actions";
import Cards from "../../Components/Cards/Cards"
import Filters from "../../Components/Filters/Filters";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import BotonProf from "../../Components/BottonProf/BottonProf"; 
import DarkMode from '../../Components/DarkMode/DarkMode'
import './Home.css';


const Home = () => {

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

    return(
        <div>
            <NavbarTwo/>

            <div className={darkMode == false ? 'homeContainer' : 'homeContainerDark'}>
                <div className="filtersContainer">
                {/* {console.log(profDetail)} */}
                <BotonProf />
                <Filters lastProfessional = {ultimoProfesional}/>  
                </div>
                <DarkMode/>
                {profClientsTurns.length && <Cards turns = {profClientsTurns}/>}
            </div>
        </div>
    )
}

export default Home; 