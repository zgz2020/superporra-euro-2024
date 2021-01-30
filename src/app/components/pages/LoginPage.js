import React from 'react'
import { connect } from 'react-redux'
import md5 from 'md5'
import * as mutations from '../../store/mutations'
import { ConnectedHeader } from '../Header'


const credentialsForm = (submitHandler, authenticated, translations, wrongCredentialsMessage, buttonLabel) => (
    <div className="card">
        <div className="card-body">

            <form onSubmit={submitHandler}>

                {`${translations.signInPage.email}:`}
                <input 
                    type="text" 
                    placeholder={translations.signInPage.emailPlaceholder}
                    name="emailAddress"
                    className="form-control" 
                    data-automation="email-address-input"
                />

                {`${translations.signInPage.password}:`}
                <input 
                    type="password" 
                    placeholder={translations.signInPage.passwordPlaceholder}
                    name="password"
                    className="form-control" 
                    data-automation="password-input"
                />

                {wrongCredentialsMessage &&  
                    <p className="text-danger font-italic mt-2">{translations.signInPage.wrongCredentials}</p>}

                <button 
                    type="submit" 
                    disabled={authenticated === `PROCESSING`} 
                    className="form-control mt-2 btn btn-primary"
                >
                    {buttonLabel}
                </ button>

            </ form>

        </ div>
    </div>
    
)


const LoginPage = ({ requestAuthenticateUser, requestCreateUser, authenticated, translations, wrongCredentialsMessage }) => (
    <div>
        <ConnectedHeader title={translations.signInPage.title} />

        {credentialsForm(requestAuthenticateUser, authenticated, translations, wrongCredentialsMessage, translations.signInPage.signIn)}

        <div className="card mt-3">
            <div className="card-header">
                {translations.signInPage.signUpHeader}
            </ div>
        </div>
        {credentialsForm(requestCreateUser, authenticated, translations, wrongCredentialsMessage, translations.signInPage.signUp)}

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
    let emailAddress = (e) => e.target['emailAddress'].value
    // let password = (e) => e.target['password'].value
    // let passwordHash = (password) => md5(password)
    let passwordHash = (e) => md5(e.target['password'].value)

    return {
        requestAuthenticateUser(e) {
            e.preventDefault()
            dispatch(mutations.requestAuthenticateUser(emailAddress(e), passwordHash(e)))
        },
        requestCreateUser(e) {
            e.preventDefault()
            dispatch(mutations.requestUserCreation(emailAddress(e), passwordHash(e)))
        }
    }
}

export const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
