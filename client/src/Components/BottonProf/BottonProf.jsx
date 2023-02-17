import { Link } from 'react-router-dom' 
import { getProfessionalDetail } from "../../Redux/Actions";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BottonProf.css"

const BotonProf = () => {
  const dispatch = useDispatch(); 
  const allTurns = useSelector((state) => state.turnBackup);
  const profDetail = useSelector(state => state.profDetail);
  console.log(allTurns);

  useEffect(() => {
    if (allTurns.length > 0) {
      dispatch(getProfessionalDetail(allTurns[0].professionalID));
    }
  }, [dispatch, allTurns]);

  return (
    <div>
      {profDetail ?
        <div>
          <div className='profContainer'>
            <Link to={`/professionalDetail/${profDetail.id}`} className="nameLinkProf"> 
              <div>
                <p className='textProf'>Hola {profDetail.name}</p>
                <iconify-icon icon="healthicons:ui-user-profile-negative" width="60" height="60"></iconify-icon>
              </div>
            </Link> 
          </div>
          <div className='profContainer'>
            <Link to={`/professionalDetail/${profDetail.id}`} className="nameLinkProf"> 
              <div>
                <p className='textProf'>Cliente</p>
                <iconify-icon icon="healthicons:ui-user-profile-negative" width="60" height="60"></iconify-icon>
              </div>
            </Link> 
          </div>
        </div>
        : ""
      }
    </div>
  );
}

export default BotonProf;
