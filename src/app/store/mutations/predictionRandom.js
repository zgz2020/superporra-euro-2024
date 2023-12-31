export const GENERATE_RANDOM_PREDICTIONS_REQUEST = 'GENERATE_RANDOM_PREDICTIONS_REQUEST'
export const SET_RANDOM_PREDICTION_NEW = 'SET_RANDOM_PREDICTION_NEW'
export const SET_RANDOM_PREDICTION_EXISTENT = 'SET_RANDOM_PREDICTION_EXISTENT'
export const RANDOM_PREDICTIONS_LOADING = 'RANDOM_PREDICTIONS_LOADING'
export const RANDOM_PREDICTIONS_LOADED = 'RANDOM_PREDICTIONS_LOADED'

export const SHOW_RANDOM_PREDICTIONS_GENERATED = 'SHOW_RANDOM_PREDICTIONS_GENERATED'
export const HIDE_RANDOM_PREDICTIONS_GENERATED = 'HIDE_RANDOM_PREDICTIONS_GENERATED'

export const generateRandomPredictionsRequest = (predictionType, predictionID) => ({
    type: GENERATE_RANDOM_PREDICTIONS_REQUEST,
    predictionType, 
    predictionID
})

export const setRandomPredictionNew = (randomPrediction) => ({
    type: SET_RANDOM_PREDICTION_NEW,
    randomPrediction
})
export const setRandomPredictionExistent = (predictionID, randomPrediction) => ({
    type: SET_RANDOM_PREDICTION_EXISTENT,
    predictionID,
    randomPrediction
})

export const randomPredictionsLoading = () => ({
    type: RANDOM_PREDICTIONS_LOADING
})

export const randomPredictionsLoaded = () => ({
    type: RANDOM_PREDICTIONS_LOADED
})

export const showRandomPredictionsGenerated = () => ({
    type: SHOW_RANDOM_PREDICTIONS_GENERATED
})
export const hideRandomPredictionsGenerated = () => ({
    type: HIDE_RANDOM_PREDICTIONS_GENERATED
})