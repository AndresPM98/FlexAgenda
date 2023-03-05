import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { getProfessionalDetail } from "../../Redux/Actions";
import styles from "./EditProfileProf.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { FormGroup, Label, Input, FormText, Container } from "reactstrap";

// funcion que edita el profesional
export default function EditProfileProf() {
  const profDetail = useSelector((state) => state.profDetail);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(profDetail.image);

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
    addresslocation: "",
    description: "",
    image: "",
    category: "",
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "FlexAgenda");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/ddiusg8zz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(res);
    setImg(file.secure_url);

    setLoading(false);
  };

  useEffect(() => {
    if (profDetail) {
      setProf((prevState) => ({
        ...prevState,
        name: profDetail.name,
        category: profDetail.category,
        phone: profDetail.phone,
        address: profDetail.address,
        addresslocation: profDetail.addresslocation,
        image: profDetail.image,
        description: profDetail.description,
      }));
    }
  }, [profDetail]);
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const updatedFields = {};
  //   if (prof.name !== profDetail.name) {
  //     updatedFields.name = prof.name;
  //   }
  //   if (prof.category !== profDetail.category) {
  //     updatedFields.category = prof.category;
  //   }
  //   if (prof.phone !== profDetail.phone) {
  //     updatedFields.phone = prof.phone;
  //   }
  //   if (prof.address !== profDetail.address) {
  //     updatedFields.address = prof.address;
  //   }
  //   if (prof.addresslocation !== profDetail.addresslocation) {
  //     updatedFields.addresslocation = prof.addresslocation;
  //   }
  //   if (prof.description !== profDetail.description) {
  //     updatedFields.description = prof.description;
  //   }
  //   if (img) {
  //     updatedFields.image = img;
  //   }
  //   axios
  //     .put(`/professional/${id}`, updatedFields)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));

  //     await Swal.fire({
  //       title: "Turno Eliminado",
  //       icon: "success",
  //       text: "Se ha eliminado el turno.",
  //       confirmButtonText: "Aceptar",
  //     });
  //   history.push(`/professionalDetail/${id}`);
  // };

  const handleSubmit = async (e) => {
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
    if (prof.addresslocation !== profDetail.addresslocation) {
      updatedFields.addresslocation = prof.addresslocation;
    }
    if (prof.description !== profDetail.description) {
      updatedFields.description = prof.description;
    }
    if (img) {
      updatedFields.image = img;
    }
    
    try {
      await axios.put(`/professional/${id}`, updatedFields);
      await Swal.fire({
        title: "Actualización exitosa",
        icon: "success",
        text: "Se ha actualizado el perfil.",
        confirmButtonText: "Aceptar",
      });
      history.push(`/professionalDetail/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
   

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
      <NavbarTwo/>

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.tittle}>EDITÁ TU PERFIL</h1>
          
          <label className={styles.label}>FOTO DE PERFIL: </label>
            <br />
          
          <input
            className={styles.inputPerfil}
            name="image"
            type="file"
            placeholder="Upload your profile picture"
            onChange={(e) => {
              uploadImage(e);
              setImg(e.target.files[0]);
            }}
          />
          {profDetail.img ? (
            <img
            className={styles.imagenEditPerfil}
              src={profDetail.img}
             
            />
          ) : (
            <img
            className={styles.imagenEditPerfil}
              src={img}
              
            />
          )}
         
         
         <br />
          <label className={styles.label}>NOMBRE:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            name="name"
            defaultValue={profDetail.name}
            onChange={(e) => setProf({ ...prof, name: e.target.value })}
          />

          <label className={styles.label}>ÁREA:</label>
          <br />
          <input
            className={styles.input}
            type="text"
            defaultValue={profDetail.category}
            name="category"
            onChange={(e) => setProf({ ...prof, category: e.target.value })}
          />

          <label className={styles.label}>CONTACTO:</label>
          <br />
          <input
            className={styles.input}
            name="phone"
            defaultValue={profDetail.phone}
            onChange={(e) => setProf({ ...prof, phone: e.target.value })}
          />

          <label className={styles.label}>DIRECCIÓN:</label>
          <br />
          <input
            className={styles.input}
            name="address"
            defaultValue={profDetail.address}
            onChange={(e) => setProf({ ...prof, address: e.target.value })}
          />


          <label className={styles.label}>URL GOOGLE MAPS:</label>
          <br />
          <input
            className={styles.input}
            name="addresslocation"
            defaultValue={profDetail.addresslocation}
            onChange={(e) =>
              setProf({ ...prof, addresslocation: e.target.value })
            }
          />

          <label className={styles.label}>PROFESION:</label>
          <br />
          <textarea
            className={styles.input}
            name="description"
            defaultValue={profDetail.description}
            onChange={(e) => setProf({ ...prof, description: e.target.value })}
          />

          <button type="submit" className={styles.button}>
            GUARDAR CAMBIOS
          </button>
        </form>
      </div>
    </div>
  );
}
