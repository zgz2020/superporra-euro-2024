import { take, put, select, all, call } from 'redux-saga/effects'
import md5 from 'md5'
import * as selectors from '../selectors'
import * as mutations from '../mutations'
import { handleAuthentication, isAuthenticated } from '../../../Auth/Auth'
import { newUser, getLocalStorageUser, setLocalStorageUser } from '../../../utils/common'

export function* getLoggedUserSaga() {
    while (true) {
        yield take(mutations.GET_LOGGED_USER)

        if (isAuthenticated()) {
            const { idToken, expiresAt, userID } = getLocalStorageUser()
            yield put(mutations.userProfileLoaded( idToken, expiresAt, userID))
        }
    }
}

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