import React from "react";
import { getProfessionals, deleteProfessional } from "../../../Redux/Actions";
import style from "../Admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loading from "../../../Pages/Loading/Loading";

export default function CardsAdminProf({id}) {
  const [loading, setLoading] = useState(true);

  const allPorfessionals = useSelector((state) => state.allProfessionals);
  const allProfOrd= allPorfessionals.sort((a, b) => (a.name > b.name ? 1 : -1))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessionals()).then(() => setLoading(false));
  }, []);

// const {id} = useParams()
  const handlerDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas borrar este turno? No podrás recuperarlo."
    );
    if (confirmDelete) {
      dispatch(deleteProfessional(id)).then(() => {
        alert("Profesional eliminado");
        window.location.reload();
        dispatch(getProfessionals());
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
        axios.put(`/professional/${id}`, { disponibility: false });
        setDisponibilityStatus(({ disponibility: false }));
        alert("Profesional deshabilitado");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handlerEditTrue = async (id) => {
    try {
      const confirmEdit = window.confirm(
        "¿Estás seguro de que deseas habilitar de nuevo a este profesional?"
      );
      if (confirmEdit) {
        axios.put(`/professional/${id}`, { disponibility: true });
        setDisponibilityStatus(({ disponibility: true }));
        alert("Profesional habilitado");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

 
  if (loading) {
    return <Loading />;
  }

  const disabledProfessionals = allProfOrd.filter((professional) => !professional.disponibility);
  const enabledProfessionals = allProfOrd.filter((professional) => professional.disponibility);
  const combinedProfessionals = [...disabledProfessionals, ...enabledProfessionals];

  return (
    <div className={style.adminpage}>
      <h1>Dashboard admin</h1>
      <Link to={`/allProfessionalsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}>
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link to={`/allClientsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}>
        <button className={style.adminbutton}>Clientes</button>
      </Link>

      <h3>Profesionales ({allProfOrd.length})</h3>
      <div className={style.cardcontainer} style={{ display: "flex" }}>
        {combinedProfessionals.map((professional, index) => (
          <div className={style.cardProf}>
           
            
            {professional.image ? (
              
              <img
                style={{
                  marginTop: "20px",
                  height: "150px",
                  width: "150px",
                  borderRadius: "50px",
                }}
                src={professional.image}
                alt="img"
              />
            ) : null}
            <div className={style.cardinfo}>
           
              <h3>{professional.name}</h3> <h4> {professional.email} </h4>
              
              <h4> Phone: {professional.phone} </h4>
            </div>
            {professional.disponibility === false ? (
              <button onClick={()=>handlerEditTrue(professional.id)} style={{ backgroundColor: "red" ,border:"none", color:"white", padding:"10px 20px", borderRadius:"5px", cursor:"pointer"}}>Habilitar</button>
            ) : (
            
            <button onClick={()=> handlerEdit(professional.id)} style={{ backgroundColor: "green" ,border:"none", color:"white", padding:"10px 20px", borderRadius:"5px", cursor:"pointer"}}> Deshabilitar</button>
            )}
            <button style={{ marginLeft:"10px",backgroundColor: "red" ,border:"none", color:"white", padding:"10px 20px", borderRadius:"5px", cursor:"pointer"}} onClick={() => handlerDelete(professional.id)}>
              {" "}
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
