// ------- LOGIN - https://auth0.com/blog/beyond-create-react-app-react-router-redux-saga-and-more/
// export const USER_PROFILE_LOADED = 'USER_PROFILE_LOADED'
// export const GET_LOGGED_USER = 'GET_LOGGED_USER'

// export const userProfileLoaded = ( idToken, expiresAt, userID ) => ({
//     type: USER_PROFILE_LOADED,
//     idToken,
//     expiresAt,
//     userID
// })

// export const getLoggedUser = () => ({
//     type: GET_LOGGED_USER
// })



// -------- express-react-fullsatck authentication -------------------

export const GET_SESSION_STATUS = 'GET_SESSION_STATUS'
export const USER_PROFILE_LOADED_ERF = 'USER_PROFILE_LOADED_ERF'

export const getSessionStatus = () => ({
    type: GET_SESSION_STATUS
})

export const userProfileLoaded_ERF = ( id, authenticated ) => ({
    type: USER_PROFILE_LOADED_ERF,
    id,
    authenticated
})


export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER'
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER'
export const AUTHENTICATING = 'AUTHENTICATING'
export const AUTHENTICATED = 'AUTHENTICATED'
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
export const USERNAME_RESERVED = 'USERNAME_RESERVED'

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
})

export const processAuthenticateUser = (status = AUTHENTICATING, id) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    authenticated: status,
    id
})


export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'

export const signOutRequest = () => ({
    type: SIGN_OUT_REQUEST
})


export const SHOW_WRONG_CREDENTIALS_MESSAGE = 'SHOW_WRONG_CREDENTIALS_MESSAGE'
export const HIDE_WRONG_CREDENTIALS_MESSAGE = 'HIDE_WRONG_CREDENTIALS_MESSAGE'

export const showWrongCredentialsMessage = () => ({
    type: SHOW_WRONG_CREDENTIALS_MESSAGE
})
export const hideWrongCredentialsMessage = () => ({
    type: HIDE_WRONG_CREDENTIALS_MESSAGE
})




// -------- AUTH0 authentication -------------------

export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK'

export const handleAuthenticationCallback = () => ({
    type: HANDLE_AUTHENTICATION_CALLBACK
})

