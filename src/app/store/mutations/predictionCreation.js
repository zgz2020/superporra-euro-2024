export const REQUEST_PREDICTION_CREATION = 'REQUEST_PREDICTION_CREATION'
export const CREATE_PREDICTION = 'CREATE_PREDICTION'
export const RESET_PREDICTION_CREATION_FORM = 'RESET_PREDICTION_CREATION_FORM'

export const requestPredictionCreation = (userID, username, prediction) => ({
    type: REQUEST_PREDICTION_CREATION,
    userID,
    username,
    prediction
})

export const createPrediction = (predictionID, userID, username, prediction) => ({
    type: CREATE_PREDICTION,
    predictionID,
    userID,
    username,
    prediction
})

export const resetPredictionCreationForm = () => ({
    type: RESET_PREDICTION_CREATION_FORM
})