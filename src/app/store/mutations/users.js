export const REQUEST_USER_CREATION = 'REQUEST_USER_CREATION'
export const CREATE_USER = 'CREATE_USER'

export const requestUserCreation = (email, passwordHash) => ({
    type: REQUEST_USER_CREATION,
    email,
    passwordHash
})

export const createUser = (id, passwordHash) => ({
    type: CREATE_USER,
    id,
    passwordHash
})