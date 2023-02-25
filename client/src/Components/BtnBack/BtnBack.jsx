import React from "react";
import { Link } from "react-router-dom";
import style from "./BtnBack.module.css";
import { useParams } from "react-router-dom";

export default function BtnBack() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <Link to={`/home/${id}`}>
        <div className={style.btnvolver}>

      <iconify-icon
            icon="ion:arrow-back-circle"
            width="40"
            height="30"
            ></iconify-icon>
            VOLVER
            </div>
      </Link>
    </div>
  );
}
