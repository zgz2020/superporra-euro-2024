import { take, put, select, all, call } from 'redux-saga/effects'
import axios from 'axios'
import md5 from 'md5'
import { history } from '../history'
import * as selectors from '../selectors'
import * as mutations from '../mutations'
import { url } from './url'
import { handleAuthentication, isAuthenticated } from '../../../Auth/Auth'
import { newUser, getLocalStorageUser, setLocalStorageUser, getLocalStorageUser_ERF, setLocalStorageUser_ERF } from '../../../utils/common'

// export function* getLoggedUserSaga() {
//     while (true) {
//         yield take(mutations.GET_LOGGED_USER)

//         if (isAuthenticated()) {
//             const { idToken, expiresAt, userID } = getLocalStorageUser()
//             yield put(mutations.userProfileLoaded( idToken, expiresAt, userID))
//         }
//     }
// }


// -------- express-react-fullsatck authentication -------------------

export function* getSessionStatusSaga() {
    while (true) {
        yield take(mutations.GET_SESSION_STATUS)

        const { idToken } = getLocalStorageUser_ERF()

        try {
            const { data } = yield axios.post(url + '/id-token', { idToken })
            const { authenticated, id } = data.session

            console.log('GET_SESSION - authent / id : ', authenticated , ' / ', id)

            yield put(mutations.processAuthenticateUser(authenticated, id))

        } catch (e) {
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }
    }
}


export function* userAuthenticationSaga(){
    while (true){
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER)

        try {
            const { data } = yield axios.post(url + '/authenticate', { username, password })
            const { authenticated, id, idToken } = data.session

            yield put(mutations.processAuthenticateUser(authenticated, id))

            setLocalStorageUser_ERF(idToken.token)

            history.push('/account')
        } catch (e) {
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }
    }
}

export function* signOutSaga() {
    while (true) {
        yield take(mutations.SIGN_OUT_REQUEST)

        yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
        localStorage.removeItem('id_token')
    }
}



// ----------------- AUTH0 authentication ----------------------

export function* parseHash() {
    while (true) {
        yield all([
            take(mutations.HANDLE_AUTHENTICATION_CALLBACK),
            take(mutations.MONGO_DATA_LOADED)
        ])

        const { idToken, expiresAt, email } = yield call(handleAuthentication)        
        let emailHash = md5(email)
        yield put(mutations.userProfileLoaded( idToken, expiresAt, emailHash ))
        setLocalStorageUser(idToken, expiresAt, emailHash)

        let users = yield select(selectors.getUsers)
        if (newUser(users, emailHash)) yield put(mutations.requestUserCreation(emailHash, email))
    }
}   