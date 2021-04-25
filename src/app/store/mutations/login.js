export const GET_SESSION_STATUS = 'GET_SESSION_STATUS'
export const USER_PROFILE_LOADED_ERF = 'USER_PROFILE_LOADED_ERF'

export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER'
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER'
export const AUTHENTICATING = 'AUTHENTICATING'
export const AUTHENTICATED = 'AUTHENTICATED'
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
export const USERNAME_RESERVED = 'USERNAME_RESERVED'

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'

export const SHOW_NO_EMAIL_SIGN_IN_MESSAGE = 'SHOW_NO_EMAIL_SIGN_IN_MESSAGE'
export const HIDE_NO_EMAIL_SIGN_IN_MESSAGE = 'HIDE_NO_EMAIL_SIGN_IN_MESSAGE'
export const SHOW_INVALID_EMAIL_SIGN_UP_MESSAGE = 'SHOW_INVALID_EMAIL_SIGN_UP_MESSAGE'
export const HIDE_INVALID_EMAIL_SIGN_UP_MESSAGE = 'HIDE_INVALID_EMAIL_SIGN_UP_MESSAGE'
export const SHOW_EMAIL_NOT_REGISTERED_MESSAGE = 'SHOW_EMAIL_NOT_REGISTERED_MESSAGE'
export const HIDE_EMAIL_NOT_REGISTERED_MESSAGE = 'HIDE_EMAIL_NOT_REGISTERED_MESSAGE'
export const SHOW_EMAIL_ALREADY_REGISTERED_MESSAGE = 'SHOW_EMAIL_ALREADY_REGISTERED_MESSAGE'
export const HIDE_EMAIL_ALREADY_REGISTERED_MESSAGE = 'HIDE_EMAIL_ALREADY_REGISTERED_MESSAGE'

export const SHOW_INCORRECT_PASSWORD_MESSAGE = 'SHOW_INCORRECT_PASSWORD_MESSAGE'
export const HIDE_INCORRECT_PASSWORD_MESSAGE = 'HIDE_INCORRECT_PASSWORD_MESSAGE'
export const SHOW_NO_PASSWORD_MESSAGE = 'SHOW_NO_PASSWORD_MESSAGE'
export const HIDE_NO_PASSWORD_MESSAGE = 'HIDE_NO_PASSWORD_MESSAGE'

export const HIDE_LOGIN_PAGE_ERROR_MESSAGES = 'HIDE_LOGIN_PAGE_ERROR_MESSAGES'
export const LOGIN_PAGE_ERROR_MESSAGES_HIDDEN = 'LOGIN_PAGE_ERROR_MESSAGES_HIDDEN'


export const getSessionStatus = () => ({
    type: GET_SESSION_STATUS
})

export const userProfileLoaded_ERF = ( id, authenticated ) => ({
    type: USER_PROFILE_LOADED_ERF,
    id,
    authenticated
})


export const requestAuthenticateUser = (username, passwordHash) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    passwordHash
})

export const processAuthenticateUser = (status = AUTHENTICATING, id) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    authenticated: status,
    id
})


export const signOutRequest = () => ({
    type: SIGN_OUT_REQUEST
})


export const showNoEmailSignInMessage = () => ({
    type: SHOW_NO_EMAIL_SIGN_IN_MESSAGE
})
export const hideNoEmailSignInMessage = () => ({
    type: HIDE_NO_EMAIL_SIGN_IN_MESSAGE
})

export const showInvalidEmailSignUpMessage = () => ({
    type: SHOW_INVALID_EMAIL_SIGN_UP_MESSAGE
})
export const hideInvalidEmailSignUpMessage = () => ({
    type: HIDE_INVALID_EMAIL_SIGN_UP_MESSAGE
})

export const showEmailNotRegisteredSignInMessage = () => ({
    type: SHOW_EMAIL_NOT_REGISTERED_MESSAGE
})
export const hideEmailNotRegisteredSignInMessage = () => ({
    type: HIDE_EMAIL_NOT_REGISTERED_MESSAGE
})

export const showEmailAlreadyRegisteredMessage = () => ({
    type: SHOW_EMAIL_ALREADY_REGISTERED_MESSAGE
})
export const hideEmailAlreadyRegisteredMessage = () => ({
    type: HIDE_EMAIL_ALREADY_REGISTERED_MESSAGE
})

export const showIncorrectPasswordMessage = () => ({
    type: SHOW_INCORRECT_PASSWORD_MESSAGE
})
export const hideIncorrectPasswordMessage = () => ({
    type: HIDE_INCORRECT_PASSWORD_MESSAGE
})

export const showNoPasswordMessage = () => ({
    type: SHOW_NO_PASSWORD_MESSAGE
})
export const hideNoPasswordMessage = () => ({
    type: HIDE_NO_PASSWORD_MESSAGE
})

export const hideLoginPageErrorMessages = () => ({
    type: HIDE_LOGIN_PAGE_ERROR_MESSAGES
})
export const loginPageErrorMessagesHidden = () => ({
    type: LOGIN_PAGE_ERROR_MESSAGES_HIDDEN
})