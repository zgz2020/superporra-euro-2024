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

export const emailNotRegisteredMessage = (emailNotRegisteredMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_EMAIL_NOT_REGISTERED_MESSAGE:
            return true
        case mutations.HIDE_EMAIL_NOT_REGISTERED_MESSAGE:
            return false
    }
    return emailNotRegisteredMessage
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
