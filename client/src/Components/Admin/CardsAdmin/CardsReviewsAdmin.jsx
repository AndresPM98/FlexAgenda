import React from "react";
import { getProfessionals } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../Admin.module.css";
import { useState } from "react";
import Loading from "../../../Pages/Loading/Loading";
import axios  from "axios";


export default function CardsReviewsAdmin() {
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const dispatch = useDispatch();
const [loading, setLoading] = useState(true);
  console.log(
    allProfessionals.map((professional) =>
      professional.name === "ADMIN"
        ? ""
        : professional.review.map((review) => review == null ? review= "" : "")
    )
  );

  useEffect(() => {
    dispatch(getProfessionals()).then(() => setLoading(false));
  }, []);

  

  if (loading) return <Loading />;

  const reviews = allProfessionals
  .flatMap((professional) => professional.review ?? []) 
  .map((review) => review === null ? { score: 0 } : review);  

  const totalScores = reviews.reduce((acc, review) => acc + parseInt(review.score), 0); 
  const averageScore = totalScores / reviews.length;

  return (
    <div className={style.adminpage}>
      <h1>Dashboard admin</h1>
      <Link
        to={`/allProfessionalsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}
      >
        <button className={style.adminbutton}>Profesionales</button>
      </Link>
      <Link
        to={`/allClientsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}
      >
        <button className={style.adminbutton}>Clientes</button>
      </Link>
      <Link
        to={`/allReviewsDashboardAdmin/16aa4db8-b8cf-43bf-989a-5c7945212080`}
      >
        <button className={style.adminbutton}>Reviews</button>
      </Link>
      <h1>Reviews</h1>
      <div className={style.cardcontainer}>
        {allProfessionals.map((professional) =>
          professional.name === "ADMIN" ? "" : (
            <div
              className={style.cardProf}
              style={{ width: "400px", height: "400px", overflow: "scroll" }}
            >
              <h2>{professional.name}</h2>
              <h3>Promedio: {averageScore} ⭐️</h3>
              <h3>
                <hr />
                {professional.review.map((review) => (
                  review === null ? review = "" :
                  <div>
                    ⭐️ {review.score}: {review.text} 
                    
                    <br />
                    <br />
                  </div>
                ))}
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}
