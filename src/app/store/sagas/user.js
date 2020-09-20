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

