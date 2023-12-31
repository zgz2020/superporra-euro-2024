import { take, put, select, delay } from 'redux-saga/effects'
import axios from 'axios'
import uuid from 'uuid'
import * as mutations from '../mutations'
import * as selectors from '../selectors'
import { url } from './url'


// ------ USERNAME VALIDATIO ----

export function* usernameValidationSaga() {
    while (true) {
        const { username } = yield take(mutations.USERNAME_VALIDATION)
        let existentUsernames = yield select(selectors.getNicknames)

        if (existentUsernames.includes(username)) {
            yield put(mutations.showNicknameTaken())
        } else {
            yield put(mutations.hideNicknameTaken())
        }
    }
}


// ------ CREATE NEW PREDICTION -----

export function* predictionCreationSaga() {
    while (true) {
        const { userID, username, prediction } = yield take(mutations.REQUEST_PREDICTION_CREATION)
        const predictionID = uuid()
        
        yield put(mutations.createPrediction(predictionID, userID, username, prediction))
        const predictionData = yield axios.post(url + '/prediction/new', {
            prediction: {
                id: predictionID,
                owner: userID,
                username: username,
                winner: prediction.winner,
                topScorer: prediction.topScorer,
                leastConceded: prediction.leastConceded,
                leagueMatches: prediction.leagueMatches,
                r16Matches: prediction.r16Matches,
                quarterFinalMatches: prediction.quarterFinalMatches,
                semiFinalMatches: prediction.semiFinalMatches,
                finalMatches: prediction.finalMatches
            }
        })
        yield put(mutations.hidePredictionsFormNew())
        yield put(mutations.showPredictionsSubmitted())
        yield put(mutations.resetPredictionCreationForm())

        yield put(mutations.showjoiningCompetitionSuccess())
        yield delay(2000)
        yield put(mutations.hidejoiningCompetitionSuccess())
    }
}