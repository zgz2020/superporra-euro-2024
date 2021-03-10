import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../../store'
import { ConnectedHeader } from '../Header'
import * as mutations from '../../store/mutations'

const passwordResetTokenExpiredBlock = (translations) => (
    <div className="card">
        <div className="card-body text-center">
            <div className="pt-4">
                {translations.passwordResetPage.passwordResetTokenExpiredText}
            </div>
            <div className="py-4">
                <Link
                    //className={itemClass}
                    to={'/sign-in'} 
                    //onClick={clickHandler}
                    data-automation="nav-item"
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
                        data-automation={'email-error'}
                    >
                        {translations.passwordResetPage.resetPasswordSuccess}
                    </p>
                }

                {resetPasswordErrorMessage &&  
                    <p 
                        className="text-success font-italic mt-2"
                        data-automation={'reset-password-error'}
                    >
                        {translations.passwordResetPage.resetPasswordError}
                    </p>
                }

                <button 
                    type="submit" 
                    className="form-control mt-2 btn btn-primary"
                >
                    {translations.passwordResetPage.resetButton}
                </ button>
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
    <div>
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

    return {
        requestPasswordReset(e) {
            e.preventDefault()
            dispatch(mutations.requestPasswordReset(e.target['password'].value))
            // dispatch action
        }
    }
}

export const ConnectedPasswordResetPage = connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage)
