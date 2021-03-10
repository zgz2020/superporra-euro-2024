export const PASSWORD_RESET_TOKEN_STATUS = 'PASSWORD_RESET_TOKEN_STATUS'

export const PASSWORD_RESET_TOKEN_EXPIRED = 'PASSWORD_RESET_TOKEN_EXPIRED'
export const PASSWORD_RESET_TOKEN_VALID = 'PASSWORD_RESET_TOKEN_VALID'

export const SHOW_RESET_PASSWORD_SUCCESS_MESSAGE = 'SHOW_RESET_PASSWORD_SUCCESS_MESSAGE'
export const HIDE_RESET_PASSWORD_SUCCESS_MESSAGE = 'HIDE_RESET_PASSWORD_SUCCESS_MESSAGE'

export const SHOW_RESET_PASSWORD_ERROR_MESSAGE = 'SHOW_RESET_PASSWORD_ERROR_MESSAGE'
export const HIDE_RESET_PASSWORD_ERROR_MESSAGE = 'HIDE_RESET_PASSWORD_ERROR_MESSAGE'


export const passwordResetTokenStatus = (token) => ({
    type: PASSWORD_RESET_TOKEN_STATUS,
    token
})

export const passwordResetTokenExpired = () => ({
    type: PASSWORD_RESET_TOKEN_EXPIRED
})
export const passwordResetTokenValid = () => ({
    type: PASSWORD_RESET_TOKEN_VALID
})

export const showResetPasswordSuccessMessage = () => ({
    type: SHOW_RESET_PASSWORD_SUCCESS_MESSAGE
})
export const hideResetPasswordSuccessMessage = () => ({
    type: HIDE_RESET_PASSWORD_SUCCESS_MESSAGE
})

export const showResetPasswordErrorMessage = () => ({
    type: SHOW_RESET_PASSWORD_ERROR_MESSAGE
})
export const hideResetPasswordErrorMessage = () => ({
    type: HIDE_RESET_PASSWORD_ERROR_MESSAGE
})