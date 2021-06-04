import { take, put, delay } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import { url } from './url'
import { dateAndTime } from '../../../utils/common'

let validator = require("email-validator")

export function* commentCreationSaga() {
    while (true) {
        const { username, text } = yield take(mutations.REQUEST_COMMENT_CREATION)

        const nowDate = new Date()
        const date = dateAndTime(nowDate)

        yield axios.post(url + '/comments/create', { username, date, text })
        yield put(mutations.createComment(username, date, text))

        yield put(mutations.showPostCommentSuccess())
        yield delay(2000)
        yield put(mutations.hidePostCommentSuccess())
    }
}

