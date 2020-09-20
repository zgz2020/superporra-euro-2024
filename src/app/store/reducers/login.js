import * as mutations from '../mutations'

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
