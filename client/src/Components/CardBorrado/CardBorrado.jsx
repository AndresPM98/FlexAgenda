import React from "react";
import { NavLink } from "react-router-dom";
import { deleteTurn, getTurnDetail, getTurns, getProfessionals, filterCanceled} from "../../Redux/Actions";
import style from "./CardBorrado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../../Pages/Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const CardBorrado = ({ name, date, hour, id, type, email, address, description }) => {
 const turnDetail = useSelector((state) => state.turnDetail);
  const dispatch = useDispatch();
  const history = useHistory();


const [loading, setLoading] = useState(true);

const [turns, setTurns] = useState([]);



useEffect(() => {
  const fetchData = async () => {
     dispatch(getProfessionals());
    await dispatch(filterCanceled()).then(() => {
      setLoading(false);
    })
    
  };
  fetchData();
}, [dispatch]);

  // const handlerDelete = () => {
  //   const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar este turno? No podrás recuperarlo.");
  //   if (confirmDelete) {
  //     dispatch(deleteTurn(id)).then(() => {
  //       alert("Turno eliminado");
  //       window.location.reload();
  //       dispatch(getTurns()).then((response) => {
  //         setTurns(response);
  //       });
  //     });
  //   }
  // };

  const handlerDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro de que deseas borrar este turno? No podrás recuperarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });
  
    if (isConfirmed) {
      await dispatch(deleteTurn(id));
      await Swal.fire({
        title: "Turno Eliminado",
        icon: "success",
        text: "Se ha eliminado el turno.",
        confirmButtonText: "Aceptar",
      });
      const response = await dispatch(getTurns());
      setTurns(response);
      window.location.reload();
    };
  };

  const [turnStatus, setTurnStatus] = useState({
    status: "",
  });

  const handlerEdit = async () => {
  try {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro de que deseas recuperar este turno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    });

    if (isConfirmed) {
      await axios.put(`/turn/${id}`, { status: true });
      setTurnStatus(true);
      await Swal.fire({
        title: "Turno recuperado",
        icon: "success",
        text: "Se ha recuperado el turno.",
        confirmButtonText: "Aceptar",
      });
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

  if(loading){
    return <Loading />
  }
  

  return  type === "turns" ? (
    <div className={style.card}>
      {/* <div className={style.card}> */}
      <div className={style.name}>
        {name}
      </div>
      <div className={style.info}>
        <p style={{marginBottom:"40px"}} >{date}</p>
        <p style={{marginBottom:"40px"}} >{hour}</p>
        <button onClick={handlerDelete} className={style.btnborrar}>X</button>
        <button onClick={handlerEdit} className={style.btnrecuperar}>Recuperar</button>
      </div>
    </div>
  ) : (
    <div className={style.card}>
      <div className={style.name}>
        {name}
      </div>
      <div className={style.info} >
        <p  style={{marginBottom:"40px"}}>{email}</p>
        <p  style={{marginBottom:"40px"}}>{address}</p>
        <p  style={{marginBottom:"40px"}}>{description}</p>
      </div>
    </div>
  );
};

export default CardBorrado;
