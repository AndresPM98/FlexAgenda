import { Link } from "react-router-dom";
import { getProfessionalDetail, getProfessionals } from "../../Redux/Actions";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BottonProf.css";

const BotonProf = () => {
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

  const ultimoProfesional = allProfessionals.length ? allProfessionals[0] : "";

  return (
    <div>
      {profDetail ? (
        <div>
          <div className="profContainer">
            <Link
              to={`/professionalDetail/${ultimoProfesional.id}`}
              className="nameLinkProf"
            >
              <div>
                <p className="textProf">Hola {ultimoProfesional.name}</p>
                <iconify-icon
                  icon="healthicons:ui-user-profile-negative"
                  width="60"
                  height="60"
                ></iconify-icon>
              </div>
            </Link>
          </div>
          <div className="profContainer">
            <Link
              to={`/profTT/${ultimoProfesional.id}`}
              className="nameLinkProf"
            >
              <div>
                <p className="textProf">Cliente</p>
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
