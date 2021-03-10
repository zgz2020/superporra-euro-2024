import { take, put, select } from 'redux-saga/effects'
import axios from 'axios'
import * as selectors from '../selectors'
import * as mutations from '../mutations'
import { history } from '../history'
import { url } from './url'
import { getLocalStorageUser, setLocalStorageUser } from '../../../utils/common'
import { userExists } from '../../../utils/login'

export function* passwordResetTokenStatusSaga (){
    const { token } = yield take(mutations.PASSWORD_RESET_TOKEN_STATUS)

    console.log('PRTS - SAGA - token: ', token)

    const { data } = yield axios.post(url + '/password-reset-token', { token })

    console.log('PRTS_Saga - response: ', data)
    let { tokenData } = data
    console.log('PRTS_Saga - tokenExpires: ', tokenData.tokenExpires)

    if (tokenData.tokenExpires > Date.now()) {
        yield put(mutations.passwordResetTokenValid())
    } else {
        yield put(mutations.passwordResetTokenExpired())
    }
}

export function* requestPasswordResetSaga (){
    while (true) {
        const { newPassword } = yield take(mutations.REQUEST_PASSWORD_RESET)

        yield put(mutations.hideLoginPageErrorMessages())
        yield take(mutations.LOGIN_PAGE_ERROR_MESSAGES_HIDDEN)

        if (newPassword == '') {
            yield put(mutations.showNoPasswordMessage())
        } 
        else {
            try {
                // CODE to RESET password
                yield put(mutations.showResetPasswordSuccessMessage())
            } catch (e) {
                yield put(mutations.showResetPasswordErrorMessage())
            }
        }
    }
}
