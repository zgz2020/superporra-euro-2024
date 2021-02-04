export const REQUEST_PREDICTION_UPDATE = 'REQUEST_PREDICTION_UPDATE'
export const UPDATE_PREDICTION = 'UPDATE_PREDICTION'


export const SET_USERNAME_EXISTENT_PREDICTION = 'SET_USERNAME_EXISTENT_PREDICTION'

export const SET_R16_TEAMS_EXISTENT_PREDICTION = 'SET_R16_TEAMS_EXISTENT_PREDICTION'
export const UPDATED_R16_TEAMS_EXISTENT_PREDICTION = 'UPDATED_R16_TEAMS_EXISTENT_PREDICTION'

export const SET_QF_TEAMS_EXISTENT_PREDICTION = 'SET_QF_TEAMS_EXISTENT_PREDICTION'
export const UPDATED_QF_TEAMS_EXISTENT_PREDICTION = 'UPDATED_QF_TEAMS_EXISTENT_PREDICTION'

export const SET_SF_TEAMS_EXISTENT_PREDICTION = 'SET_SF_TEAMS_EXISTENT_PREDICTION'
export const UPDATED_SF_TEAMS_EXISTENT_PREDICTION = 'UPDATED_SF_TEAMS_EXISTENT_PREDICTION'

export const SET_FINAL_TEAMS_EXISTENT_PREDICTION = 'SET_FINAL_TEAMS_EXISTENT_PREDICTION'
export const UPDATED_FINAL_TEAMS_EXISTENT_PREDICTION = 'UPDATED_FINAL_TEAMS_EXISTENT_PREDICTION'

export const SET_EURO_WINNER_TEAM_EXISTENT_PREDICTION = 'SET_EURO_WINNER_TEAM_EXISTENT_PREDICTION'
export const SET_TOP_SCORER_TEAM_EXISTENT_PREDICTION = 'SET_TOP_SCORER_TEAM_EXISTENT_PREDICTION'
export const SET_LEAST_CONCEDED_TEAM_EXISTENT_PREDICTION = 'SET_LEAST_CONCEDED_TEAM_EXISTENT_PREDICTION'



export const requestPredictionUpdate = (predictionID, prediction, username) => ({
    type: REQUEST_PREDICTION_UPDATE,
    predictionID,
    prediction,
    username
})

export const updatePrediction = (predictionID, prediction) => ({
    type: UPDATE_PREDICTION,
    predictionID,
    prediction
})


export const setUsernameExistentPrediction = (predictionID, username) => ({
    type: SET_USERNAME_EXISTENT_PREDICTION,
    predictionID,
    username
})

export const setR16TeamsExistentPrediction = (r16Teams, predictionID) => ({
    type: SET_R16_TEAMS_EXISTENT_PREDICTION,
    r16Teams,
    predictionID
})

export const updatedR16TeamsExistentPrediction= () => ({
    type: UPDATED_R16_TEAMS_EXISTENT_PREDICTION
})

export const setQuarterFinalTeamsExistentPrediction = (quarterFinalTeams, predictionID) => ({
    type: SET_QF_TEAMS_EXISTENT_PREDICTION,
    quarterFinalTeams,
    predictionID
})

export const updatedQuarterFinalTeamsExistentPrediction = () => ({
    type: UPDATED_QF_TEAMS_EXISTENT_PREDICTION
})

export const setSemiFinalTeamsExistentPrediction = (semiFinalTeams, predictionID) => ({
    type: SET_SF_TEAMS_EXISTENT_PREDICTION,
    semiFinalTeams,
    predictionID
})

export const updatedSemiFinalTeamsExistentPrediction = () => ({
    type: UPDATED_SF_TEAMS_EXISTENT_PREDICTION
})

export const setFinalTeamsExistentPrediction = (finalTeams, predictionID) => ({
    type: SET_FINAL_TEAMS_EXISTENT_PREDICTION,
    finalTeams,
    predictionID
})

export const updatedFinalTeamsExistentPrediction = () => ({
    type: UPDATED_FINAL_TEAMS_EXISTENT_PREDICTION
})

export const setEuroWinnerTeamExistentPrediction = (euroWinnerTeam, predictionID) => ({
    type: SET_EURO_WINNER_TEAM_EXISTENT_PREDICTION,
    euroWinnerTeam,
    predictionID
})

export const setTopScorerTeamExistentPrediction = (topScorerTeam, predictionID) => ({
    type: SET_TOP_SCORER_TEAM_EXISTENT_PREDICTION,
    topScorerTeam,
    predictionID
})

export const setLeastConcededTeamExistentPrediction = (leastConcededTeam, predictionID) => ({
    type: SET_LEAST_CONCEDED_TEAM_EXISTENT_PREDICTION,
    leastConcededTeam,
    predictionID
})
