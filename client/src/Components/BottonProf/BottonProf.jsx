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

  return (
    <div  className={style.profContainer}>
      {profDetail ? (
        <div>
          <div>
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
