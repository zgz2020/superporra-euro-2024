import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ConnectedLanguagePicker } from './LanguagePicker'
import * as mutations from '../store/mutations'
import { signIn, signOut } from '../../Auth/Auth'


const Navigation = ({ translations, session, signOutRequest, hideNavBarResponsive }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <ConnectedLanguagePicker />
        <div className="pr-5"></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" data-automation="mobile-nav-toggle-button">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">        
                <Link className="nav-item nav-link mr-3" to="/" onClick={hideNavBarResponsive} data-automation="nav-item">{translations.navigation.home}</Link>
                <Link className="nav-item nav-link mr-3" to="/participants" onClick={hideNavBarResponsive} data-automation="nav-item">{translations.navigation.participants}</Link> 
                <Link className="nav-item nav-link mr-3" to="/results" onClick={hideNavBarResponsive} data-automation="nav-item">{translations.navigation.results}</Link> 
                <Link className="nav-item nav-link mr-3" to="/scoring-rules" onClick={hideNavBarResponsive} data-automation="nav-item">{translations.navigation.scoringRules}</Link> 
                {!session.id && 
                    <Link className="nav-item nav-link mr-3 text-primary" to="/sign-in" onClick={hideNavBarResponsive} data-automation="nav-item">{translations.navigation.login}</Link>
                }
                {session.id && 
                    <Link className="nav-item nav-link mr-3" to={`/account`} onClick={hideNavBarResponsive} data-automation="nav-item">{translations.navigation.account}</Link>
                }
                {session.id && 
                    <Link className="nav-item nav-link mr-3 text-primary" to='/' onClick={signOutRequest} data-automation="nav-item">{translations.navigation.logout}</Link>
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
        signOutRequest(e) {
            $(".navbar-collapse").collapse('hide')
            dispatch(mutations.signOutRequest())
        },
        hideNavBarResponsive(e) {
            $(".navbar-collapse").collapse('hide')
        }
    }
}

export const ConnectedNavigation = connect(mapStateToProps, mapDispatchTpProps)(Navigation)