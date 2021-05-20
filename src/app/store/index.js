import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sagas'
import { 
    session, 
    noEmailSignInMessage,
    invalidEmailSignUpMessage,
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
    processingPasswordResetRequest
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
    noNickname,
    randomPredictionsGenerated,
    predictionsIncomplete,
    joiningCompetitionSuccess
} from './reducers/predictionsForm'
import { newPrediction, newPredictionUsername } from './reducers/newPrediction'
import { users } from './reducers/users'
import { results } from './reducers/results'
import { predictions } from './reducers/predictions'
import { 
    privateLeagues,
    privateLeagueRankings,
    joinLeagueError,
    joinLeagueSuccess,
    leagueNameTaken,
    createLeagueSuccess,
    quitLeagueError,
    quitLeagueSuccess
} from './reducers/privateLeagues'

const sagaMiddleware = createSagaMiddleware()
 
export const store = createStore(
    combineReducers({
        session,
        noEmailSignInMessage,
        invalidEmailSignUpMessage,
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
        processingPasswordResetRequest,
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
        noNickname,
        randomPredictionsGenerated,
        predictionsIncomplete,
        joiningCompetitionSuccess,
        users,
        results,
        predictions,
        privateLeagues,
        privateLeagueRankings,
        joinLeagueError,
        joinLeagueSuccess,
        leagueNameTaken,
        createLeagueSuccess,
        quitLeagueError,
        quitLeagueSuccess
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga])
} 
