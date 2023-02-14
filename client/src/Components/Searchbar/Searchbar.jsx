import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {getClientByName} from '../../Redux/Actions';

export default function Search(){
    const[input, setInput] = useState('');
    const dispatch = useDispatch();

    function handleOnChange(e){
        setInput(e.target.value)
    }
    function handleOnClick(e){
        e.preventDefault()
        dispatch(getClientByName(input))
    }
    return (
        <div>
        <button 
        onClick={handleOnClick} className="ButtonSearch">Search</button>
        <input 

        type='text' 
        onChange={handleOnChange} 
        placeholder='Client...' 
        className="InputSearch">

        </input>
    </div>
     )
}


