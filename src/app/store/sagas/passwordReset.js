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

        if (newPassword == '') {
            yield put(mutations.showNoPasswordMessage())
        } 
        else {
            try {
                const { data } = yield axios.post(url + '/password-reset-token', { token })
                let { tokenData } = data
                let userID = tokenData.userID

                const respuesta = yield axios.post(url + '/reset-password', { userID, newPassword })
               
                // TODO !!!
                // Remove password-reset-token from database

                yield put(mutations.showResetPasswordSuccessMessage())
            } catch (e) {
                yield put(mutations.showResetPasswordErrorMessage())
            }
        }
    }
}
