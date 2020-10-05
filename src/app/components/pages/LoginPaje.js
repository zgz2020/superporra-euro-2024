import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations'
import md5 from 'md5'

const signIn = (requestAuthenticateUser, authenticated, translations, wrongCredentialsMessage) => (
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

        {wrongCredentialsMessage &&  
            <p className="text-danger font-italic mt-2">{translations.signIn.wrongCredentials}</p>}

        <button 
            type="submit" 
            disabled={authenticated === `PROCESSING`} 
            className="form-control mt-2 btn btn-primary"
        >
            {translations.signIn.signIn}
        </ button>

    </ form>
)

const LoginPage = ({ requestAuthenticateUser, authenticated, translations, wrongCredentialsMessage }) => (
    <div className="card">
        <div className="card-body">
            {signIn(requestAuthenticateUser, authenticated, translations, wrongCredentialsMessage)}
        </div>
    </div>
)

const mapStateToProps = (state) => {
    let { session, translations, wrongCredentialsMessage } = state
    let authenticated = session.authenticated
    
    return {
        authenticated,
        translations,
        wrongCredentialsMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestAuthenticateUser(e) {
            e.preventDefault()
            let emailAddress = e.target['emailAddress'].value
            let password = e.target['password'].value
            let passwordHash = md5(password)
            dispatch(mutations.requestAuthenticateUser(emailAddress, passwordHash))
        }
    }
}

export const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
