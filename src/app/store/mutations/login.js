// ------- LOGIN - https://auth0.com/blog/beyond-create-react-app-react-router-redux-saga-and-more/
export const USER_PROFILE_LOADED = 'USER_PROFILE_LOADED'
export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK'
export const GET_LOGGED_USER = 'GET_LOGGED_USER'

export const userProfileLoaded = ( idToken, expiresAt, userID ) => ({
    type: USER_PROFILE_LOADED,
    idToken,
    expiresAt,
    userID
})

export const handleAuthenticationCallback = () => ({
    type: HANDLE_AUTHENTICATION_CALLBACK
})

export const getLoggedUser = () => ({
    type: GET_LOGGED_USER
})