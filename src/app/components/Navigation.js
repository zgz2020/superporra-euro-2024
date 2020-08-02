import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConnectedLanguagePicker } from './LanguagePicker'

const Navigation = ({ translations }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <ConnectedLanguagePicker />
        <div className="pr-5"></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" data-automation="mobile-nav-toggle-button">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">        
                <Link className="nav-item nav-link" to="/" data-automation="nav-item">{translations.navigation.home}</Link>
                <Link className="nav-item nav-link" to="/participants" data-automation="nav-item">{translations.navigation.participants}</Link> 
                <Link className="nav-item nav-link" to="/results" data-automation="nav-item">{translations.navigation.results}</Link> 
                <Link className="nav-item nav-link" to="/scoring-rules" data-automation="nav-item">{translations.navigation.scoringRules}</Link> 
                {/* <Link className="nav-item nav-link" to="/login" data-automation="nav-item">Iniciar sesión</Link> */}
            </div>
        </div>
    </nav>
)

const mapStateToProps = (state) => {
    let { translations } = state
    return { translations }
}

export const ConnectedNavigation = connect(mapStateToProps)(Navigation)