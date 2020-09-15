import { take, put, select, delay, all, actionChannel } from 'redux-saga/effects'
import axios from 'axios'
import uuid from 'uuid'
import md5 from 'md5'
import { normalizeDefaultStateMongo } from '../../server/defaultState'
import {
    getR16Teams,
    getQuarterFinalTeams,
    getSemiFinalTeams,
    getFinalTeams,
    getEuroWinner,
    getTopScorer,
    getLeastConceded
} from '../../utils/predictions'
import { generateRandomPredictions } from '../../utils/randomPredictions'
import * as selectors from './selectors'
import * as mutations from './mutations'
import { newUser, getLocalStorageUser, setLocalStorageUser } from '../../utils/common'
import { isAuthenticated } from '../../Auth/Auth'

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:7777'


// ------ GET LOGGED USER --------------------
export function* getLoggedUserSaga() {
    while (true) {
        yield take(mutations.GET_LOGGED_USER)

        if (isAuthenticated()) {
            const { idToken, expiresAt, userID } = getLocalStorageUser()
            yield put(mutations.userProfileLoaded( idToken, expiresAt, userID))
        }
    }
}


// ------ GET LANGUAGES FROM LOCAL STORAGE --- 

export function* getLocalStorageLanguageSaga() {
    while (true) {
        yield take(mutations.GET_LOCAL_STORAGE_LANGUAGE)

        const localStorageLanguage = localStorage.getItem("language")

        if (localStorageLanguage === "english" || localStorageLanguage === "spanish") {
            yield put(mutations.setLanguage(localStorageLanguage))
            yield put(mutations.setTranslations(localStorageLanguage))
        }
    }
}


// ------ GET DATA FROM MONGO DATABASE -----

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


// ---- LOGIN - https://auth0.com/blog/beyond-create-react-app-react-router-redux-saga-and-more/

import { call } from 'redux-saga/effects';
import { handleAuthentication } from '../../Auth/Auth';


export function* parseHash() {
    while (true) {
        yield all([
            take(mutations.HANDLE_AUTHENTICATION_CALLBACK),
            take(mutations.MONGO_DATA_LOADED)
        ])

        const { idToken, expiresAt, email } = yield call(handleAuthentication)        
        let emailHash = md5(email)
        yield put(mutations.userProfileLoaded( idToken, expiresAt, emailHash ))
        setLocalStorageUser(idToken, expiresAt, emailHash)

        let users = yield select(selectors.getUsers)
        if (newUser(users, emailHash)) yield put(mutations.requestUserCreation(emailHash, email))
    }
}   


// --------- SET LANGUAGE - COOKIE -----------
// This is needed so language selection is not lost when logging in

export function* setLanguageSaga() {
    while (true) {
        const { language } = yield take(mutations.SET_LANGUAGE)
        localStorage.setItem("language", language)
    }
}


// ------ CREATE NEW USER -----

export function* userCreationSaga() {
    while (true) {
        const { emailHash, email } = yield take(mutations.REQUEST_USER_CREATION)
        const userID = emailHash

        yield put(mutations.createUser(userID, email))
        const userData = yield axios.post(url + '/user/new', {
            user: {
                id: userID,
                email: email
            }
        })
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
    }
}


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

 
// ------ UPDATE EXISTENT PREDICTION (Mongo database ONLY) -----

