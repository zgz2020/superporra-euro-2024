import { take } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import { url } from './url'


// ------ UPDATE RESULTS (Mongo database ONLY) -----

export function* updateResultsSaga() {
    while (true) {
        const { results } = yield take(mutations.UPDATE_RESULTS)

        const resultsData = yield axios.post(url + '/results/update', {
            results: {
                ...results,
                id: results.id,
                winner: results.winner,
                topScorer: results.topScorer,
                leastConceded: results.leastConceded,
                leagueMatches: results.leagueMatches,
                r16Matches: results.r16Matches,
                quarterFinalMatches: results.quarterFinalMatches,
                semiFinalMatches: results.semiFinalMatches,
                finalMatches: results.finalMatches
            }
        })
    }
}