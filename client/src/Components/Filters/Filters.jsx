import React, { useEffect } from "react";
import { getClients, filterByClient} from "../../Redux/Actions"
import { useDispatch, useSelector} from "react-redux";

const Filters = () => {

    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients);

    function handleFilterByClient(event) {
        dispatch(filterByClient(event.target.value));
        };

    useEffect(() => {
        dispatch(getClients());
        }, [dispatch]);
        
        return (

         <div>
            <select onChange={(e) => handleFilterByClient(e)}>
              <option value="Clients"> Clients </option>
                {clients
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((v) => (
                    <option value={v.id}>{v.name}</option>
                  ))}
            </select>
         </div>
        )
    };
  export default Filters;