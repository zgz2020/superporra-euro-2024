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


export function* getTeamsAfterGoalsUpdateSaga() {
    while (true) {
        let { predictionType, stage } = yield take(mutations.GOALS_UPDATED)

        yield put(mutations.updateTeamsRequest(predictionType, stage))
    }
}

export function* getTeamsAfterTeamsUpdateSaga() {
    while (true) {
        let { predictionType, stage } = yield take(mutations.TEAMS_UPDATED)

        yield put(mutations.updateTeamsRequest(predictionType, stage))
    }
}


export function* getTeamsSaga() {
    while (true) {
        let { predictionType, stage } = yield take(mutations.UPDATE_TEAMS_REQUEST)


        // Gets newPrediction/predictions/results state from store
        let predictionsOrResults = {}
        if (predictionType === 'new') predictionsOrResults = yield select(selectors.getNewPrediction)
        if (predictionType === 'existent') predictionsOrResults = yield select(selectors.getPredictions)
        if (predictionType === 'results') predictionsOrResults = yield select(selectors.getResults)
        

        if (stage === 'leagueMatches') {
            // Gets the R16 teams according to the prediction data
            let r16Teams = getR16Teams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with R16 teams
            if (predictionType === 'new') yield put(mutations.setR16TeamsNewPrediction(r16Teams))
            if (predictionType === 'existent') yield put(mutations.setR16TeamsExistentPrediction(r16Teams))
            if (predictionType === 'results') yield put(mutations.setR16TeamsResults(r16Teams))

            // Triggers action to update QF teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'r16Matches')) 
        }

        if (stage === 'r16Matches') {
            // Gets the Quarter Final teams according to the prediction data
            let quarterFinalTeams = getQuarterFinalTeams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with QF teams
            if (predictionType === 'new') yield put(mutations.setQuarterFinalTeamsNewPrediction(quarterFinalTeams))
            if (predictionType === 'existent') yield put(mutations.setQuarterFinalTeamsExistentPrediction(quarterFinalTeams))
            if (predictionType === 'results') yield put(mutations.setQuarterFinalTeamsResults(quarterFinalTeams))

            // Triggers action to update SF/ teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'quarterFinalMatches')) 
        }

        if (stage === 'quarterFinalMatches') {
            // Gets the Semi Final teams according to the prediction data
            let semiFinalTeams = getSemiFinalTeams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with SF teams
            if (predictionType === 'new') yield put(mutations.setSemiFinalTeamsNewPrediction(semiFinalTeams))
            if (predictionType === 'existent') yield put(mutations.setSemiFinalTeamsExistentPrediction(semiFinalTeams))
            if (predictionType === 'results') yield put(mutations.setSemiFinalTeamsResults(semiFinalTeams))

            // Triggers action to update Final teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'semiFinalMatches')) 
        }
        
        if (stage === 'semiFinalMatches') {
            // Gets the Semi Final teams according to the prediction data
            let finalTeams = getFinalTeams(predictionsOrResults) 

            // Updates newPrediction/Predictions/Results state with SF teams
            if (predictionType === 'new') yield put(mutations.setFinalTeamsNewPrediction(finalTeams))
            if (predictionType === 'existent') yield put(mutations.setFinalTeamsExistentPrediction(finalTeams))
            if (predictionType === 'results') yield put(mutations.setFinalTeamsResults(finalTeams))

            // Triggers action to Winner/TopScorer/LeastConceded teams if needed
            yield put(mutations.teamsUpdated(predictionType, 'finalMatches')) 
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
                yield put(mutations.setEuroWinnerTeamExistentPrediction(euroWinnerTeam))
                yield put(mutations.setTopScorerTeamExistentPrediction(topScorerTeam))
                yield put(mutations.setLeastConcededTeamExistentPrediction(leastConcededTeam))
            }
            if (predictionType === 'results') {
                yield put(mutations.setEuroWinnerTeamResults(euroWinnerTeam))
                yield put(mutations.setTopScorerTeamNResults(topScorerTeam))
                yield put(mutations.setLeastConcededTeamNResults(leastConcededTeam))
            }

        }
    } 
}
