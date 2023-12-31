import { put, take } from 'redux-saga/effects'
import * as mutations from '../mutations'

export function* hideLoginPageErrorMessages() {
    while (true) {
        // Receive signal to hide all messages
        yield take(mutations.HIDE_LOGIN_PAGE_ERROR_MESSAGES)
        
        yield put(mutations.hideInvalidEmailSignUpMessage())
        yield put(mutations.hideEmailAlreadyRegisteredMessage())
        yield put(mutations.hideNoPasswordMessage())
        yield put(mutations.hideNoEmailSignInMessage())
        yield put(mutations.hideEmailNotRegisteredSignInMessage())
        yield put(mutations.hideIncorrectPasswordMessage())
        yield put(mutations.hideEmailNotRegisteredForgotPasswordMessage())
        yield put(mutations.hideNoEmailForgotPasswordMessage())
        yield put(mutations.hideResetPasswordEmailSentMessage())
        yield put(mutations.hideResetPasswordEmailErrorMessage())
        yield put(mutations.showResetPasswordErrorMessage())
        yield put(mutations.hideResetPasswordErrorMessage())

        // Send completion signal 
        yield put(mutations.loginPageErrorMessagesHidden())
    }
}