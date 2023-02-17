import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail } from "../../Redux/Actions";
import "./EditProfileProf.css";
import axios from "axios";

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
    return <div>Cargando datos ...</div>;
  }

  return (
    <div className="container-edit">
      <NavbarTwo />
      <br />
      <form onSubmit={handleSubmit} className="detail-container">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            defaultValue={profDetail.name}
            onChange={(e) => setProf({ ...prof, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          category:
          <input
            type="text"
            defaultValue={profDetail.category}
            name="category"
            onChange={(e) => setProf({ ...prof, category: e.target.value })}
          />
        </label>
        <br />
        <label>
          phone:
          <input
            name="phone"
            defaultValue={profDetail.phone}
            onChange={(e) => setProf({ ...prof, phone: e.target.value })}
          />
        </label>
        <br />
        <label>
          adress:
          <input
            name="adress"
            defaultValue={profDetail.adress}
            onChange={(e) => setProf({ ...prof, adress: e.target.value })}
          />
        </label>
        <br />
        <label>
          description:
          <textarea
            name="description"
            defaultValue={profDetail.description}
            onChange={(e) => setProf({ ...prof, description: e.target.value })}
          />
        </label>
        <br />

        <button type="submit" className="buttonEdit">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
