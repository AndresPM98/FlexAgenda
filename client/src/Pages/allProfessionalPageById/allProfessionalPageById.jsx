import React, { useEffect } from "react";
import Styles from "./allProfessionalPageById.module.css";
import HomeProfessional from "../../Components/HomeProfessional/HomeProfessional";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getClients, getTurns } from "../../Redux/Actions";


const AllProfessionalPageById = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
    dispatch(getTurns());
  }, [dispatch]);
  return (
    <div className={Styles.mainContainer}>
      <HomeProfessional id={id}></HomeProfessional>
    </div>
  );
};

export default AllProfessionalPageById;
