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

const passwordResetForm = (translations, submitHandler) => (
    <div className="card">
        <div className="card-body">

            <form onSubmit={submitHandler}>

                {/* {`${translations.signInPage.email}:`}
                <input 
                    type="text" 
                    placeholder={translations.signInPage.emailPlaceholder}
                    name="emailAddress"
                    className="form-control" 
                    data-automation="email-address-input"
                />

                <button 
                    type="submit" 
                    // disabled={authenticated === `PROCESSING`} 
                    className="form-control mt-2 btn btn-primary"
                >
                    {translations.passwordResetPage.resetButton}
                </ button> */}


            </form>

        </div>
    </div>
)

const PasswordResetPage = ({ passwordResetTokenExpired, translations, requestPasswordReset }) => (
    <div>
        <ConnectedHeader title={translations.passwordResetPage.title} />

        {passwordResetTokenExpired ?
            passwordResetTokenExpiredBlock(translations)
            :
            passwordResetForm(translations, requestPasswordReset)}
    </div>
)

const mapStateToProps = (state, ownProps) => {
    let { passwordResetTokenExpired, translations } = state

    return { 
        passwordResetTokenExpired,
        translations
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let resetPasswordToken = ownProps.match.params.token
    store.dispatch(mutations.passwordResetTokenStatus(resetPasswordToken))

    return {
        requestPasswordReset(e) {
            e.preventDefault()
            // dispatch action
        }
    }
}

export const ConnectedPasswordResetPage = connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage)
