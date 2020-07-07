import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => (
    <div className="navbar">
        <Link to="/" data-automation="nav-item">Inicio</Link> 
        {" | "}
        <Link to="/participants" data-automation="nav-item">Participantes</Link> 
        {" | "}
        <Link to="/results" data-automation="nav-item">Resultados</Link> 
        {/* {" | "}
        <Link to="/login">Iniciar sesión</Link>  */}
    </div>
)