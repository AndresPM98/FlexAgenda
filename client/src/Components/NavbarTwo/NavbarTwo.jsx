import "./NavbarTwo.css";

export default function NavbarTwo(props){
    return(
        <div className="navbarContainer">
            <div className="logo">
                <iconify-icon icon="fluent-mdl2:calendar-agenda" width="25"></iconify-icon>
                <iconify-icon icon="fluent-mdl2:gripper-bar-vertical" width="40" height="30"></iconify-icon>
                <h1>FLEXAGENDA</h1>
            </div>
        </div>
    )
}