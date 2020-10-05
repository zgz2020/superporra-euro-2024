import { take, put } from 'redux-saga/effects'
import axios from 'axios'
import { history } from '../history'
import * as mutations from '../mutations'
import { url } from './url'
import { getLocalStorageUser, setLocalStorageUser } from '../../../utils/common'

export function* getSessionStatusSaga() {
    while (true) {
        yield take(mutations.GET_SESSION_STATUS)

        const { idToken } = getLocalStorageUser()

        try {
            const { data } = yield axios.post(url + '/id-token', { idToken })
            const { authenticated, id } = data.session

            yield put(mutations.processAuthenticateUser(authenticated, id))

        } catch (e) {
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }
    }
}

export function* userAuthenticationSaga(){
    while (true){
        const { username, passwordHash } = yield take(mutations.REQUEST_AUTHENTICATE_USER)

        try {
            const { data } = yield axios.post(url + '/authenticate', { username, passwordHash })
            const { authenticated, id, idToken } = data.session

            yield put(mutations.processAuthenticateUser(authenticated, id))
            yield put(mutations.hideWrongCredentialsMessage())

            setLocalStorageUser(idToken.token)

            history.push('/account')
        } catch (e) {
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
            yield put(mutations.showWrongCredentialsMessage())
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
