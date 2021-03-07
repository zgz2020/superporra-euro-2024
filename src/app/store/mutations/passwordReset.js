export const PASSWORD_RESET_TOKEN_STATUS = 'PASSWORD_RESET_TOKEN_STATUS'

export const PASSWORD_RESET_TOKEN_EXPIRED = 'PASSWORD_RESET_TOKEN_EXPIRED'
export const PASSWORD_RESET_TOKEN_VALID = 'PASSWORD_RESET_TOKEN_VALID'

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