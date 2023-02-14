import React from "react";
import { Link } from "react-router-dom";

const landingPage = () => {
    return(
        <div>
            <h1>Landing Page</h1>
            <Link to="/home"><button>START NOW</button></Link>
        </div>
    )
}

export default landingPage; 