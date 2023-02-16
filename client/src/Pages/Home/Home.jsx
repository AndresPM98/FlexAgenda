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

    const profDetail = useSelector(state => state.profDetail)

   
   /*  console.log(profDetail); */

    const dispatch = useDispatch();
   
useEffect(() => {
    dispatch(getTurns());
        }, [dispatch]);

    return(
        <div>
            <NavbarTwo/>

            <div className="homeContainer">
                <Filters allTurns = {allTurns}/>
                <BotonProf />
                <DarkMode/>
            </div>

            <div className="homeContainer">
                <BotonProf />
                <Filters allTurns = {allTurns}/>

                <Cards turns = {turns}/>
            </div>
        </div>
    )
}

export default Home; 