import { take, put } from 'redux-saga/effects'
import * as mutations from '../mutations'

export function* setGoalsSaga() {
    while (true) {
        const { predictionType, predictionID, stage, matchKey, team, goals } = yield take(mutations.SET_GOALS_ALL)

        if (predictionType === 'new') yield put(mutations.setGoalsNewPrediction(stage, matchKey, team, goals))
        
        if (predictionType === 'existent') yield put(mutations.setGoalsExistentPrediction(predictionID, stage, matchKey, team, goals))

        if (predictionType === 'results') yield put(mutations.setGoalsResults(stage, matchKey, team, goals))        

        // Triggers action to update R16 / QF / SF / FINAL teams if needed
        yield put(mutations.goalsUpdated(predictionType, stage))
    }
}