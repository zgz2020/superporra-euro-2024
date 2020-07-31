import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConnectedLanguagePicker } from './LanguagePicker'

const Navigation = ({ translations }) => (
    <div className="navbar">
        <ConnectedLanguagePicker />
        {" | "}
        <Link to="/" data-automation="nav-item">{translations.navigation.home}</Link> 
        {" | "}
        <Link to="/participants" data-automation="nav-item">{translations.navigation.participants}</Link> 
        {" | "}
        <Link to="/results" data-automation="nav-item">{translations.navigation.results}</Link> 
        {" | "}
        <Link to="/scoring-rules" data-automation="nav-item">{translations.navigation.scoringRules}</Link> 
        {/* {" | "}
        <Link to="/login">Iniciar sesión</Link>  */}
    </div>
)

const mapStateToProps = (state) => {
    let { translations } = state
    return { translations }
}

export const ConnectedNavigation = connect(mapStateToProps)(Navigation)