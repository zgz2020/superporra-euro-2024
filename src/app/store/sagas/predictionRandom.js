import { take, put, delay } from 'redux-saga/effects'
import * as mutations from '../mutations'
import { generateRandomPredictions } from '../../../utils/randomPredictions'



export function* generateRandomPredictionsSaga() {
    while (true) {
        
        const { predictionType, predictionID } = yield take(mutations.GENERATE_RANDOM_PREDICTIONS_REQUEST)

        yield put(mutations.randomPredictionsLoading())
        // Wait for 0.1 seconds to allow the CTA to change state/label before running next line of code
        yield delay(100) 
    
        const randomPrediction = yield generateRandomPredictions()
        
        if(predictionType === "new") yield put(mutations.setRandomPredictionNew(randomPrediction))
        if(predictionType === "existent") yield put(mutations.updatePrediction(predictionID, randomPrediction))
    
        // Wait for half a second to make sure all random results have been generated and form updated
        // and then enable 'Generate random predictions' CTA
        yield delay(500) 
        yield put(mutations.randomPredictionsLoaded())
        // Hide predictionsIncomplete message, if present
        yield put(mutations.hidePredictionsIncomplete())
        // Show success message for 1.5 seconds
        yield put(mutations.showRandomPredictionsGenerated())
        yield delay(1000) 
        yield put(mutations.hideRandomPredictionsGenerated())
    }
}