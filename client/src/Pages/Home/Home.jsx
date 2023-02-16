import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfessionalDetail, getTurns } from "../../Redux/Actions";
import Cards from "../../Components/Cards/Cards"
import Filters from "../../Components/Filters/Filters";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Footer from "../../Components/Footer/Footer";
import BotonProf from "../../Components/BottonProf/BottonProf"; 
import './Home.css';


const Home = () => {

    const allTurns = useSelector((state) => state.turnBackup);
    const turns = useSelector(state => state.turns);
    const profDetail = useSelector(state => state.profDetail)
   
   /*  console.log(profDetail); */

    const dispatch = useDispatch();
   
/* console.log(allTurns[0].professionalID);  */
useEffect(() => {
    dispatch(getTurns());
    /* dispatch(getProfessionalDetail(allTurns[0].professionalID)) */
        }, [dispatch]);

    return(
        <div>
            <NavbarTwo/>
            <div className="homeContainer">
                <Filters allTurns = {allTurns}/>
                <BotonProf />
                <Cards turns = {turns}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Home; 