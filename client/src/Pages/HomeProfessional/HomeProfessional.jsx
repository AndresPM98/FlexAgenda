import React, { useEffect } from "react";
import Styles from "./HomeProfessional.module.css";
import Home from "../Home/Home";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getClients, getTurns } from "../../Redux/Actions";

const HomeProfessional = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
    dispatch(getTurns());
  }, [dispatch]);
  return (
    <div className={Styles.mainContainer}>
      <Home id={id}></Home>
    </div>
  );
};

export default HomeProfessional;
