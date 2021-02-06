import { take, put, select } from 'redux-saga/effects'
import axios from 'axios'
import * as selectors from '../selectors'
import * as mutations from '../mutations'
import { history } from '../history'
import { url } from './url'
import { getLocalStorageUser, setLocalStorageUser } from '../../../utils/common'
import { userExists } from '../../../utils/login'

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

        let allUsers = yield select(selectors.getUsers)

        yield put(mutations.hideNoEmailSignUpMessage())
        yield put(mutations.hideEmailAlreadyRegisteredMessage())
        yield put(mutations.hideNoPasswordMessage())

        if ( username == '') {
            yield put(mutations.hideEmailNotRegisteredMessage())
            yield put(mutations.hideIncorrectPasswordMessage())
            yield put(mutations.showNoEmailSignInMessage())
        } else if (!userExists(allUsers.allIds, username)) {
            yield put(mutations.hideNoEmailSignInMessage())
            yield put(mutations.hideIncorrectPasswordMessage())
            yield put(mutations.showEmailNotRegisteredMessage())
        } else {
            try {
                const { data } = yield axios.post(url + '/authenticate', { username, passwordHash })
                const { authenticated, id, idToken } = data.session
    
                yield put(mutations.processAuthenticateUser(authenticated, id))
                yield put(mutations.hideNoEmailSignInMessage())
                yield put(mutations.hideEmailNotRegisteredMessage())
                yield put(mutations.hideIncorrectPasswordMessage())
    
                setLocalStorageUser(idToken.token)
    
                history.push('/account')
            } catch (e) {
                yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
                yield put(mutations.hideNoEmailSignInMessage())
                yield put(mutations.hideEmailNotRegisteredMessage())
                yield put(mutations.showIncorrectPasswordMessage())
            }
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
