import React from "react";
import Loading from "../../../Pages/Loading/Loading";
import { getClients, deleteClients } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../Admin.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
export default function CardsClientAdmin() {
  const allClients = useSelector((state) => state.allClients);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getClients()).then(() => setLoading(false));
  }, []);


  const handlerDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas borrar este cliente? No podrás recuperarlo."
    );
    if (confirmDelete) {
      dispatch(deleteClients(id)).then(() => {
        alert("Cliente eliminado");
        window.location.reload();
        dispatch(getClients());
      });
    }
  };
  const [disponibilityStatus, setDisponibilityStatus] = useState({
    disponibility: "",
  });


  const handlerEdit = async (id) => {
    try {
      const confirmEdit = window.confirm(
        "¿Estás seguro de que deseas deshabilitar este profesional?"
      );
      if (confirmEdit) {
        axios.put(`/clients/${id}`, { disponibility: false });
        setDisponibilityStatus(({ disponibility: false }));
        alert("Profesional deshabilitado");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };



  if (loading) {
    return <Loading />;
  }

  return (
    <div className={style.adminpage}>
      <h1>Dashboard admin</h1>
      <Link to={`/allProfessionalsDashboardAdmin/879e90bf-403b-4dfe-b46a-79a9ddc34d26`}>
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link to={`/allClientsDashboardAdmin/879e90bf-403b-4dfe-b46a-79a9ddc34d26`}>
        <button className={style.adminbutton}>Clientes</button>
      </Link>

      <h3>Clientes ({allClients.length})</h3>
      <div
        className={style.cardcontainer}
        style={{ display: "flex", margin: "20px" }}
      >
        {allClients.map((client, index) => (
          <div
            className={style.cardProf}
            key={index}
            style={{ height: "200px", width: "300px" }}
          >
            <h3 style={{ marginBottom: "0px" }}>{client.name}</h3>
            <h4 style={{ marginBottom: "60px" }}>
              {" Email: "}
              {client.email}
            </h4>
            {/* <button> Deshabilitar</button> */}
            <button style={{ marginLeft:"10px",backgroundColor: "red" ,border:"none", color:"white", padding:"10px 20px", borderRadius:"5px", cursor:"pointer"}} onClick={() => handlerDelete(client.id)}> Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
