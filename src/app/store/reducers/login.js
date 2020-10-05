import * as mutations from '../mutations'
import { defaultState } from '../../../server/defaultState'

export const loggedUser = (loggedUser = {}, action) => {
    switch (action.type) {
        case mutations.USER_PROFILE_LOADED:
            return { 
                ...loggedUser, 
                userID: action.userID,
                expiresAt: action.expiresAt,
                idToken: action.idToken
            }
    }
    return loggedUser
}

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

export const wrongCredentialsMessage = (wrongCredentialsMessage = false, action) => {
    switch(action.type) {
        case mutations.SHOW_WRONG_CREDENTIALS_MESSAGE:
            return true
        case mutations.HIDE_WRONG_CREDENTIALS_MESSAGE:
            return false
    }
    return wrongCredentialsMessage
}