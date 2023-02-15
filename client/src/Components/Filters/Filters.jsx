import React, { useEffect } from "react";
import { getClients, filterByClient} from "../../Redux/Actions"
import { useDispatch, useSelector} from "react-redux";

const Filters = () => {

    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients);
    const allClients = useSelector(state => state.allClients);

    function handleFilterByClient(event) {
        event.preventDefault();
        dispatch(filterByClient(event.target.value));
        };

    useEffect(() => {
        dispatch(getClients());
        }, [dispatch]);
        
        return clients? ( 
            
         <div>
            <select onChange={(event) => handleFilterByClient(event)}>
              <option value="Clients"> Clients </option>
                {allClients
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((v) => (
                    <option value={v.id} key={v.id}>{v.name}</option>
                  ))}
            </select>
         </div>
         
        ): (
            <div>Hola</div>
        )
    };

  export default Filters;