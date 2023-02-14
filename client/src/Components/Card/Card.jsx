import React from 'react'

const Card = ({ name, email, dni }) => {

  return (
    <div>

        <h3>{name}</h3>
        <p>{email}</p>
        <p>{dni}</p>
      
    </div>
  )
}

export default Card
