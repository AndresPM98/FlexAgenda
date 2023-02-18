/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Styles from "./AllProfessionals.module.css";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Cards from "../../Components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionals } from "../../Redux/Actions";

const AllProfessionals = () => {
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  return (
    <div className={Styles.mainContainer}>
      <NavbarTwo />
      <Cards type="allProfessionals" professionals={allProfessionals} />
    </div>
  );
};

export default AllProfessionals;
