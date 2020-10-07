export const GENERATE_RANDOM_PREDICTIONS_REQUEST = 'GENERATE_RANDOM_PREDICTIONS_REQUEST'
export const SET_RANDOM_PREDICTION = 'SET_RANDOM_PREDICTION'
export const RANDOM_PREDICTIONS_LOADING = 'RANDOM_PREDICTIONS_LOADING'
export const RANDOM_PREDICTIONS_LOADED = 'RANDOM_PREDICTIONS_LOADED'


export const generateRandomPredictionsRequest = (predictionType, predictionID) => ({
    type: GENERATE_RANDOM_PREDICTIONS_REQUEST,
    predictionType, 
    predictionID
})

export const setRandomPredictionNew = (randomPrediction) => ({
    type: SET_RANDOM_PREDICTION,
    randomPrediction
})

export const randomPredictionsLoading = () => ({
    type: RANDOM_PREDICTIONS_LOADING
})

export const randomPredictionsLoaded = () => ({
    type: RANDOM_PREDICTIONS_LOADED
})