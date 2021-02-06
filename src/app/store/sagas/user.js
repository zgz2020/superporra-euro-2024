import { take, put, select } from 'redux-saga/effects'
import axios from 'axios'
import * as selectors from '../selectors'
import * as mutations from '../mutations'
import { url } from './url'
import { history } from '../history'
import { setLocalStorageUser } from '../../../utils/common'
import { userExists } from '../../../utils/login'

export function* userCreationSaga() {
    while (true) {
        const { email, passwordHash } = yield take(mutations.REQUEST_USER_CREATION)
        const userID = email

        let allUsers = yield select(selectors.getUsers)

        if (userID == '') {
            yield put(mutations.hideEmailAlreadyRegisteredMessage())
            yield put(mutations.hideNoPasswordMessage())
            yield put(mutations.showNoEmailSignUpMessage())
        } else if (userExists(allUsers.allIds, userID)) {
            yield put(mutations.hideNoEmailSignUpMessage())
            yield put(mutations.hideNoPasswordMessage())
            yield put(mutations.showEmailAlreadyRegisteredMessage())
        } else if (passwordHash == 'd41d8cd98f00b204e9800998ecf8427e' ) {
            yield put(mutations.hideNoEmailSignUpMessage())
            yield put(mutations.hideEmailAlreadyRegisteredMessage())
            yield put(mutations.showNoPasswordMessage())
        } else {
            yield put(mutations.hideNoEmailSignUpMessage())
            yield put(mutations.hideEmailAlreadyRegisteredMessage())
            yield put(mutations.hideNoPasswordMessage())
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
}

