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



// +++++++++++++++++++++++++++++++++++++++++++++++++++++

// Express React Full stack app LOGIN

// export const getLocalStorageUser_ERF = () => {
//     const userID = localStorage.getItem("user_id")

//     return { userID}
// }

// export const setLocalStorageUser_ERF = (userID) => {
//     localStorage.setItem("user_id", userID)
// }

export const getLocalStorageUser_ERF = () => {
    const idToken = localStorage.getItem("id_token")

    return { idToken }
}

export const setLocalStorageUser_ERF = (idToken) => {
    localStorage.setItem("id_token", idToken)
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
