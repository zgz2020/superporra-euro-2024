export const REQUEST_USER_CREATION = 'REQUEST_USER_CREATION'
export const CREATE_USER = 'CREATE_USER'

export const requestUserCreation = (emailHash, email) => ({
    type: REQUEST_USER_CREATION,
    emailHash,
    email
})

export const createUser = (userID, email) => ({
    type: CREATE_USER,
    userID,
    email
})