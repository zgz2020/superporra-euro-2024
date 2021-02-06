import React from 'react'
import { connect } from 'react-redux'
import md5 from 'md5'
import * as mutations from '../../store/mutations'
import { ConnectedHeader } from '../Header'


const emailErrorText = (type, translations) => {
    if (type == 'signIn') return translations.signInPage.emailNotRegistered
    if (type == 'signUp') return translations.signInPage.emailAlreadyRegistered
}

const passwordErrorText = (type, translations) => {
    if (type == 'signIn') return translations.signInPage.wrongPassword
    if (type == 'signUp') return translations.signInPage.noPassword
}

const credentialsForm = (type, submitHandler, authenticated, translations, noEmailMessage, errorMessageEmail, errorMessagePassword, buttonLabel) => (
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

                {noEmailMessage &&  
                    <p className="text-danger font-italic mt-2">{translations.signInPage.noEmail}</p>}

                {errorMessageEmail &&  
                    <p className="text-danger font-italic mt-2">{emailErrorText(type, translations)}</p>}

                {`${translations.signInPage.password}:`}
                <input 
                    type="password" 
                    placeholder={translations.signInPage.passwordPlaceholder}
                    name="password"
                    className="form-control" 
                    data-automation="password-input"
                />

                {errorMessagePassword &&  
                    <p className="text-danger font-italic mt-2">{passwordErrorText(type, translations)}</p>}

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


const LoginPage = ({ 
    requestAuthenticateUser,
    requestCreateUser,
    authenticated,
    translations,
    noEmailSignInMessage,
    noEmailSignUpMessage,
    emailNotRegisteredMessage,
    emailAlreadyRegisteredMessage,
    incorrectPasswordMessage,
    noPasswordMessage,  
}) => (
    <div>
        <ConnectedHeader title={translations.signInPage.title} />

        {credentialsForm('signIn', requestAuthenticateUser, authenticated, translations, noEmailSignInMessage, emailNotRegisteredMessage, incorrectPasswordMessage, translations.signInPage.signIn)}

        <div className="card mt-3">
            <div className="card-header">
                {translations.signInPage.signUpHeader}
            </ div>
        </div>
        {credentialsForm('signUp', requestCreateUser, authenticated, translations, noEmailSignUpMessage, emailAlreadyRegisteredMessage, noPasswordMessage, translations.signInPage.signUp)}

    </div>
)

const mapStateToProps = (state) => {
    let { 
        session,
        translations,
        noEmailSignInMessage,
        noEmailSignUpMessage,
        emailNotRegisteredMessage,
        emailAlreadyRegisteredMessage,
        incorrectPasswordMessage,
        noPasswordMessage,  
    } = state
    let authenticated = session.authenticated

    return {
        authenticated,
        translations,
        noEmailSignInMessage,
        noEmailSignUpMessage,
        emailNotRegisteredMessage,
        emailAlreadyRegisteredMessage,
        incorrectPasswordMessage,
        noPasswordMessage,  
    }
}

const mapDispatchToProps = (dispatch) => {
    let emailAddress = (e) => e.target['emailAddress'].value
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
