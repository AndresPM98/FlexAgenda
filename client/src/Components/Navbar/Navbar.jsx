import "./Navbar.css";
import   {NavLink} from "react-router-dom";

export default function Navbar (props){
    return(
        <div className="navbarContainer">
            <div className="logo">
            <iconify-icon icon="fluent-mdl2:calendar-agenda" width="25"></iconify-icon>
            <iconify-icon icon="fluent-mdl2:gripper-bar-vertical" width="40" height="30"></iconify-icon>
            <h1>FLEXAGENDA</h1>
            </div>
            <div className="buttons">
                <NavLink to="/login" className="login">LOGIN</NavLink>
                <NavLink to="/signUp" className="signUp">SIGN UP</NavLink>
            </div>
        </div>
    )
}