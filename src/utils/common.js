export const capitaliseFirstLetter = (string) => 
    typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : ''

export const newUser = (users, userID) => users.allIds.includes(userID) ? false : true

export const getLocalStorageUser = () => {
    const idToken = localStorage.getItem("id_token")

    return { idToken }
}

export const setLocalStorageUser = (idToken) => {
    localStorage.setItem("id_token", idToken)
}

export const http = domain => domain == 'localhost' ? 'http' : 'https'
export const localhostPort = domain => domain == 'localhost' ? ':8080' : ''