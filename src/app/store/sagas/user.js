import { take, put } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import { url } from './url'
import { history } from '../history'
import { setLocalStorageUser } from '../../../utils/common'

export function* userCreationSaga() {
    while (true) {
        const { email, passwordHash } = yield take(mutations.REQUEST_USER_CREATION)
        const userID = email

        yield put(mutations.createUser(userID, passwordHash))

        const { data } = yield axios.post(url + '/user/new', {
            user: {
                id: userID,
                password: passwordHash
            }
        })

        const { authenticated, id, idToken } = data.session

        yield put(mutations.processAuthenticateUser(authenticated, id))

        setLocalStorageUser(idToken.token)

        history.push('/account')
    }
}

