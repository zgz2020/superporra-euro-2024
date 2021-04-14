import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sagas'
import { 
    session, 
    noEmailSignInMessage,
    noEmailSignUpMessage,
    noEmailForgotPasswordMessage,
    emailNotRegisteredSignInMessage,
    emailNotRegisteredForgotPasswordMessage,
    resetPasswordEmailSentMessage,
    resetPasswordEmailErrorMessage,
    emailAlreadyRegisteredMessage,
    incorrectPasswordMessage,
    noPasswordMessage,
    passwordResetTokenExpired,
    resetPasswordSuccessMessage,
    resetPasswordErrorMessage
} from './reducers/login' 
import { language, translations } from './reducers/language'
import { mongoDataLoading } from './reducers/mongoData'
import { 
    predictionsFormNew,
    predictionsFormExistent,
    predictionsFormResults,
    createPredictionsForm,
    generatingRandomPredictions,
    predictionsSubmitted,
    nicknameTaken,
} from './reducers/predictionsForm'
import { newPrediction, newPredictionUsername } from './reducers/newPrediction'
import { users } from './reducers/users'
import { results } from './reducers/results'
import { predictions } from './reducers/predictions'
import { 
    privateLeagues,
    privateLeagueRankings,
    createLeagueSuccess
} from './reducers/privateLeagues'

const sagaMiddleware = createSagaMiddleware()
 
export const store = createStore(
    combineReducers({
        session,
        noEmailSignInMessage,
        noEmailSignUpMessage,
        noEmailForgotPasswordMessage,
        emailNotRegisteredSignInMessage,
        emailNotRegisteredForgotPasswordMessage,
        resetPasswordEmailSentMessage,
        resetPasswordEmailErrorMessage,
        emailAlreadyRegisteredMessage,
        incorrectPasswordMessage, 
        noPasswordMessage,
        passwordResetTokenExpired,
        resetPasswordSuccessMessage,
        resetPasswordErrorMessage,
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
        nicknameTaken,
        users,
        results,
        predictions,
        privateLeagues,
        privateLeagueRankings,
        createLeagueSuccess
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga])
} 
