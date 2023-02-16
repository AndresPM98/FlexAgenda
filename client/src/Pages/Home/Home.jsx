import React from "react";
import Search from "../../Components/Searchbar/Searchbar";
import Cards from "../../Components/Cards/Cards"
import Filters from "../../Components/Filters/Filters";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Footer from "../../Components/Footer/Footer";
import './Home.css';

const Home = () => {
    return(
        <div>
            <NavbarTwo/>
            <div className="homeContainer">
                <Filters/>
                <Cards/>
            </div>
            <Footer/>
        </div>
    )
}

export default Home; 