import { take, put, select, delay } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import * as selectors from '../selectors'
import { url } from './url'

export function* updatePredictionPrivateLeagueSaga() {
    while (true) {
        let { username, privateLeague } = yield take(mutations.REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE)
        let translations = yield select(selectors.getTranslations)

        if (username == translations.accountPage.selectName || 
            privateLeague == translations.accountPage.selectLeague) {
                // TODO -> Message to be displayed in FE
                console.log('You must select a name and a league')
        } else {
            let { data } = yield axios.post(url + '/prediction/update-private-league', { username, privateLeague })

            let predictionID = data.predictionId
            yield put(mutations.updatePredictionPrivateLeague(predictionID, privateLeague))
        }
    }
}

export function* createPrivateLeagueSaga() {
    while (true) {
        let { leagueName } = yield take(mutations.CREATE_PRIVATE_LEAGUE)

        yield axios.post(url + '/private-league/create', { leagueName })

        yield put(mutations.showCreateLeagueSuccess())

        yield delay(5000)
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