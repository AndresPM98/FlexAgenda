import React from "react";
import Loading from "../../../Pages/Loading/Loading";
import { getClients, deleteClients } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../Admin.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useHistory } from "react-router-dom";

export default function CardsClientAdmin() {
  const history = useHistory();
  const allClients = useSelector((state) => state.allClients);
  const allClientsOrd = allClients.sort((a, b) => (a.name > b.name ? 1 : -1));

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getClients()).then(() => setLoading(false));
  }, []);

  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      setCurrentUser(null);
      await Swal.fire({
        icon: "success",
        title: "Sesion cerrada",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlerDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar a este cliente? No podras recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirmDelete.isConfirmed) {
      dispatch(deleteClients(id));
      await Swal.fire({
        title: "Cliente eliminado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getClients());
      window.location.reload();
    }
  };

  const [disponibilityStatus, setDisponibilityStatus] = useState({
    disponibility: "",
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={style.adminpage}>
      <h1>Dashboard admin</h1>
      <div >
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
        <Link
          to={`/allReviewsDashboardAdmin/36d12c77-50ae-4f7c-914b-21a53f82eaab`}
        >
          <button className={style.adminbutton}>Reviews</button>
        </Link>
      </div>

      <h2>Clientes ({allClientsOrd.length})</h2>
      <div
        className={style.cardcontainer}
        style={{ display: "flex", margin: "20px" }}
      >
        {allClientsOrd.map((client, index) => (
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
              onClick={() => handlerDelete(client.id)}
            >
              {" "}
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
