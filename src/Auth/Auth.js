import auth0 from 'auth0-js'

// https://auth0.com/blog/beyond-create-react-app-react-router-redux-saga-and-more/


const auth0Client = new auth0.WebAuth({
  domain: 'juanjoreactapp-dev.eu.auth0.com',
  audience: 'https://juanjoreactapp-dev.eu.auth0.com/userinfo',
  clientID: 'ae3Nl1kAXITpqNrDFxSs4uGw6ZdflvtM',
  redirectUri: 'http://localhost:8080/callback',
  responseType: 'token id_token',
  scope: 'openid email'
})

export function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (err) return reject(err)
      if (!authResult || !authResult.idToken) {
        return reject(err)
      }

      const idToken = authResult.idToken
      const { email } = authResult.idTokenPayload
      // set the time that the id token will expire at
      const expiresAt = JSON.stringify(
        authResult.idTokenPayload.exp * 1000 + new Date().getTime()
      )

      resolve({
        authenticated: true,
        idToken,
        email,
        expiresAt
      })
    })
  })
}

export function isAuthenticated() {
  const expiresAt = JSON.parse(localStorage.getItem("expires_at"))
  return new Date().getTime() < expiresAt
}


export function signIn() {
  auth0Client.authorize()
}

export function signOut() {
  localStorage.removeItem("id_token")
  localStorage.removeItem("expires_at")
  localStorage.removeItem("user_id")

  auth0Client.logout({
    returnTo: 'http://localhost:8080',
    clientID: 'ae3Nl1kAXITpqNrDFxSs4uGw6ZdflvtM'
  })
}
 