export function* predictionUpdateSaga() {
    while (true) {
        const { predictionID, prediction, username } = yield take(mutations.REQUEST_PREDICTION_UPDATE)

        yield put(mutations.updatePrediction(predictionID, prediction, username))

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


// ------ UPDATE NEW PREDICTION (state ONLY) -----

export function* generateRandomPredictionsSaga() {
    while (true) {


        // !!!!!!!!!!!!!!!!!!!!!!!!
        // --- TO BE FIXED --> Now the predictionID won't be the same as the userID, 
        // ------------------- since a user can create many predictions
        // ------------------- sReview and fix everything related to create, update and render predictions
        // !!!!!!!!!!!!!!!!!!!!!!!!
        
        const { predictionType, userID } = yield take(mutations.GENERATE_RANDOM_PREDICTIONS_REQUEST)

        yield put(mutations.randomPredictionsLoading())
        // Wait for 0.1 seconds to allow the CTA to change state/label before running next line of code
        yield delay(100) 
    
        const randomPrediction = yield generateRandomPredictions()
        
        if(predictionType === "new") yield put(mutations.setRandomPredictionNew(randomPrediction))
        if(predictionType === "existent") yield put(mutations.updatePrediction(userID, randomPrediction))
    
        // Wait for half a second to make sure all random results have been generated and form updated
        // and then enable 'Generate random predictions' CTA
        yield delay(500) 
        yield put(mutations.randomPredictionsLoaded())
    }
}

export function* getR16TeamsNewPredictionSaga() {
    while (true) {
        yield take(mutations.SET_GOALS_NEW_PREDICTION_LEAGUE)
        
        // Gets newPrediction state from store
        const prediction = yield select(selectors.getNewPrediction)
        // Gets the R16 teams according to the prediction data
        const r16Teams = getR16Teams(prediction)
        // Updates newPrediction state with R16 teams
        yield put(mutations.setR16TeamsNewPrediction(r16Teams))
        // Triggers action to update Quarter Final teams if needed
        yield put(mutations.updatedR16TeamsNewPrediction())
    }
}

export function* getQuarterFinalTeamsNewPredictionSaga() {
    while (true) {
        yield take([ 
            mutations.SET_GOALS_NEW_PREDICTION_R16,
            mutations.UPDATED_R16_TEAMS_NEW_PREDICTION
        ])
        
        // Gets newPrediction state from store
        const prediction = yield select(selectors.getNewPrediction)
        // Gets the Quarter Final teams according to the prediction data
        const quarterFinalTeams = getQuarterFinalTeams(prediction)
        // Updates newPrediction state with quarterFinalTeams
        yield put(mutations.setQuarterFinalTeamsNewPrediction(quarterFinalTeams))
        // Triggers action to update Semi Final teams if needed
        yield put(mutations.updatedQuarterFinalTeamsNewPrediction())
    }
}

export function* getSemiFinalTeamsNewPredictionSaga() {
    while (true) {
        yield take([ 
            mutations.SET_GOALS_NEW_PREDICTION_QF,
            mutations.UPDATED_QF_TEAMS_NEW_PREDICTION
        ])
        
        // Gets newPrediction state from store
        const prediction = yield select(selectors.getNewPrediction)
        // Gets the Semi Final teams according to the prediction data
        const semiFinalTeams = getSemiFinalTeams(prediction)
        // Updates newPrediction state with semiFinalTeams
        yield put(mutations.setSemiFinalTeamsNewPrediction(semiFinalTeams))
        // Triggers action to update Final teams if needed
        yield put(mutations.updatedSemiFinalTeamsNewPrediction())
    }
}

export function* getFinalTeamsNewPredictionSaga() {
    while (true) {
        yield take([ 
            mutations.SET_GOALS_NEW_PREDICTION_SF,
            mutations.UPDATED_SF_TEAMS_NEW_PREDICTION
        ])
        
        // Gets newPrediction state from store
        const prediction = yield select(selectors.getNewPrediction)
        // Gets the Final teams according to the prediction data
        const finalTeams = getFinalTeams(prediction)
        // Updates newPrediction state with finalTeams
        yield put(mutations.setFinalTeamsNewPrediction(finalTeams))
        // Triggers action to update Euro Winner team, Top Scorer or Least Conceded teams if needed
        yield put(mutations.updatedFinalTeamsNewPrediction())
    }
}

export function* getEuroWinnerNewPredictionSaga() {
    while (true) {
        yield take([ 
            mutations.SET_GOALS_NEW_PREDICTION_FINAL,
            mutations.UPDATED_FINAL_TEAMS_NEW_PREDICTION
        ])
        
        // Gets newPrediction state from store
        const prediction = yield select(selectors.getNewPrediction)
        // Gets Euro Winner team according to the prediction data
        const euroWinnerTeam = getEuroWinner(prediction)
        // Updates newPrediction state with Euro Winner team
        yield put(mutations.setEuroWinnerTeamNewPrediction(euroWinnerTeam))
    }
}

export function* getTopScorerNewPredictionSaga() {
    while (true) {
        yield take([ 
            mutations.SET_GOALS_NEW_PREDICTION_FINAL,
            mutations.UPDATED_FINAL_TEAMS_NEW_PREDICTION
        ])
        
        // Gets newPrediction state from store
        const prediction = yield select(selectors.getNewPrediction)
        // Gets Top Scorer team according to the prediction data
        const topScorerTeam = getTopScorer(prediction)
        // Updates newPrediction state with Top Scorer team
        yield put(mutations.setTopScorerTeamNewPrediction(topScorerTeam))
    }
}

export function* getLeastConcededNewPredictionSaga() {
    while (true) {
        yield take([ 
            mutations.SET_GOALS_NEW_PREDICTION_FINAL,
            mutations.UPDATED_FINAL_TEAMS_NEW_PREDICTION
        ])
        
        // Gets newPrediction state from store
        const prediction = yield select(selectors.getNewPrediction)
        // Gets Top Scorer team according to the prediction data
        const leastConcededTeam = getLeastConceded(prediction)
        // Updates newPrediction state with Top Scorer team
        yield put(mutations.setLeastConcededTeamNewPrediction(leastConcededTeam))
    }
}


// ------ UPDATE EXISTENT PREDICTION (state ONLY) -----

export function* getR16TeamsSaga() {
    while (true) {
        const { predictionID } = yield take(mutations.SET_GOALS_LEAGUE)
        
        // Gets predictions state from store
        const predictions = yield select(selectors.getPredictions)
        // User's prediction
        const userPrediction = predictions.byId[predictionID]
        // Gets the R16 teams according to the prediction data
        const r16Teams = getR16Teams(userPrediction)
        // Updates newPrediction state with R16 teams
        yield put(mutations.setR16Teams(predictionID, r16Teams))
        // Triggers action to update Quarter Final teams if needed
        yield put(mutations.updatedR16Teams(predictionID))
    }
}

export function* getQuarterFinalTeamsSaga() {
    while (true) {
        const { predictionID } = yield take([ 
            mutations.SET_GOALS_R16,
            mutations.UPDATED_R16_TEAMS
        ])

        // Gets predictions state from store
        const predictions = yield select(selectors.getPredictions)
        // User's prediction
        const userPrediction = predictions.byId[predictionID]
        // Gets the Quarter Final teams according to the prediction data
        const quarterFinalTeams = getQuarterFinalTeams(userPrediction)
        // Updates newPrediction state with Quarter Final teams
        yield put(mutations.setQuarterFinalTeams(predictionID, quarterFinalTeams))
        // Triggers action to update Semi Final teams if needed
        yield put(mutations.updatedQuarterFinalTeams(predictionID))
    }
}

export function* getSemiFinalTeamsSaga() {
    while (true) {
        const { predictionID } = yield take([ 
            mutations.SET_GOALS_QF,
            mutations.UPDATED_QF_TEAMS
        ])
        
        // Gets predictions state from store
        const predictions = yield select(selectors.getPredictions)
        // User's prediction
        const userPrediction = predictions.byId[predictionID]
        // Gets the Semi Final teams according to the prediction data
        const semiFinalTeams = getSemiFinalTeams(userPrediction)
        // Updates newPrediction state with Semi Final teams
        yield put(mutations.setSemiFinalTeams(predictionID, semiFinalTeams))
        // Triggers action to update Final teams if needed
        yield put(mutations.updatedSemiFinalTeams(predictionID))
    }
}

export function* getFinalTeamsSaga() {
    while (true) {
        const { predictionID } = yield take([ 
            mutations.SET_GOALS_SF,
            mutations.UPDATED_SF_TEAMS
        ])

        // Gets predictions state from store
        const predictions = yield select(selectors.getPredictions)
        // User's prediction
        const userPrediction = predictions.byId[predictionID]
        // Gets the Final teams according to the prediction data
        const finalTeams = getFinalTeams(userPrediction)
        // Updates newPrediction state with Final teams
        yield put(mutations.setFinalTeams(predictionID, finalTeams))
        // Triggers action to update Euro Winner team, Top Scorer or Least Conceded teams if needed
        yield put(mutations.updatedFinalTeams(predictionID))
    }
}

export function* getEuroWinnerSaga() {
    while (true) {
        const { predictionID } = yield take([ 
            mutations.SET_GOALS_FINAL,
            mutations.UPDATED_FINAL_TEAMS
        ])
        
        // Gets predictions state from store
        const predictions = yield select(selectors.getPredictions)
        // User's prediction
        const userPrediction = predictions.byId[predictionID]
        // Gets Euro Winner team according to the prediction data
        const euroWinnerTeam = getEuroWinner(userPrediction)
        // Updates newPrediction state with Euro Winner team
        yield put(mutations.setEuroWinnerTeam(predictionID, euroWinnerTeam))
    }
}

export function* getTopScorerSaga() {
    while (true) {
        const { predictionID } = yield take([ 
            mutations.SET_GOALS_FINAL,
            mutations.UPDATED_FINAL_TEAMS
        ])
        
        // Gets prediction state from store
        const predictions = yield select(selectors.getPredictions)
        // User's prediction
        const userPrediction = predictions.byId[predictionID]
        // Gets Top Scorer team according to the prediction data
        const topScorerTeam = getTopScorer(userPrediction)
        // Updates prediction state with Top Scorer team
        yield put(mutations.setTopScorerTeam(predictionID, topScorerTeam))
    }
}

export function* getLeastConcededSaga() {
    while (true) {
        const { predictionID }  = yield take([ 
            mutations.SET_GOALS_FINAL,
            mutations.UPDATED_FINAL_TEAMS
        ])
        
        // Gets prediction state from store
        const predictions = yield select(selectors.getPredictions)
        // User's prediction
        const userPrediction = predictions.byId[predictionID]
        // Gets Top Scorer team according to the prediction data
        const leastConcededTeam = getLeastConceded(userPrediction)
        // Updates prediction state with Top Scorer team
        yield put(mutations.setLeastConcededTeam(predictionID, leastConcededTeam))
    }
}
