import * as mutations from '../mutations'
import { defaultState } from '../../../server/defaultState'

export const session = (userSession = defaultState.session, action) => {
    let { type, authenticated, id } = action

    switch(type) {
        case mutations.USER_PROFILE_LOADED_ERF:
            return { 
                ...userSession, 
                id,
                authenticated
            }
        case mutations.REQUEST_AUTHENTICATE_USER:
            return { ...userSession, authenticated: mutations.AUTHENTICATING }
        case mutations.PROCESSING_AUTHENTICATE_USER:
            return { ...userSession, id, authenticated }
        default:
            return userSession
    }
}



export const noEmailSignInMessage = (noEmailSignInMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_NO_EMAIL_SIGN_IN_MESSAGE:
            return true
        case mutations.HIDE_NO_EMAIL_SIGN_IN_MESSAGE:
            return false
    }
    return noEmailSignInMessage
}

export const invalidEmailSignUpMessage = (invalidEmailSignUpMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_INVALID_EMAIL_SIGN_UP_MESSAGE:
            return true
        case mutations.HIDE_INVALID_EMAIL_SIGN_UP_MESSAGE:
            return false
    }
    return invalidEmailSignUpMessage
}

export const noEmailForgotPasswordMessage = (noEmailForgotPasswordMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_NO_EMAIL_FORGOT_PASSWORD_MESSAGE:
            return true
        case mutations.HIDE_NO_EMAIL_FORGOT_PASSWORD_MESSAGE:
            return false
    }
    return noEmailForgotPasswordMessage
}

export const emailNotRegisteredSignInMessage = (emailNotRegisteredSignInMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_EMAIL_NOT_REGISTERED_MESSAGE:
            return true
        case mutations.HIDE_EMAIL_NOT_REGISTERED_MESSAGE:
            return false
    }
    return emailNotRegisteredSignInMessage
}

export const emailNotRegisteredForgotPasswordMessage = (emailNotRegisteredForgotPasswordMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE:
            return true
        case mutations.HIDE_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE:
            return false
    }
    return emailNotRegisteredForgotPasswordMessage
}

export const resetPasswordEmailSentMessage = (resetPasswordEmailSentMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_RESET_PASSWORD_EMAIL_SENT_MESSAGE:
            return true
        case mutations.HIDE_RESET_PASSWORD_EMAIL_SENT_MESSAGE:
            return false
    }
    return resetPasswordEmailSentMessage
}

export const resetPasswordEmailErrorMessage = (resetPasswordEmailErrorMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_RESET_PASSWORD_EMAIL_ERROR_MESSAGE:
            return true
        case mutations.HIDE_RESET_PASSWORD_EMAIL_ERROR_MESSAGE:
            return false
    }
    return resetPasswordEmailErrorMessage
}

export const emailAlreadyRegisteredMessage = (emailAlreadyRegisteredMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_EMAIL_ALREADY_REGISTERED_MESSAGE:
            return true
        case mutations.HIDE_EMAIL_ALREADY_REGISTERED_MESSAGE:
            return false
    }
    return emailAlreadyRegisteredMessage
}

export const incorrectPasswordMessage = (incorrectPasswordMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_INCORRECT_PASSWORD_MESSAGE:
            return true
        case mutations.HIDE_INCORRECT_PASSWORD_MESSAGE:
            return false
    }
    return incorrectPasswordMessage
}

export const noPasswordMessage = (noPasswordMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_NO_PASSWORD_MESSAGE:
            return true
        case mutations.HIDE_NO_PASSWORD_MESSAGE:
            return false
    }
    return noPasswordMessage
}

export const passwordResetTokenExpired = (passwordResetTokenExpired = true, action) => {
    switch(action.type) {
        case mutations.PASSWORD_RESET_TOKEN_VALID:
            return false
        case mutations.PASSWORD_RESET_TOKEN_EXPIRED:
            return true
    }
    return passwordResetTokenExpired
}

export const resetPasswordSuccessMessage = (resetPasswordSuccessMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_RESET_PASSWORD_SUCCESS_MESSAGE:
            return true
        case mutations.HIDE_RESET_PASSWORD_SUCCESS_MESSAGE:
            return false
    }
    return resetPasswordSuccessMessage
}

export const resetPasswordErrorMessage = (resetPasswordErrorMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_RESET_PASSWORD_ERROR_MESSAGE:
            return true
        case mutations.HIDE_RESET_PASSWORD_ERROR_MESSAGE:
            return false
    }
    return resetPasswordErrorMessage
}