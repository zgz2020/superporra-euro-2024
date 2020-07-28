import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import * as sagas from './sagas'
import * as mutations from './mutations'

import { defaultState } from '../../server/defaultState'
import { emptyPrediction } from '../../utils/config'

const sagaMiddleware = createSagaMiddleware()
 
export const store = createStore(
    combineReducers({

        session( userSession = defaultState.session || {}, action ){
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.session
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return { ...userSession, authenticated: mutations.AUTHENTICATING }
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return { ...userSession, authenticated: action.authenticated }
            }
            return userSession
        },

        predictionsFormNew(predictionsFormNew = false, action) {
            switch(action.type) {
                case mutations.SHOW_PREDICTIONS_FORM_NEW:
                    return true
                case mutations.HIDE_PREDICTIONS_FORM_NEW:
                    return false
            }
            return predictionsFormNew
        },

        predictionsFormExistent(predictionsFormExistent = false, action) {
            switch(action.type) {
                case mutations.SHOW_PREDICTIONS_FORM_EXISTENT:
                    return true
                case mutations.HIDE_PREDICTIONS_FORM_EXISTENT:
                    return false
            }
            return predictionsFormExistent
        },

        predictionsFormResults(predictionsFormResults = false, action) {
            switch(action.type) {
                case mutations.SHOW_PREDICTIONS_FORM_RESULTS:
                    return true
                case mutations.HIDE_PREDICTIONS_FORM_RESULTS:
                    return false
            }
            return predictionsFormResults
        },

        createPredictionsForm(createPredictionsForm = false, action) {
            switch(action.type) {
                case mutations.SHOW_CREATE_PREDICTIONS_FORM:
                    return true
                case mutations.HIDE_CREATE_PREDICTIONS_FORM:
                    return false
            }
            return createPredictionsForm
        },

        newPrediction(newPrediction = emptyPrediction, action) {
            switch(action.type) {
                case mutations.SET_RANDOM_PREDICTION:
                    return {
                        ...newPrediction,
                        leagueMatches: action.randomPrediction.leagueMatches,
                        r16Matches: action.randomPrediction.r16Matches,
                        quarterFinalMatches: action.randomPrediction.quarterFinalMatches,
                        semiFinalMatches: action.randomPrediction.semiFinalMatches,
                        finalMatches: action.randomPrediction.finalMatches,
                        winner: action.randomPrediction.winner,
                        topScorer: action.randomPrediction.topScorer,
                        leastConceded: action.randomPrediction.leastConceded
                    }
                case mutations.SET_GOALS_NEW_PREDICTION_LEAGUE:
                    return { 
                        ...newPrediction, 
                        leagueMatches: { ...newPrediction.leagueMatches, [action.matchKey]: { ...newPrediction.leagueMatches[action.matchKey], [action.team]: action.goals}}
                    }
                case mutations.SET_R16_TEAMS_NEW_PREDICTION:
                    return { ...newPrediction, r16Matches: action.r16Teams }
                case mutations.SET_GOALS_NEW_PREDICTION_R16:
                    return { 
                        ...newPrediction, 
                        r16Matches: { ...newPrediction.r16Matches, [action.matchKey]: { ...newPrediction.r16Matches[action.matchKey], [action.team]: action.goals}}
                    }
                case mutations.SET_QF_TEAMS_NEW_PREDICTION:
                    return { ...newPrediction, quarterFinalMatches: action.quarterFinalTeams }
                case mutations.SET_GOALS_NEW_PREDICTION_QF:
                    return { 
                        ...newPrediction, 
                        quarterFinalMatches: { ...newPrediction.quarterFinalMatches, [action.matchKey]: { ...newPrediction.quarterFinalMatches[action.matchKey], [action.team]: action.goals}}
                    }
                case mutations.SET_SF_TEAMS_NEW_PREDICTION:
                    return { ...newPrediction, semiFinalMatches: action.semiFinalTeams }
                case mutations.SET_GOALS_NEW_PREDICTION_SF:
                    return { 
                        ...newPrediction, 
                        semiFinalMatches: { ...newPrediction.semiFinalMatches, [action.matchKey]: { ...newPrediction.semiFinalMatches[action.matchKey], [action.team]: action.goals}}
                    }
                case mutations.SET_FINAL_TEAMS_NEW_PREDICTION:
                    return { ...newPrediction, finalMatches: action.finalTeams }
                case mutations.SET_GOALS_NEW_PREDICTION_FINAL:
                    return { 
                        ...newPrediction, 
                        finalMatches: { ...newPrediction.finalMatches, [action.matchKey]: { ...newPrediction.finalMatches[action.matchKey], [action.team]: action.goals}}
                    }
                case mutations.SET_EURO_WINNER_TEAM_NEW_PREDICTION:
                    return { ...newPrediction, winner: action.euroWinnerTeam }
                case mutations.SET_TOP_SCORER_TEAM_NEW_PREDICTION:
                    return { ...newPrediction, topScorer: action.topScorerTeam }
                case mutations.SET_LEAST_CONCEDED_TEAM_NEW_PREDICTION:
                    return { ...newPrediction, leastConceded: action.leastConcededTeam }
                case mutations.RESET_PREDICTION_CREATION_FORM:
                    return emptyPrediction
                default:
                    return newPrediction
            } 
        },

        newPredictionUsername(newPredictionUsername = "", action) {
            switch (action.type) {
                case mutations.SET_USERNAME_NEW_PREDICTION:
                    return action.username
                case mutations.RESET_PREDICTION_CREATION_FORM:
                    return ""
            }
            return newPredictionUsername
        },

        generatingRandomPredictions(generatingRandomPredictions = false, action) {
            switch (action.type) {
                case mutations.RANDOM_PREDICTIONS_LOADING:
                    return true
                case mutations.RANDOM_PREDICTIONS_LOADED:
                    return false
            }
            return generatingRandomPredictions
        },
        predictionsSubmitted(predictionsSubmitted = false, action) {
            switch(action.type) {
                case mutations.SHOW_PREDICTIONS_SUBMITTED:
                    return true
                case mutations.HIDE_PREDICTIONS_SUBMITTED:
                    return false
            }
            return predictionsSubmitted
        },

        predictions(predictions = defaultState.predictions, action) {
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.predictions
                case mutations.CREATE_PREDICTION:
                    return { 
                        ...predictions, 
                        byId: { 
                            ...predictions.byId, 
                            [action.predictionID]: {
                                owner: action.predictionID,
                                winner: action.prediction.winner,
                                topScorer: action.prediction.topScorer,
                                leastConceded: action.prediction.leastConceded,
                                leagueMatches: action.prediction.leagueMatches,
                                r16Matches: action.prediction.r16Matches,
                                quarterFinalMatches: action.prediction.quarterFinalMatches,
                                semiFinalMatches: action.prediction.semiFinalMatches,
                                finalMatches: action.prediction.finalMatches
                            }
                        },
                        allIds: [ ...predictions.allIds, action.predictionID]
                    }
                case mutations.UPDATE_PREDICTION:
                    return {
                        ...predictions,
                        byId: {
                            ...predictions.byId,
                            [action.predictionID]: action.prediction
                        }
                    }
                case mutations.SET_GOALS_LEAGUE:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], leagueMatches: { ...predictions.byId[action.predictionID].leagueMatches, [action.leagueMatchKey]: { ...predictions.byId[action.predictionID].leagueMatches[action.leagueMatchKey], [action.team]: action.goals}}}}}
                case mutations.SET_R16_TEAMS:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], r16Matches: action.r16Teams }}}
                case mutations.SET_GOALS_R16:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], r16Matches: { ...predictions.byId[action.predictionID].r16Matches, [action.r16MatchKey]: { ...predictions.byId[action.predictionID].r16Matches[action.r16MatchKey], [action.team]: action.goals}}}}}
                case mutations.SET_QF_TEAMS:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], quarterFinalMatches: action.quarterFinalTeams}}}
                case mutations.SET_GOALS_QF:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], quarterFinalMatches: { ...predictions.byId[action.predictionID].quarterFinalMatches, [action.quarterFinalMatchKey]: { ...predictions.byId[action.predictionID].quarterFinalMatches[action.quarterFinalMatchKey], [action.team]: action.goals}}}}}
                case mutations.SET_SF_TEAMS:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], semiFinalMatches: action.semiFinalTeams }}}
                case mutations.SET_GOALS_SF:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], semiFinalMatches: { ...predictions.byId[action.predictionID].semiFinalMatches, [action.semiFinalMatchKey]: { ...predictions.byId[action.predictionID].semiFinalMatches[action.semiFinalMatchKey], [action.team]: action.goals}}}}}
                case mutations.SET_FINAL_TEAMS:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], finalMatches: action.finalTeams }}}
                case mutations.SET_GOALS_FINAL:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], finalMatches: { ...predictions.byId[action.predictionID].finalMatches, [action.finalMatchKey]: { ...predictions.byId[action.predictionID].finalMatches[action.finalMatchKey], [action.team]: action.goals}}}}}
                case mutations.SET_EURO_WINNER_TEAM:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], winner: action.euroWinnerTeam }}}
                case mutations.SET_TOP_SCORER_TEAM:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], topScorer: action.topScorerTeam }}}
                case mutations.SET_LEAST_CONCEDED_TEAM:
                    return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], leastConceded: action.leastConcededTeam }}}
                default:
                    return predictions
            } 
        },
        users(users = defaultState.users, action) {
            switch(action.type) {
                case mutations.SET_STATE:
                    return action.state.users
                case mutations.CREATE_USER:
                    return { 
                        ...users, 
                        byId: {
                            ...users.byId,
                            [action.userID]: {
                                id: action.userID,
                                username: action.username
                            }
                        },
                        allIds: [ ...users.allIds, action.userID]
                    }
                case mutations.SET_USERNAME:
                    return { 
                        ...users,
                        byId: {
                            ...users.byId,
                            [action.userID]: {
                                ...users.byId[action.userID],
                                username: action.username
                            }
                        }
                    }
                default:
                    return users
            }
        },

    }),
    applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga])
} 
