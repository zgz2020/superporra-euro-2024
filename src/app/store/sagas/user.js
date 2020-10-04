import { take, put } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import { url } from './url'


// ------ CREATE NEW USER -----

export function* userCreationSaga() {
    while (true) {
        const { emailHash, email } = yield take(mutations.REQUEST_USER_CREATION)
        const userID = emailHash

        yield put(mutations.createUser(userID, email))
        const userData = yield axios.post(url + '/user/new', {
            user: {
                id: userID,
                email: email
            }
        })
    }
}

export function* userCreationSagaDOS() {
    while (true) {
        const { email, passwordHash } = yield take(mutations.REQUEST_USER_CREATION_DOS)
        const userID = email

        yield put(mutations.createUser(userID, passwordHash))
        const userData = yield axios.post(url + '/user/new', {
            user: {
                id: userID,
                password: passwordHash
            }
        })
    }
}

