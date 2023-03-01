/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Styles from "./AllProfessionals.module.css";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Cards from "../../Components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionals } from "../../Redux/Actions";
import { NavLink } from "react-router-dom";

const AllProfessionals = () => {
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const allProfOrder= allProfessionals.sort((a, b) => (a.name > b.name ? 1 : -1))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  return (
    <div className={Styles.mainContainer}>
    <NavbarTwo/>
      <NavLink className={Styles.back} to="/">
        <iconify-icon
          icon="ion:arrow-back-circle"
          width="40"
          height="30"
        ></iconify-icon>
        BACK
      </NavLink>
      <Cards type="allProfessionals" professionals={allProfOrder} />
    </div>
  );
};

export default AllProfessionals;
