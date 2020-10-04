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



export const REQUEST_USER_CREATION_DOS = 'REQUEST_USER_CREATION_DOS'
export const CREATE_USER_DOS = 'CREATE_USER_DOS'

export const requestUserCreationDOS = (email, passwordHash) => ({
    type: REQUEST_USER_CREATION_DOS,
    email,
    passwordHash
})

export const createUserDOS = (userID, passwordHash) => ({
    type: CREATE_USER_DOS,
    userID,
    passwordHash
})