import React from 'react';
import './BlockedPage.css';
import { Link } from 'react-router-dom';

function BlockedPage() {
    return (
        <div className="blocked-account">
          <div className="blocked-account-content">
            <h1 className="blocked-account-heading">Tu cuenta ha sido bloqueada por un administrador</h1>
            <p className="blocked-account-text">Por favor, ponte en contacto para más información.</p>
            <Link to="/">
            <h1 style={{textDecoration:"none", color:"black"}}>Volver</h1>
            </Link>
          </div>
        </div>
      );
    }

export default BlockedPage;