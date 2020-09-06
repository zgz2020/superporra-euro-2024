import auth0 from 'auth0-js'

// Pluralsight course - https://app.pluralsight.com/library/courses/react-auth0-authentication-security/table-of-contents

// export default class Auth {
//     constructor(history) {
//         this.history = history
//         this.userProfile = null
//         this.auth0 = new auth0.WebAuth({
//             domain: process.env.REACT_APP_AUTH0_DOMAIN,
//             clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
//             redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
//             audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//             responseType: "token id_token",
//             scope: "openid profile email"
//         })
//     }

//     login = () => {
//         this.auth0.authorize()
//     }

//     handleAuthentication = () => {
//         this.auth0.parseHash((err, authResult) => {
//             if (authResult && authResult.accessToken && authResult.idToken) {
//                 this.setSession(authResult)
//                 this.history.push("/")
//             } else if (err) {
//                 this.history.push("/")
//                 alert(`Error: ${err.error}. Check the console for further details.`)
//                 console.log(err)
//             }
//         })
//     }

//     setSession = authResult => {
//         console.log('setSession - authResult: ', authResult)
//         // set the time that the access token will expire
//         const expiresAt = JSON.stringify(
//             authResult.expiresIn * 1000 + new Date().getTime()
//         )

//         localStorage.setItem("access_token", authResult.accessToken)
//         localStorage.setItem("id_token", authResult.idToken)
//         localStorage.setItem("expires_at", expiresAt)
//     }

//     isAuthenticated() {
//         const expiresAt = JSON.parse(localStorage.getItem("expires_at"))
//         return new Date().getTime() < expiresAt
//     }

//     logout = () => {
//         // localStorage.removeItem("access_token")
//         // localStorage.removeItem("id_token")
//         // localStorage.removeItem("expires_at")
//         // this.history.push("/")

//         localStorage.removeItem("access_token")
//         localStorage.removeItem("id_token")
//         localStorage.removeItem("expires_at")
//         this.userProfile = null
        
//         this.auth0.logout({
//             clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
//             returnTo: "http://localhost:3000"
//         })
//     }

//     getAccessToken = () => {
//         const accessToken = localStorage.getItem("access_token")

//         // I've commented out this conditional because it made the app fail
//         // when not logged in.
//         // The app is working as in pluralsight course when removing this conditional,
//         // for both signed in and signed out scenarios

//         // if (!accessToken) {
//         //     throw new Error("No access token found")
//         // }

//         return accessToken
//     }

//     getProfile = cb => {
//         if (this.userProfile) return cb(this.userProfile)
        
//         this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
//             if (profile) this.userProfile = profile
//             cb(profile, err)
//         })
//     }
// }



// ------------------


// https://auth0.com/blog/beyond-create-react-app-react-router-redux-saga-and-more/

// const auth0Client = new auth0.WebAuth({
//   // the following three lines MUST be updated
//   domain: process.env.REACT_APP_AUTH0_DOMAIN,
//   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//   clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
//   redirectUri: 'http://localhost:8080/callback',
//   responseType: 'token id_token',
//   scope: 'openid profile email'
// });

// export function handleAuthentication() {
//   return new Promise((resolve, reject) => {
//     auth0Client.parseHash((err, authResult) => {
//       if (err) return reject(err);
//       if (!authResult || !authResult.idToken) {
//         return reject(err);
//       }
//       const idToken = authResult.idToken;
//       const profile = authResult.idTokenPayload;
//       // set the time that the id token will expire at
//       const expiresAt = authResult.idTokenPayload.exp * 1000;
//       resolve({
//         authenticated: true,
//         idToken,
//         profile,
//         expiresAt
//       });
//     });
//   });
// }

// export function signIn() {
//   auth0Client.authorize();
// }

// export function signOut() {
//   auth0Client.logout({
//     returnTo: 'http://localhost:8080',
//     clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
//   });
// }


// ---------------------------------

// https://auth0.com/blog/beyond-create-react-app-react-router-redux-saga-and-more/


const auth0Client = new auth0.WebAuth({
  // the following three lines MUST be updated
  domain: 'juanjoreactapp-dev.eu.auth0.com',
  audience: 'https://juanjoreactapp-dev.eu.auth0.com/userinfo',
  clientID: 'ae3Nl1kAXITpqNrDFxSs4uGw6ZdflvtM',
  redirectUri: 'http://localhost:8080/callback',
  responseType: 'id_token',
  scope: 'openid profile email'
})

export function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (err) return reject(err)
      if (!authResult || !authResult.idToken) {
        return reject(err)
      }
      const idToken = authResult.idToken
      const profile = authResult.idTokenPayload
      // set the time that the id token will expire at
      const expiresAt = authResult.idTokenPayload.exp * 1000
      resolve({
        authenticated: true,
        idToken,
        profile,
        expiresAt
      })
    })
  })
}

export function signIn() {
  auth0Client.authorize()
}

export function signOut() {
  auth0Client.logout({
    returnTo: 'http://localhost:8080',
    clientID: 'ae3Nl1kAXITpqNrDFxSs4uGw6ZdflvtM'
  })
}