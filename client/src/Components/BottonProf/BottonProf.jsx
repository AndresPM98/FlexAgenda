import { Link } from 'react-router-dom' 
import { getProfessionalDetail } from "../../Redux/Actions";
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

const BotonProf = () => {

    const allTurns = useSelector((state) => state.turnBackup);
    const profDetail = useSelector(state => state.profDetail)
console.log(profDetail);

     /* const dispatch = useDispatch(); */

    useEffect(() => {
       /*  dispatch(getProfessionalDetail(allTurns[0].professionalID))  */
            }, [profDetail]); 

/* const {name, id} = profDetail */
  return (
    <div>
        {profDetail?
      <div>
          <div>
             <Link to={`/professionalDetail/${profDetail.id}`} className="nameLink"> 
             <div>
                <p>Hola {profDetail.name}</p>
            </div>
            </Link> 
           
          </div>
      </div>: ""
}
    </div>
    )
}

export default BotonProf;
