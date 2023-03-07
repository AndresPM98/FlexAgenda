import React from "react";
import { getProfessionals, deleteProfessional, deleteTurn } from "../../../Redux/Actions";
import style from "../Admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Loading from "../../../Pages/Loading/Loading";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useHistory } from "react-router-dom";

export default function CardsAdminProf({ id }) {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const allPorfessionals = useSelector((state) => state.allProfessionals);
  const turns = useSelector((state) => state.turnBackup);
  const allProfOrd= allPorfessionals.sort((a, b) => (a.name > b.name ? 1 : -1))



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessionals()).then(() => setLoading(false));
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  
 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      setCurrentUser(null)
      await Swal.fire({
        icon: "success",
        title: "Sesion cerrada",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/")
    } catch (error) {
     
      console.error(error);
    }
  };
  

  const handlerDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar a este profesional? Tambien se borraran los turnos y no podras recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    if (confirmDelete.isConfirmed) {
      const turnIdsToDelete = turns.filter(turn => turn.professionalID === id).map(turn => turn.id);
      const deleteTurnPromises = turnIdsToDelete.map(turnId => dispatch(deleteTurn(turnId)));
      await Promise.all(deleteTurnPromises); 
      dispatch(deleteProfessional(id))
      await Swal.fire({
        icon: "success",
        title: "Profesional eliminado",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
      dispatch(getProfessionals());
      ;
    }
  };

  const [disponibilityStatus, setDisponibilityStatus] = useState({
    disponibility: "",
  });

  const handlerEdit = async (id) => {
    try {
      const confirmEdit = await Swal.fire({
        title: '¿Estás seguro de que deseas deshabilitar este profesional?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, deshabilitar',
        cancelButtonText: 'Cancelar'
      });
  
      if (confirmEdit.isConfirmed) {
        await axios.put(`/professional/${id}`, { disponibility: false });
        setDisponibilityStatus({ disponibility: false });
  
        await Swal.fire({
          title: 'Profesional deshabilitado',
          icon: 'success',
          showConfirmButton: false,
            timer: 1500,
        });
  
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerEditTrue = async (id) => {
    try {
      const confirmEdit = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas habilitar de nuevo a este profesional?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, habilitar",
        cancelButtonText: "Cancelar",
      });
  
      if (confirmEdit.isConfirmed) {
        await axios.put(`/professional/${id}`, { disponibility: true });
        setDisponibilityStatus({ disponibility: true });
        await Swal.fire({
          title: 'Profesional habilitado',
          icon: 'success',
           showConfirmButton: false,
        timer: 1500});
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
      <h1>Dashboard admin  
        </h1>
        <div style={{ position: "absolute", top: 0, left: 50 }}>
  <Link to={`/admin/16aa4db8-b8cf-43bf-989a-5c7945212080`}>
    <img
      style={{ width: "60px", height: "60px", marginTop: "10px" }}
      src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
      alt=""
    />
    
  </Link>
    </div>

  <div style={{ position: "absolute", top: 0, right: 30 }}>
  <Link to={`/`} onClick={handleLogout}>
    <img
      style={{ width: "50px", height: "50px", marginTop: "10px" }}
      src="https://cdn-icons-png.flaticon.com/512/6437/6437583.png"
      alt=""
    />
    
  </Link>
</div>
   
      

      <Link
        to={`/allProfessionalsDashboardAdmin/36d12c77-50ae-4f7c-914b-21a53f82eaab`}
      >
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link
        to={`/allClientsDashboardAdmin/36d12c77-50ae-4f7c-914b-21a53f82eaab`}
      >
        <button className={style.adminbutton}>Clientes</button>
      </Link>
      <Link to={`/allReviewsDashboardAdmin/36d12c77-50ae-4f7c-914b-21a53f82eaab`}>
        <button className={style.adminbutton}>Reviews</button>
      </Link>

      <h2 >Profesionales ({allProfOrd.length})</h2>
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

            {professional.name === "Admin" ? (
              ""
            ) : (
              <>
                {professional.disponibility === false ? (
                  <button
                    onClick={() => handlerEditTrue(professional.id)}
                    style={{
                      backgroundColor: "red",
                      border: "none",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Habilitar
                  </button>
                ) : (
                  <button
                    onClick={() => handlerEdit(professional.id)}
                    style={{
                      backgroundColor: "green",
                      border: "none",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                    Deshabilitar
                  </button>
                )}
                <button
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handlerDelete(professional.id)}
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
