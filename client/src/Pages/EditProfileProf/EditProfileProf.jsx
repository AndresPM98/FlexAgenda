import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail } from "../../Redux/Actions";
import styles from "./EditProfileProf.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";

// funcion que edita el profesional
export default function EditProfileProf() {
  const profDetail = useSelector((state) => state.profDetail);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(getProfessionalDetail(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  const [prof, setProf] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    description: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    if (profDetail) {
      setProf((prevState) => ({
        ...prevState,
        name: profDetail.name,
        category: profDetail.category,
        phone: profDetail.phone,
        address: profDetail.address,
        description: profDetail.description,
      }));
    }
  }, [profDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFields = {};
    if (prof.name !== profDetail.name) {
      updatedFields.name = prof.name;
    }
    if (prof.category !== profDetail.category) {
      updatedFields.category = prof.category;
    }
    if (prof.phone !== profDetail.phone) {
      updatedFields.phone = prof.phone;
    }
    if (prof.address !== profDetail.address) {
      updatedFields.address = prof.address;
    }
    if (prof.description !== profDetail.description) {
      updatedFields.description = prof.description;
    }

    axios
      .put(`/professional/${id}`, updatedFields)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    alert("Cambios guardados");
    history.push(`/professionalDetail/${id}`);
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div >
      <NavbarTwo />
     
      <div className={styles.backContainer}>
          <NavLink className={styles.back} to={`/professionalDetail/${id}`}>
            <iconify-icon
              icon="ion:arrow-back-circle"
              width="40"
              height="30"
            ></iconify-icon>
            CANCEL
          </NavLink>
        </div>

      <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.tittle}>EDIT YOUR PROFILE</h1>

        <label className={styles.label}>NAME:</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            defaultValue={profDetail.name}
            onChange={(e) => setProf({ ...prof, name: e.target.value })}
          />
        
        
        <label className={styles.label}>CATEGORY:</label>
          <input
            className={styles.input}
            type="text"
            defaultValue={profDetail.category}
            name="category"
            onChange={(e) => setProf({ ...prof, category: e.target.value })}
          />
        
       
        <label className={styles.label}>PHONE:</label>
          <input
            className={styles.input}
            name="phone"
            defaultValue={profDetail.phone}
            onChange={(e) => setProf({ ...prof, phone: e.target.value })}
          />
        
        
        <label className={styles.label}>ADDRESS:</label>
          <input
            className={styles.input}
            name="address"
            defaultValue={profDetail.address}
            onChange={(e) => setProf({ ...prof, address: e.target.value })}
          />
        
        
        <label className={styles.label}>DESCRIPTION:</label>
          <textarea
            className={styles.input}
            name="description"
            defaultValue={profDetail.description}
            onChange={(e) => setProf({ ...prof, description: e.target.value })}
          />
       
       

        <button type="submit" className={styles.button}>
          SAVE CHANGES
        </button>
      </form>
      </div>
      
    </div>
  );
}
