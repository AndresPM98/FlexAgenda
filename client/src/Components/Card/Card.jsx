import React from 'react'
import { NavLink } from 'react-router-dom'
import './Card.css';

const Card = ({ name, date, hour, id }) => {

  return (
    <div className='cardsContainer'>
      <div className='card'>
          <div className='name'>
            <NavLink to={`/queryDetail/${id}`} className="nameLink">{name}</NavLink>
          </div>
          <div className='info'>
            <p>{date}</p>
            <p>{hour}</p>
          </div>
      </div>
    </div>
  )
}

export default Card
