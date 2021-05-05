import React from 'react'
import md5 from 'md5'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../store'
import { ConnectedHeader } from '../components/Header'
import * as mutations from '../store/mutations'

const passwordResetTokenExpiredBlock = (translations) => (
    <div className="card" data-automation="password-reset-token-expired-block">
        <div className="card-body text-center">
            <div className="pt-4">
                {translations.passwordResetPage.passwordResetTokenExpiredText}
            </div>
            <div className="py-4">
                <Link
                    to={'/sign-in'} 
                    data-automation="request-new-token"
                >
                    {translations.passwordResetPage.passwordResetTokenExpiredButton}
                </Link>
            </div> 
        </div>
        
    </div>
)

const passwordResetForm = (
    translations,
    submitHandler,
    errorMessagePassword,
    resetPasswordSuccessMessage,
    resetPasswordErrorMessage
) => (
    <div className="card">
        <div className="card-body">

            <form onSubmit={submitHandler}>
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
                        data-automation={'password-error'}
                    >
                        {translations.signInPage.noPassword}
                    </p>
                }

                {resetPasswordSuccessMessage && 
                    <p 
                        className="text-success font-italic mt-2"
                        data-automation={'password-reset-success'}
                    >
                        {translations.passwordResetPage.resetPasswordSuccess}
                        <Link
                            className="ml-2 ps-3 btn btn-primary"
                            to={'/sign-in'} 
                            data-automation="sign-in"
                        >
                            {translations.signInPage.signIn}
                        </Link>
                    </p>
                }

                {resetPasswordErrorMessage &&  
                    <p 
                        className="text-danger font-italic mt-2"
                        data-automation={'password-reset-error'}
                    >
                        {translations.passwordResetPage.resetPasswordError}
                    </p>
                }

                {!resetPasswordSuccessMessage &&
                    <button 
                        type="submit" 
                        className="form-control mt-2 btn btn-primary"
                    >
                        {translations.passwordResetPage.resetButton}
                    </ button>
                }
                {/* <button 
                    type="submit" 
                    className="form-control mt-2 btn btn-primary"
                >
                    {translations.passwordResetPage.resetButton}
                </ button> */}
            </form>

        </div>
    </div>
)

const PasswordResetPage = ({ 
    passwordResetTokenExpired,
    translations,
    requestPasswordReset,
    noPasswordMessage,
    resetPasswordSuccessMessage,
    resetPasswordErrorMessage 
}) => (
    <div className="mb-5">
        <ConnectedHeader title={translations.passwordResetPage.title} />

        {passwordResetTokenExpired ?
            passwordResetTokenExpiredBlock(translations)
            :
            passwordResetForm(
                translations,
                requestPasswordReset,
                noPasswordMessage,
                resetPasswordSuccessMessage,
                resetPasswordErrorMessage
            )}
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { 
        passwordResetTokenExpired,
        noPasswordMessage,
        resetPasswordSuccessMessage,
        resetPasswordErrorMessage,
        translations
    } = state

    return { 
        passwordResetTokenExpired,
        noPasswordMessage,
        resetPasswordSuccessMessage,
        resetPasswordErrorMessage,
        translations
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let resetPasswordToken = ownProps.match.params.token
    store.dispatch(mutations.passwordResetTokenStatus(resetPasswordToken))
    let passwordHash = (e) => md5(e.target['password'].value)

    return {
        requestPasswordReset(e) {
            e.preventDefault()
            dispatch(mutations.requestPasswordReset(resetPasswordToken, passwordHash(e)))
        }
    }
}

export const ConnectedPasswordResetPage = connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage)
