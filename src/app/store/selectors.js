export const getNewPrediction = (state) => state.newPrediction

export const getPredictions = (state) => state.predictions

export const getResults = (state) => state.results

export const getUsers = (state) => state.users // state.users.allIds

export const getNicknames = (state) => state.predictions.allIds.map(predictionId => state.predictions.byId[predictionId].username)

// --- SELECTOR
// See https://stackoverflow.com/questions/37772877/how-to-get-something-from-the-state-store-inside-a-redux-saga-function
// OR 'select(selector, ...args)' in https://redux-saga.js.org/docs/api/
