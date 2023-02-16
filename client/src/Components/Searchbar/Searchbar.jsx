import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {getClientByName, getTurnByName} from '../../Redux/Actions';

export default function Search(){
    const[input, setInput] = useState('');
    const dispatch = useDispatch();

    function handleOnChange(e){
        setInput(e.target.value)
    }
    function handleOnClick(e){
        e.preventDefault()
        dispatch(getTurnByName(input))
    }
    return (
        <div>
        <button 
        onClick={handleOnClick} className="ButtonSearch">Search</button>
        <input 

        type='text'
        value={input} 
        onChange={handleOnChange} 
        placeholder='Client...' 
        className="InputSearch">

        </input>
    </div>
     )
}


