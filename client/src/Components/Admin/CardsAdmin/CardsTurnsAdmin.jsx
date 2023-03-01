import React from "react";
import { getTurns } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../Admin.module.css";

export default function CardsTurnsAdmin() {
  const allTurns = useSelector((state) => state.turnBackup);

  console.log(allTurns);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTurns());
  }, []);

  const turnos = allTurns.map((turn) => turn);

  let count = 1;
  return (
    <div className={style.adminpage}>
      <h1>Dashboard admin</h1>
      <Link to="/allProfessionalsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080">
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link to="/allClientsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080">
        <button className={style.adminbutton}>Clientes</button>
      </Link>
      <Link to="/allTurnsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080">
        <button className={style.adminbutton}>Turnos</button>
      </Link>
        <h3>Turnos ({allTurns.length})</h3>
      <div className={style.cardcontainer} >
        {turnos.map((turn, index) => (
            
          <div className={style.cardsProf} style={{border:"2px solid black", margin:"10px", width:"300px"}}key={index}>
            <h3> {turn.date} </h3>
            <h3> {turn.client.name} </h3>
            <h3>{turn.hour}</h3>
            <button > Deshabilitar</button>
            <button > Eliminar</button>
          </div>
        )
        )}
      </div>
    </div>
  );
}
