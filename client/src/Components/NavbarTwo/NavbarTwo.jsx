import style from "./NavbarTwo.module.css";
import { useSelector } from "react-redux";

export default function NavbarTwo(props){

    const darkMode = useSelector((state) => state.darkMode)

    return(
        <div className={!darkMode? style.navbarContainer : style.navbarContainerDark}>
            <div className={style.logoTwo}>
                <iconify-icon icon="fluent-mdl2:calendar-agenda" width="25"></iconify-icon>
                <iconify-icon icon="fluent-mdl2:gripper-bar-vertical" width="40" height="30"></iconify-icon>
                <h1>FLEXAGENDA</h1>
            </div>
        </div>
    ) 
}