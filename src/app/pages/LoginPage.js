import React from 'react'
import md5 from 'md5'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as mutations from '../store/mutations'
import { ConnectedHeader } from '../components/Header'


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
                        data-automation= {type == 'signUp' 
                            ? 'invalid-email-message-signUp'
                            : `no-email-message-${type}`}
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
                        className="text-danger font-italic mt-2"
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
    invalidEmailSignUpMessage,
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

        <div className="card mt-3 tab-card mb-5">
            <div className="card-header tab-card-header">
                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="sign-in-tab" data-toggle="tab" href="#sign-in-panel" role="tab" aria-controls="Sign-in-panel" aria-selected="true">
                            {translations.signInPage.signIn}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="sign-up-tab" data-toggle="tab" href="#sign-up-panel" role="tab" aria-controls="Sign-up-panel" aria-selected="false">
                            {translations.navigation.join}
                        </a>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active p-3" id="sign-in-panel" role="tabpanel" aria-labelledby="sign-in-tab">
                    {credentialsForm(
                        'signIn', 
                        requestAuthenticateUser, 
                        translations, 
                        noEmailSignInMessage, 
                        emailNotRegisteredSignInMessage, 
                        null, 
                        null, 
                        translations.signInPage.signIn, 
                        authenticated, 
                        incorrectPasswordMessage
                    )}           
                </div>
                <div className="tab-pane fade p-3" id="sign-up-panel" role="tabpanel" aria-labelledby="sign-up-tab">
                    <div className="card">
                        <div className="card-body">
                            {translations.signInPage.joinDescription1}
                            <Link 
                                to={"/join"}
                                data-automation="join-link"
                            >
                                {translations.navigation.join}
                            </Link>
                            {translations.signInPage.joinDescription2}
                        </div>

                    </div>
                </div>
            </div>

            <div className="card-footer">
                <a className="nav-link" data-toggle="collapse" href="#forgot-password-form" role="button" aria-expanded="false" aria-controls="forgot-password-form">{translations.signInPage.forgotPasswordHeader}</a>
            </div>
            <div className="card-body collapse" id="forgot-password-form">
                {credentialsForm(
                    'forgotPassword', 
                    requestForgotPasswordEmail, 
                    translations, 
                    noEmailForgotPasswordMessage, 
                    emailNotRegisteredForgotPasswordMessage, 
                    resetPasswordEmailSentMessage, 
                    resetPasswordEmailErrorMessage, 
                    translations.signInPage.sendPasswordResetEmail
                )} 
            </div>
        </div>

    </div>
)

const mapStateToProps = (state) => {
    let { 
        session,
        translations,
        noEmailSignInMessage,
        invalidEmailSignUpMessage,
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
        invalidEmailSignUpMessage,
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
