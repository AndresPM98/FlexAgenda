import React from "react";
import { getProfessionals } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../Admin.module.css";
import { useState } from "react";
import Loading from "../../../Pages/Loading/Loading";
import axios from "axios";

export default function CardsReviewsAdmin({ id }) {
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getProfessionals()).then(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const reviewsByProfessional = allProfessionals.reduce((acc, professional) => {
    if (professional.name !== "ADMIN") {
      const reviews = professional.review ?? [];
      if (acc[professional.id]) {
        acc[professional.id].push(...reviews);
      } else {
        acc[professional.id] = reviews;
      }
    }
    return acc;
  }, {});

  const professionalScores = {};

  for (const id in reviewsByProfessional) {
    const reviews = reviewsByProfessional[id];
    const totalScores = reviews.reduce(
      (acc, review) => acc + parseInt(review.score),
      0
    );
    const averageScore = Math.ceil(totalScores / reviews.length).toFixed(2);

    professionalScores[id] = averageScore;
  }

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
          professional.name === "ADMIN" ? (
            ""
          ) : (
            <div
              className={style.cardProf}
              style={{ width: "400px", height: "400px", overflow: "scroll" }}
            >
              <h2>{professional.name}</h2>
              <h3>
                Promedio:{" "}
                {isNaN(professionalScores[professional.id])
                  ? 0
                  : professionalScores[professional.id]}{" "}
                ⭐️
              </h3>
              <h3>
                Reviews:{" "}
                {professional.review ? professional.review.length : "0"}
              </h3>
              <h3>
                <hr />
                {professional.review ? (
                  professional.review.map((review) => (
                    <div>
                      <h4>
                        ⭐️ {review.score ? review.score : ""}:{" "}
                        {review.text ? review.text : ""}
                      </h4>
                    </div>
                  ))
                ) : (
                  <div>Todavia no hay devoluciones</div>
                )}
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}
