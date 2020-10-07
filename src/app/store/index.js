import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sagas'
import { session, wrongCredentialsMessage } from './reducers/login' 
import { language, translations } from './reducers/language'
import { mongoDataLoading } from './reducers/mongoData'
import { 
    predictionsFormNew,
    predictionsFormExistent,
    predictionsFormResults,
    createPredictionsForm,
    generatingRandomPredictions,
    predictionsSubmitted
} from './reducers/predictionsForm'
import { newPrediction, newPredictionUsername } from './reducers/newPrediction'
import { users } from './reducers/users'
import { results } from './reducers/results'
import { predictions } from './reducers/predictions'

const sagaMiddleware = createSagaMiddleware()
 
export const store = createStore(
    combineReducers({
        session,
        wrongCredentialsMessage,
        language,
        translations,
        mongoDataLoading,
        predictionsFormNew,
        predictionsFormExistent,
        predictionsFormResults,
        createPredictionsForm,
        newPrediction,
        newPredictionUsername,
        generatingRandomPredictions,
        predictionsSubmitted,
        users,
        results,
        predictions
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga])
} 
