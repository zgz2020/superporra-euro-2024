import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConnectedLanguagePicker } from './LanguagePicker'
import * as mutations from '../store/mutations'
import { signIn, signOut } from '../../Auth/Auth'

const hideNavBarResponsive = () => $(".navbar-collapse").collapse('hide')

const navigationOption = (path, clickHandler, label, login) => {

    const itemClass = login ? "nav-item nav-link mr-3 text-primary" : "nav-item nav-link mr-3"

    return (
        <Link 
            className={itemClass}
            to={path} 
            onClick={clickHandler}
            data-automation="nav-item"
        >
            {label}
        </Link>
    )
}

const Navigation = ({ translations, session, signOutRequest }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <ConnectedLanguagePicker />
        <div className="pr-5"></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" data-automation="mobile-nav-toggle-button">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">        
                {navigationOption('/', hideNavBarResponsive, translations.navigation.home)}
                {navigationOption('/participants', hideNavBarResponsive, translations.navigation.participants)}
                {navigationOption('/results', hideNavBarResponsive, translations.navigation.results)}
                {navigationOption('/scoring-rules', hideNavBarResponsive, translations.navigation.scoringRules)}
                {!session.id && 
                    navigationOption('/sign-in', hideNavBarResponsive, translations.navigation.login, true)
                }
                {session.id && 
                    navigationOption('/account', hideNavBarResponsive, translations.navigation.account)
                }
                {session.id && 
                    navigationOption('/', signOutRequest, translations.navigation.logout, true)
                }
            </div>
        </div>
    </nav>
)

const mapStateToProps = (state) => {
    let { translations, session } = state
    return { 
        translations,
        session 
    }
}

const mapDispatchTpProps = (dispatch) => {
    return {
        signOutRequest() {
            hideNavBarResponsive()
            dispatch(mutations.signOutRequest())
        }
    }
}

export const ConnectedNavigation = connect(mapStateToProps, mapDispatchTpProps)(Navigation)