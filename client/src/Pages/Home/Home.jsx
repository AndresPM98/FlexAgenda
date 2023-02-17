import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTurns } from "../../Redux/Actions";
import Cards from "../../Components/Cards/Cards"
import Filters from "../../Components/Filters/Filters";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import BotonProf from "../../Components/BottonProf/BottonProf"; 
import DarkMode from '../../Components/DarkMode/DarkMode'
import './Home.css';


const Home = () => {

    const allTurns = useSelector((state) => state.turnBackup);
    const turns = useSelector(state => state.turns);
    const darkMode = useSelector((state) => state.darkMode)

    const profDetail = useSelector(state => state.profDetail)

   
   /*  console.log(profDetail); */

    const dispatch = useDispatch();
   
useEffect(() => {
    dispatch(getTurns());
        }, [dispatch]);

    return(
        <div>
            <NavbarTwo/>

            <div className={darkMode == false ? 'homeContainer' : 'homeContainerDark'}>
                <div className="filtersContainer">
                <BotonProf />
                <Filters allTurns = {allTurns}/>  
                </div>
                <DarkMode/>
                <Cards turns = {turns}/>
            </div>
        </div>
    )
}

export default Home; 