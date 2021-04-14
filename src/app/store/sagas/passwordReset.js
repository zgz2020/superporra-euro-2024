import { take, put } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import { url } from './url'


export function* passwordResetTokenStatusSaga (){
    const { token } = yield take(mutations.PASSWORD_RESET_TOKEN_STATUS)

    const { data } = yield axios.post(url + '/password-reset-token', { token })
    let { tokenData } = data

    if (tokenData.tokenExpires > Date.now()) {
        yield put(mutations.passwordResetTokenValid())
    } else {
        yield put(mutations.passwordResetTokenExpired())
    }
}

export function* requestPasswordResetSaga (){
    while (true) {
        const { token, newPassword } = yield take(mutations.REQUEST_PASSWORD_RESET)

        yield put(mutations.hideLoginPageErrorMessages())
        yield take(mutations.LOGIN_PAGE_ERROR_MESSAGES_HIDDEN)

        if (newPassword == 'd41d8cd98f00b204e9800998ecf8427e') {
            yield put(mutations.showNoPasswordMessage())
        } 
        else {
            try {
                const { data } = yield axios.post(url + '/password-reset-token', { token })
                let { tokenData } = data
                let userID = tokenData.userID

                const respuesta = yield axios.post(url + '/password-reset-request', { userID, newPassword })
                yield put(mutations.showResetPasswordSuccessMessage())
            } catch (e) {
                console.log('There was an error reseting the password: ', e)
                yield put(mutations.showResetPasswordErrorMessage())
            }
        }
    }
}
