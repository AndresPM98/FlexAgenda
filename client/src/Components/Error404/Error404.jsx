import React from 'react';
import "./Error404.css"

export default function Error404(props) {
    return (
        <div class="error-container">
  <h1 className='errorh1'>¡Oops! Página no encontrada</h1>
  <p className='errorp'>Lo sentimos, la página "{props.match.params.any}" no existe o se ha movido.</p>
  <a className='errora' href="/">Volver al inicio</a>
</div>
    );
    }