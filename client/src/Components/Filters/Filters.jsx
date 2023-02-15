import React, { useEffect, useState } from "react";
import { getClients, filterByClient, getTurns, getTurnByName, filterByDate,filterByHour} from "../../Redux/Actions"
import { useDispatch, useSelector} from "react-redux";

const Filters = () => {

    const[input, setInput] = useState('');
    const dispatch = useDispatch();
     const allClients = useSelector(state => state.allClients); 
    const allTurns = useSelector(state => state.allTurns)
    const turns = useSelector(state => state.turns)
    console.log(allTurns);

    function handleFilterByClient(event) {
        event.preventDefault();
        dispatch(getTurns(turns, event.target.value));
        };

    function handleOnChange(e){
        setInput(e.target.value)
    }
    function handleOnClick(e){
        e.preventDefault()
        dispatch(filterByDate(input))
    }

    function handleFilterByHour(event) {
      console.log(event.target.value);
        event.preventDefault();
        dispatch(filterByHour(event.target.value));
        };

    useEffect(() => {
        dispatch(getClients());
        dispatch(getTurns())
        }, [dispatch]);
        
        return( 
        <div>
          <div>
              <select onChange={(event) => handleFilterByClient(event)}>
                <option value="Clients"> Clients </option>
                  {allTurns
                    .sort((a, b) => (a.client.name > b.client.name ? 1 : -1))
                    .map((v) => (
                      <option value={v.id} key={v.id}>{v.client.name}</option>
                    ))}
              </select>
          </div>
          <div>
              <button 
              onClick={handleOnClick} className="ButtonSearch">Search</button>
              <input 
                type='text' 
                onChange={handleOnChange} 
                placeholder='Date...' 
                className="InputSearch">
              </input>
          </div>
          <div>
          <select onChange={(event) => handleFilterByHour(event)}>
                <option value="Hours"> Hours </option>
                  {allTurns
                    .sort((a, b) => (a.hour > b.hour ? 1 : -1)) 
                    .map((v) => (
                      <option value={v.hour} key={v.hour}>{v.hour}</option>
                    ))}
              </select>
          </div>
        </div>
        )
    };

  export default Filters; 