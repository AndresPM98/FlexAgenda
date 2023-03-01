import React from "react";
import Footer from "../../Components/Footer/Footer";
import "./QueryPage.css";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTurnDetail,
  getClientDetailTurn,
  cleanDetailTurn,
  deleteTurn,
} from "../../Redux/Actions";
import img from "../../Imagenes y logos/agenda.png";
import Loading from "../Loading/Loading";
import { useState } from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import axios from "axios";

const QueryPage = () => {
  const { id } = useParams();
  const params = useParams();
  const darkMode = useSelector((state) => state.darkMode);
  const turnDetail = useSelector((state) => state.turnDetail);
  const clientDetail = useSelector((state) => state.clientDetailTurn);

  const [loading, setLoading] = useState(true);
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTurnDetail(params.id)).then(() => setLoading(false));
    return () => {
      dispatch(cleanDetailTurn());
    };
  }, [params, dispatch]);

  const dispatchClientDetail = () => {
    if (!clientDetail) {
      dispatch(getClientDetailTurn(turnDetail.ClientId));
    }
  };

  const history = useHistory();

  const handlerDelete = () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas borrar este turno? No podrás recuperarlo.");
    if (confirmDelete) {
    dispatch(deleteTurn(id));
    alert("Turno eliminado");
    history.push(`/home/${turnDetail.ProfessionalId}`);
    dispatch(getTurnDetail);}
  };

  
  const [turnStatus, setTurnStatus] = useState({
    status: "",
  });
  
  const handlerEdit = async () => {
    try {
      await axios.put(`/turn/${id}`, { status: false });
      setTurnStatus(false);
      alert("Turno cancelado");
      history.push(`/home/${turnDetail.ProfessionalId}`)
    } catch (error) {
      console.log(error);
    }
  };

  const handlerBack = () => {
    history.push(`/home/${turnDetail.ProfessionalId}`);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <NavbarTwo/>
      {turnDetail && dispatchClientDetail(turnDetail.ClientId)}
      <div className={darkMode === false ? "queryPage" : "queryPageDark"}>
        <div className="backContainer">
          <Link className="back" onClick={handlerBack}>
            <iconify-icon
              icon="ion:arrow-back-circle"
              width="40"
              height="30"
            ></iconify-icon>
            BACK
          </Link>
        </div>
        <div className="queryDetailContainer">
          <div className="header-container">
            <h1 className="turn-detail-tittle">Query Details</h1>
            <img className="img-turn" src={img} alt="illustration" />
          </div>
          <div className="data-turn-container">
            <h3 className="data-turn-text">
              Client: <b className="data-turn-text-info">{clientDetail.name}</b>
            </h3>
            <h3 className="data-turn-text">
              DNI:{" "}
              <b className="data-turn-text-info lineDni">{clientDetail.dni}</b>
            </h3>
            <h3 className="data-turn-text">
              Email: <b className="data-turn-text-info">{clientDetail.email}</b>
            </h3>
            <h3 className="data-turn-text">
              Date:{" "}
              <b className="data-turn-text-info lineDate">{turnDetail.date}</b>
            </h3>
            <h3 className="data-turn-text">
              Hour: <b className="data-turn-text-info">{turnDetail.hour}</b>
            </h3>
            {turnDetail.status === "false" ?           
              
            <button onClick={(e) => handlerDelete(e)} className="buttonDelete">
              Borrar turno 
            </button> 
            :
            <button onClick={(e) => handlerEdit(e)} className="buttonDelete">
              Cancelar turno 
            </button>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QueryPage;
