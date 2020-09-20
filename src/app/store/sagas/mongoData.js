import { take, put } from 'redux-saga/effects'
import axios from 'axios'
import * as mutations from '../mutations'
import { url } from './url'
import { normalizeDefaultStateMongo } from '../../../server/defaultState'


// ------ GET DATA FROM MONGO DATABASE AT LOAD -----

export function* getMongoDataSaga() {
    while (true) {
        const { getData } = yield take(mutations.GET_MONGO_DATA)
        try {
            const { data } = yield axios.post(url + '/mongo/data', { getData })


            console.log('getMongoDataSaga - DATA: ', data)
            let state = normalizeDefaultStateMongo(data.mongoState)

            yield put(mutations.setState(state))
            yield put(mutations.mongoDataLoaded())

        } catch (e) {
            console.log('Not working? - ', e.message)
        }
    }
}