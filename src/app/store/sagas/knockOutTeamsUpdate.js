import { take, put, select } from 'redux-saga/effects'
import {
    getR16Teams,
    getQuarterFinalTeams,
    getSemiFinalTeams,
    getFinalTeams,
    getEuroWinner,
    getTopScorer,
    getLeastConceded
} from '../../../utils/predictions'
import * as selectors from '../selectors'
import * as mutations from '../mutations'
import { predictions } from '../reducers/predictions'


export function* getTeamsAfterGoalsUpdateSaga() {
    while (true) {
        let { predictionType, stage, predictionID } = yield take(mutations.GOALS_UPDATED)

        console.log('AfterGOALS SAGA - PredID: ', predictionID)

        yield put(mutations.updateTeamsRequest(predictionType, stage, predictionID))
    }
}

export function* getTeamsAfterTeamsUpdateSaga() {
    while (true) {
        let { predictionType, stage, predictionID } = yield take(mutations.TEAMS_UPDATED)

        console.log('AfterTEAMS SAGA - PredID: ', predictionID)

        yield put(mutations.updateTeamsRequest(predictionType, stage, predictionID))
    }
}


export function* getTeamsSaga() {
    while (true) {
        let { predictionType, stage, predictionID } = yield take(mutations.UPDATE_TEAMS_REQUEST)

        console.log('getTeamsSAGA - predictionID: ', predictionID)

        // Gets newPrediction/predictions/results state from store
        let predictionsOrResults = {}
        if (predictionType === 'new') predictionsOrResults = yield select(selectors.getNewPrediction)
        if (predictionType === 'existent') { 
            let allPredictions = yield select(selectors.getPredictions)
            predictionsOrResults = allPredictions.byId[predictionID] 
        }
        if (predictionType === 'results') predictionsOrResults = yield select(selectors.getResults)
        
        console.log('getTeamsSAGA - predictionsOrResults: ', predictionsOrResults)

        if (stage === 'leagueMatches') {
            // Gets the R16 teams according to the prediction data
            let r16Teams = getR16Teams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with R16 teams
            if (predictionType === 'new') yield put(mutations.setR16TeamsNewPrediction(r16Teams))
            if (predictionType === 'existent') yield put(mutations.setR16TeamsExistentPrediction(r16Teams, predictionID))
            if (predictionType === 'results') yield put(mutations.setR16TeamsResults(r16Teams))

            // Triggers action to update QF teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'r16Matches', predictionID)) 
        }

        if (stage === 'r16Matches') {
            // Gets the Quarter Final teams according to the prediction data
            let quarterFinalTeams = getQuarterFinalTeams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with QF teams
            if (predictionType === 'new') yield put(mutations.setQuarterFinalTeamsNewPrediction(quarterFinalTeams))
            if (predictionType === 'existent') yield put(mutations.setQuarterFinalTeamsExistentPrediction(quarterFinalTeams, predictionID))
            if (predictionType === 'results') yield put(mutations.setQuarterFinalTeamsResults(quarterFinalTeams))

            // Triggers action to update SF/ teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'quarterFinalMatches', predictionID)) 
        }

        if (stage === 'quarterFinalMatches') {
            // Gets the Semi Final teams according to the prediction data
            let semiFinalTeams = getSemiFinalTeams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with SF teams
            if (predictionType === 'new') yield put(mutations.setSemiFinalTeamsNewPrediction(semiFinalTeams))
            if (predictionType === 'existent') yield put(mutations.setSemiFinalTeamsExistentPrediction(semiFinalTeams, predictionID))
            if (predictionType === 'results') yield put(mutations.setSemiFinalTeamsResults(semiFinalTeams))

            // Triggers action to update Final teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'semiFinalMatches', predictionID)) 
        }
        
        if (stage === 'semiFinalMatches') {
            // Gets the Semi Final teams according to the prediction data
            let finalTeams = getFinalTeams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with SF teams
            if (predictionType === 'new') yield put(mutations.setFinalTeamsNewPrediction(finalTeams))
            if (predictionType === 'existent') yield put(mutations.setFinalTeamsExistentPrediction(finalTeams, predictionID))
            if (predictionType === 'results') yield put(mutations.setFinalTeamsResults(finalTeams))

            // Triggers action to Winner/TopScorer/LeastConceded teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'finalMatches', predictionID)) 
        }

        if (stage === 'finalMatches') {
            // Gets Euro Winner team according to the prediction data
            const euroWinnerTeam = getEuroWinner(predictionsOrResults)
            const topScorerTeam = getTopScorer(predictionsOrResults)
            const leastConcededTeam = getLeastConceded(predictionsOrResults)

            // Updates newPrediction/Predictions/Results state with Euro Winner, Top Scorer and Least Conceded teams
            if (predictionType === 'new') {
                yield put(mutations.setEuroWinnerTeamNewPrediction(euroWinnerTeam))
                yield put(mutations.setTopScorerTeamNewPrediction(topScorerTeam))
                yield put(mutations.setLeastConcededTeamNewPrediction(leastConcededTeam))
            }
            if (predictionType === 'existent') {
                yield put(mutations.setEuroWinnerTeamExistentPrediction(euroWinnerTeam, predictionID))
                yield put(mutations.setTopScorerTeamExistentPrediction(topScorerTeam, predictionID))
                yield put(mutations.setLeastConcededTeamExistentPrediction(leastConcededTeam, predictionID))
            }
            if (predictionType === 'results') {
                yield put(mutations.setEuroWinnerTeamResults(euroWinnerTeam))
                yield put(mutations.setTopScorerTeamResults(topScorerTeam))
                yield put(mutations.setLeastConcededTeamResults(leastConcededTeam))
            }

        }
    } 
}
