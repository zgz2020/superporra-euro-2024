
import { take, put } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import { url } from './url'


// ------ UPDATE EXISTENT PREDICTION (Mongo database ONLY) -----

export function* predictionUpdateSaga() {
    while (true) {
        const { predictionID, prediction, username } = yield take(mutations.REQUEST_PREDICTION_UPDATE)

        yield put(mutations.updatePrediction(predictionID, prediction))

        const predictionData = yield axios.post(url + '/prediction/update-dos', {
            prediction: {
                ...prediction,
                id: predictionID,
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
    }
}