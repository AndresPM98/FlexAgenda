import style from "./NavbarTwo.module.css";
import { useSelector } from "react-redux";
import {Link } from "react-router-dom";

export default function NavbarTwo(props){

    const darkMode = useSelector((state) => state.darkMode)

    return(
        <div className={!darkMode? style.navbarContainer : style.navbarContainerDark}>
            <div className={style.logoTwo} style={{textDecoration:"none", color: "white"}}>
                <Link to= "/">
                <iconify-icon icon="fluent-mdl2:calendar-agenda" width="25"></iconify-icon>
                <iconify-icon icon="fluent-mdl2:gripper-bar-vertical" width="40" height="30"></iconify-icon>
                </Link>
                <h1>FLEXAGENDA</h1>
            </div>
        </div>
    ) 
}