import { take, put, select, delay } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import * as selectors from '../selectors'
import { url } from './url'

export function* updatePredictionPrivateLeagueSaga() {
    while (true) {
        let { action, predictionID, privateLeague, privateLeagueIndex } = yield take(mutations.REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE)
        let translations = yield select(selectors.getTranslations)

        if (privateLeague == translations.accountPage.selectLeague) {
            if (action == 'quit') {
                yield put(mutations.showQuitLeagueError())
            } else {
                yield put(mutations.showJoinLeagueError())
            }
        } else {
            yield axios.post(url + '/prediction/update-private-league', { action, predictionID, privateLeague })

            if (action == 'join') yield put(mutations.addPredictionPrivateLeague(predictionID, privateLeague))
            if (action == 'quit') yield put(mutations.removePredictionPrivateLeague(predictionID, privateLeagueIndex))

            if (action == 'quit') {
                yield put(mutations.hideQuitLeagueError())
                yield put(mutations.showQuitLeagueSuccess())
                yield delay(2000)
                yield put(mutations.hideQuitLeagueSuccess())
            } else {
                yield put(mutations.hideJoinLeagueError())
                yield put(mutations.showJoinLeagueSuccess())
                yield delay(2000)
                yield put(mutations.hideJoinLeagueSuccess())
            }
        }
    }
}

export function* createPrivateLeagueSaga() {
    while (true) {
        let { leagueName } = yield take(mutations.CREATE_PRIVATE_LEAGUE)

        yield axios.post(url + '/private-league/create', { leagueName })

        yield put(mutations.showCreateLeagueSuccess())

        yield delay(2000)
        yield put(mutations.hideCreateLeagueSuccess())
    }
}

export function* leagueNameValidationSaga() {
    while (true) {
        let { leagueName} = yield take(mutations.LEAGUE_NAME_VALIDATION)

        let { data } = yield axios.post(url + '/private-league/league-name-validation', { leagueName })

        if (data.includes('in use')) {
            yield put(mutations.showLeagueNameTaken())
        } else {
            yield put(mutations.hideLeagueNameTaken())
        }
    }
}