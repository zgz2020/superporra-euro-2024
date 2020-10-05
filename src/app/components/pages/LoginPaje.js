import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations'
import { translations } from '../../store/reducers/language'

const signIn = (requestAuthenticateUser, authenticated, translations) => (
    <form onSubmit={requestAuthenticateUser}>

        {`${translations.signIn.email}:`}
        <input 
            type="text" 
            placeholder={translations.signIn.emailPlaceholder}
            name="emailAddress"
            className="form-control" 
            data-automation="email-address-input"
        />

        {`${translations.signIn.password}:`}
        <input 
            type="password" 
            placeholder={translations.signIn.passwordPlaceholder}
            name="password"
            className="form-control" 
            data-automation="password-input"
        />

        {authenticated === mutations.NOT_AUTHENTICATED ? 
            <p className="text-danger font-italic mt-2">{translations.signIn.wrongCredentials}</p>
            :
            null
        }

        <button 
            type="submit" 
            disabled={authenticated === `PROCESSING`} 
            className="form-control mt-2 btn btn-primary"
        >
            {translations.signIn.signIn}
        </ button>

    </ form>
)

const LoginPage = ({ requestAuthenticateUser, authenticated, translations }) => (
    <div className="card">
        <div className="card-body">
            {signIn(requestAuthenticateUser, authenticated, translations)}
        </div>
    </div>
)

const mapStateToProps = (state) => {
    let { session, translations } = state
    let authenticated = session.authenticated
    
    return {
        authenticated,
        translations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAuthenticateUser(e) {
            e.preventDefault()
            let emailAddress = e.target['emailAddress'].value
            let password = e.target['password'].value
            dispatch(mutations.requestAuthenticateUser(emailAddress, password))
        }
    }
}

export const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
