import { take, put, select } from 'redux-saga/effects'
import axios from 'axios'
import * as selectors from '../selectors'
import * as mutations from '../mutations'
import { history } from '../history'
import { url } from './url'
import { getLocalStorageUser, setLocalStorageUser } from '../../../utils/common'
import { userExists } from '../../../utils/login'

export function* requestForgotPasswordEmailSaga (){
    while (true) {
        const { email } = yield take(mutations.REQUEST_FORGOT_PASSWORD_EMAIL)

        let allUsers = yield select(selectors.getUsers)

        yield put(mutations.hideLoginPageErrorMessages())
        yield take(mutations.HIDE_LOGIN_PAGE_ERROR_MESSAGES)

        if (email == '') {
            yield put(mutations.showNoEmailForgotPasswordMessage())
        } else if (!userExists(allUsers.allIds, email)) {
            yield put(mutations.showEmailNotRegisteredForgotPasswordMessage())
        } else {
            try {
                const { data } = yield axios.post(url + '/forgot-password-email', { email })
                yield put(mutations.showResetPasswordEmailSentMessage())
            } catch (e) {
                yield put(mutations.showResetPasswordEmailErrorMessage())
            }
        }
    }
}