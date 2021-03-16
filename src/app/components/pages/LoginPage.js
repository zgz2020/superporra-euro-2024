import React from 'react'
import { connect } from 'react-redux'
import md5 from 'md5'
import * as mutations from '../../store/mutations'
import { ConnectedHeader } from '../Header'


const emailErrorText = (type, translations) => {
    if (['signIn', 'forgotPassword'].includes(type)) return translations.signInPage.emailNotRegistered

    if (type == 'signUp') return translations.signInPage.emailAlreadyRegistered
}

const passwordErrorText = (type, translations) => {
    if (type == 'signIn') return translations.signInPage.wrongPassword
    if (type == 'signUp') return translations.signInPage.noPassword
}

const credentialsForm = (type, submitHandler, translations, noEmailMessage, errorMessageEmail, resetPasswordEmailSentMessage, resetPasswordEmailErrorMessage, buttonLabel, authenticated, errorMessagePassword) => (
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
                    <p 
                        className="text-danger font-italic mt-2"
                        data-automation={`no-email-message-${type}`}
                    >
                        {translations.signInPage.noEmail}
                    </p>
                }

                {errorMessageEmail &&  
                    <p 
                        className="text-danger font-italic mt-2"
                        data-automation={`email-error-${type}`}
                    >
                        {emailErrorText(type, translations)}
                    </p>
                }

                {resetPasswordEmailSentMessage &&  
                    <p 
                        className="text-success font-italic mt-2"
                        data-automation={'password-reset-email-sent'}
                    >
                        {translations.signInPage.resetPasswordEmailSent}
                    </p>
                }

                {resetPasswordEmailErrorMessage &&  
                    <p 
                        className="text-success font-italic mt-2"
                        data-automation={`email-error-${type}`}
                    >
                        {translations.signInPage.resetPasswordEmailError}
                    </p>
                }

                {type != "forgotPassword"  && 
                    <div>
                        {`${translations.signInPage.password}:`}
                        <input 
                            type="password" 
                            placeholder={translations.signInPage.passwordPlaceholder}
                            name="password"
                            className="form-control" 
                            data-automation="password-input"
                        />

                        {errorMessagePassword &&  
                            <p 
                                className="text-danger font-italic mt-2"
                                data-automation={`password-error-${type}`}
                            >
                                {passwordErrorText(type, translations)}
                            </p>
                        }
                    </div>
                }

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
    noEmailForgotPasswordMessage,
    emailNotRegisteredSignInMessage,
    emailNotRegisteredForgotPasswordMessage,
    resetPasswordEmailSentMessage,
    resetPasswordEmailErrorMessage,
    emailAlreadyRegisteredMessage,
    incorrectPasswordMessage,
    noPasswordMessage,  
    requestForgotPasswordEmail
}) => (
    <div>
        <ConnectedHeader title={translations.signInPage.title} />

        {credentialsForm('signIn', requestAuthenticateUser, translations, noEmailSignInMessage, emailNotRegisteredSignInMessage, null, null, translations.signInPage.signIn, authenticated, incorrectPasswordMessage)}

        <div className="card mt-3">
            <div className="card-header">
                {translations.signInPage.signUpHeader}
            </ div>
        </div>
        {credentialsForm('signUp', requestCreateUser, translations, noEmailSignUpMessage, emailAlreadyRegisteredMessage, null, null, translations.signInPage.signUp, null, noPasswordMessage)}

        <div className="card mt-3">
            <div className="card-header">
                {translations.signInPage.forgotPasswordHeader}
            </ div>
        </div>
        {credentialsForm('forgotPassword', requestForgotPasswordEmail, translations, noEmailForgotPasswordMessage, emailNotRegisteredForgotPasswordMessage, resetPasswordEmailSentMessage, resetPasswordEmailErrorMessage, translations.signInPage.sendPasswordResetEmail)}
    </div>
)

const mapStateToProps = (state) => {
    let { 
        session,
        translations,
        noEmailSignInMessage,
        noEmailSignUpMessage,
        noEmailForgotPasswordMessage,
        emailNotRegisteredSignInMessage,
        emailNotRegisteredForgotPasswordMessage,
        resetPasswordEmailSentMessage,
        resetPasswordEmailErrorMessage,
        emailAlreadyRegisteredMessage,
        incorrectPasswordMessage,
        noPasswordMessage
    } = state
    let authenticated = session.authenticated

    return {
        authenticated,
        translations,
        noEmailSignInMessage,
        noEmailSignUpMessage,
        noEmailForgotPasswordMessage,
        emailNotRegisteredSignInMessage,
        emailNotRegisteredForgotPasswordMessage,
        resetPasswordEmailSentMessage,
        resetPasswordEmailErrorMessage,
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
        },
        requestForgotPasswordEmail(e) {
            e.preventDefault()
            dispatch(mutations.requestForgotPasswordEmail(emailAddress(e)))
        }
    }
}

export const ConnectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage)
