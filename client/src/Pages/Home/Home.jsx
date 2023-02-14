import React from "react";
import Search from "../../Components/Searchbar/Searchbar";
import Cards from "../../Components/Cards/Cards"
import Filters from "../../Components/Filters/Filters";

const Home = () => {
    return(
        <div>
            <h1>Home</h1>
            <Search/>
            <Filters/>
            <Cards/>
        </div>
    )
}

export default Home; 