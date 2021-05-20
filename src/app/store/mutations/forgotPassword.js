export const REQUEST_FORGOT_PASSWORD_EMAIL = 'REQUEST_FORGOT_PASSWORD_EMAIL'

export const SHOW_NO_EMAIL_FORGOT_PASSWORD_MESSAGE = 'SHOW_NO_EMAIL_FORGOT_PASSWORD_MESSAGE'
export const HIDE_NO_EMAIL_FORGOT_PASSWORD_MESSAGE = 'HIDE_NO_EMAIL_FORGOT_PASSWORD_MESSAGE'

export const SHOW_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE = 'SHOW_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE'
export const HIDE_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE = 'HIDE_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE'

export const SHOW_RESET_PASSWORD_EMAIL_SENT_MESSAGE = 'SHOW_RESET_PASSWORD_EMAIL_SENT_MESSAGE'
export const HIDE_RESET_PASSWORD_EMAIL_SENT_MESSAGE = 'HIDE_RESET_PASSWORD_EMAIL_SENT_MESSAGE'

export const SHOW_RESET_PASSWORD_EMAIL_ERROR_MESSAGE = 'SHOW_RESET_PASSWORD_EMAIL_ERROR_MESSAGE'
export const HIDE_RESET_PASSWORD_EMAIL_ERROR_MESSAGE = 'HIDE_RESET_PASSWORD_EMAIL_ERROR_MESSAGE'

export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET'

export const REQUEST_PASSWORD_RESET_PROCESSING = 'REQUEST_PASSWORD_RESET_PROCESSING'
export const REQUEST_PASSWORD_RESET_PROCESSED = 'REQUEST_PASSWORD_RESET_PROCESSED'


export const requestForgotPasswordEmail = (email) => ({
    type: REQUEST_FORGOT_PASSWORD_EMAIL,
    email
})

export const showNoEmailForgotPasswordMessage = () => ({
    type: SHOW_NO_EMAIL_FORGOT_PASSWORD_MESSAGE
})
export const hideNoEmailForgotPasswordMessage = () => ({
    type: HIDE_NO_EMAIL_FORGOT_PASSWORD_MESSAGE
})

export const showEmailNotRegisteredForgotPasswordMessage = () => ({
    type: SHOW_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE
})
export const hideEmailNotRegisteredForgotPasswordMessage = () => ({
    type: HIDE_EMAIL_NOT_REGISTERED_FORGOT_PASSWORD_MESSAGE
})

export const showResetPasswordEmailSentMessage = () => ({
    type: SHOW_RESET_PASSWORD_EMAIL_SENT_MESSAGE
})
export const hideResetPasswordEmailSentMessage = () => ({
    type: HIDE_RESET_PASSWORD_EMAIL_SENT_MESSAGE
})

export const showResetPasswordEmailErrorMessage = () => ({
    type: SHOW_RESET_PASSWORD_EMAIL_ERROR_MESSAGE
})
export const hideResetPasswordEmailErrorMessage = () => ({
    type: HIDE_RESET_PASSWORD_EMAIL_ERROR_MESSAGE
})

export const requestPasswordReset = (token, newPassword) => ({
    type: REQUEST_PASSWORD_RESET,
    token,
    newPassword
})

export const requestPasswordResetProcessing = () => ({
    type: REQUEST_PASSWORD_RESET_PROCESSING
})
export const requestPasswordResetProcessed = () => ({
    type: REQUEST_PASSWORD_RESET_PROCESSED
})