import { take, put, select } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import * as selectors from '../selectors'
import { url } from './url'

export function* updatePredictionPrivateLeagueSaga() {
    while (true) {
        const { username, privateLeague } = yield take(mutations.REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE)
        let translations = yield select(selectors.getTranslations)

        if (username == translations.accountPage.selectName || 
            privateLeague == translations.accountPage.selectLeague) {
                console.log('You must select a name and a league')
        } else {
            const { data } = yield axios.post(url + '/prediction/update-private-league', { username, privateLeague })

            const predictionID = data.predictionId
            yield put(mutations.updatePredictionPrivateLeague(predictionID, privateLeague))
        }
    }
}

export function* createPrivateLeagueSaga() {
    while (true) {
        const { leagueName } = yield take(mutations.CREATE_PRIVATE_LEAGUE)

        yield axios.post(url + '/private-league/create', { leagueName })
    }
}