import React from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Footer from "../../Components/Footer/Footer";
import "./QueryPage.css";
import { NavLink } from "react-router-dom";
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

const QueryPage = () => {
  const params = useParams();
  const darkMode = useSelector((state) => state.darkMode);
  const turnDetail = useSelector((state) => state.turnDetail);
  const clientDetail = useSelector((state) => state.clientDetailTurn);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTurnDetail(params.id)).then (() => setLoading(false));
    return () => {
      dispatch(cleanDetailTurn())
    };
  }, [params]);

  const dispatchClientDetail = () => {
    if (!clientDetail) {
      dispatch(getClientDetailTurn(turnDetail.ClientId));
    }
  };

  const { id } = useParams();
  const history = useHistory();

  const handlerDelete = () => {
    dispatch(deleteTurn(id));
    alert("Turno eliminado")
    history.push("/home");
    dispatch(getTurnDetail);
  };
  if (loading) return <Loading />;

  return (
    <div>
      {turnDetail && dispatchClientDetail(turnDetail.ClientId)}
      <NavbarTwo />
      <div className={darkMode === false ? "queryPage" : "queryPageDark"}>
        <div className="backContainer">
          <NavLink className="back" to="/home">
            <iconify-icon
              icon="ion:arrow-back-circle"
              width="40"
              height="30"
            ></iconify-icon>
            BACK
          </NavLink>
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
            <button onClick={(e) => handlerDelete(e)} className="buttonDelete">
              Delete Turn
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QueryPage;
