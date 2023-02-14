import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ name, email, dni, id }) => {

  return (
    <div>
        <Link to={`/queryDetail/${id}`} className="Link">
            <h3>{name}</h3>
        </Link>
            <p>{email}</p>
            <p>{dni}</p>
    </div>
  )
}

export default Card
