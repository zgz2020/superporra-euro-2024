export const capitaliseFirstLetter = (string) => 
    typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''

//const userIdList = (users) => Object.keys(users).map(user => user.userID)

export const newUser = (users, userID) => users.allIds.includes(userID) ? false : true

export const getLocalStorageUser = () => {
    const idToken = localStorage.getItem("id_token")
    const expiresAt = localStorage.getItem("expires_at")
    const userID = localStorage.getItem("user_id")

    return { idToken, expiresAt, userID}
}

export const setLocalStorageUser = (idToken, expiresAt, userID) => {
    localStorage.setItem("id_token", idToken)
    localStorage.setItem("expires_at", expiresAt)
    localStorage.setItem("user_id", userID)
}