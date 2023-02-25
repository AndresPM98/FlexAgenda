import { Link } from "react-router-dom";
import { getProfessionalDetail, getProfessionals } from "../../Redux/Actions";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./BottonProf.module.css";

const BotonProf = ({ id }) => {
  const dispatch = useDispatch();
  const allTurns = useSelector((state) => state.turnBackup);
  const profDetail = useSelector((state) => state.profDetail);

  useEffect(() => {
    if (allTurns.length) {
      dispatch(getProfessionalDetail(allTurns[0].professionalID));
      dispatch(getProfessionals());
    }
  }, [dispatch, allTurns]);

  const allProfessionals = useSelector((state) => state.allProfessionals);

  const findProfessional = allProfessionals.find((prof) => id === prof.id);

  const copyLink = () => {
    const el = document.createElement("textarea");
    el.value = `http://localhost:3000/profTT/${findProfessional?.id}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Enlace copiado");
  };

  return (
    <div className={style.profContainer}>
      {profDetail ? (
        <div>
          <div>
            <div className={style.nameLinkProf}>
              <button className={style.copybtn} onClick={copyLink}>
                Copiar enlace
              </button>
            </div>

            <Link
              to={`/professionalDetail/${findProfessional?.id}`}
              className={style.nameLinkProf}
            >
              <div>
                <p className={style.textProf}>Perfil</p>
                <iconify-icon
                  icon="healthicons:ui-user-profile-negative"
                  width="60"
                  height="60"
                ></iconify-icon>
              </div>
            </Link>
          </div>
          
          <div>
            <Link
              to={`/Calendarpage/${findProfessional?.id}`}
              className={style.nameLinkProf}
            >
              <div>
                <p className={style.textProf}>Calendar</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 8 8"
                  style={{marginLeft: "10px"}}       
                >
                  <path
                    fill="currentColor"
                    d="M0 0v2h7V0H0zm0 3v4.91c0 .05.04.09.09.09H6.9c.05 0 .09-.04.09-.09V3h-7zm1 1h1v1H1V4zm2 0h1v1H3V4zm2 0h1v1H5V4zM1 6h1v1H1V6zm2 0h1v1H3V6z"
                  />
                </svg>
              </div>
            </Link>
          </div>

          <div>
            <Link
              to={`/profTT/${findProfessional?.id}`}
              className={style.nameLinkProf}
            >
              <div>
                <p className={style.textProf}>Cliente</p>
                <iconify-icon
                  icon="healthicons:ui-user-profile-negative"
                  width="60"
                  height="60"
                ></iconify-icon>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BotonProf;
