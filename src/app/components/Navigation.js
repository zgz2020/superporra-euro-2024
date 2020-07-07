import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => (
    <div className="navbar">
        <Link to="/">Inicio</Link> 
        {" | "}
        <Link to="/participants">Participantes</Link> 
        {" | "}
        <Link to="/results">Resultados</Link> 
        {/* {" | "}
        <Link to="/login">Iniciar sesión</Link>  */}
    </div>
)