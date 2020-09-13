import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConnectedLanguagePicker } from './LanguagePicker'
import { signIn, signOut } from '../../Auth/Auth'

const Navigation = ({ translations, loggedUser }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <ConnectedLanguagePicker />
        <div className="pr-5"></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" data-automation="mobile-nav-toggle-button">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">        
                <Link className="nav-item nav-link mr-3" to="/" data-automation="nav-item">{translations.navigation.home}</Link>
                <Link className="nav-item nav-link mr-3" to="/participants" data-automation="nav-item">{translations.navigation.participants}</Link> 
                <Link className="nav-item nav-link mr-3" to="/results" data-automation="nav-item">{translations.navigation.results}</Link> 
                <Link className="nav-item nav-link mr-3" to="/scoring-rules" data-automation="nav-item">{translations.navigation.scoringRules}</Link> 
                {!loggedUser.userID && 
                    <Link className="nav-item nav-link mr-3 text-primary" to="/" onClick={signIn} data-automation="nav-item">{translations.navigation.login}</Link>
                }
                {loggedUser.userID && 
                    <Link className="nav-item nav-link mr-3" to={`/account`} data-automation="nav-item">{translations.navigation.account}</Link>
                }
                {loggedUser.userID && 
                    <Link className="nav-item nav-link mr-3 text-primary" to='/' onClick={signOut} data-automation="nav-item">{translations.navigation.logout}</Link>
                }
            </div>
        </div>
    </nav>
)

const mapStateToProps = (state) => {
    let { translations, loggedUser } = state
    return { 
        translations,
        loggedUser 
    }
}

export const ConnectedNavigation = connect(mapStateToProps)(Navigation)