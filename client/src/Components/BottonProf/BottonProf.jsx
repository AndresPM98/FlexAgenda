import { Link } from "react-router-dom";
import { getProfessionalDetail, getProfessionals } from "../../Redux/Actions";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BottonProf.css";

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
    <div>
      {profDetail ? (
        <div>
          <div className="profContainer">
            <Link
              to={`/professionalDetail/${findProfessional?.id}`}
              className="nameLinkProf"
            >
              <div>
                <p className="textProf">Perfil</p>
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
              to={`/profTT/${findProfessional?.id}`}
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
