export const REQUEST_PREDICTION_UPDATE = 'REQUEST_PREDICTION_UPDATE'
export const UPDATE_PREDICTION = 'UPDATE_PREDICTION'


export const SET_USERNAME = 'SET_USERNAME'


export const SET_GOALS_LEAGUE = 'SET_GOALS_LEAGUE'
export const SET_R16_TEAMS = 'SET_R16_TEAMS'
export const UPDATED_R16_TEAMS = 'UPDATED_R16_TEAMS'

export const SET_GOALS_R16 = 'SET_GOALS_R16'
export const SET_QF_TEAMS = 'SET_QF_TEAMS'
export const UPDATED_QF_TEAMS = 'UPDATED_QF_TEAMS'

export const SET_GOALS_QF = 'SET_GOALS_QF'
export const SET_SF_TEAMS = 'SET_SF_TEAMS'
export const UPDATED_SF_TEAMS = 'UPDATED_SF_TEAMS'

export const SET_GOALS_SF = 'SET_GOALS_SF'
export const SET_FINAL_TEAMS = 'SET_FINAL_TEAMS'
export const UPDATED_FINAL_TEAMS = 'UPDATED_FINAL_TEAMS'

export const SET_GOALS_FINAL = 'SET_GOALS_FINAL'
export const SET_EURO_WINNER_TEAM = 'SET_EURO_WINNER_TEAM'
export const SET_TOP_SCORER_TEAM = 'SET_TOP_SCORER_TEAM'
export const SET_LEAST_CONCEDED_TEAM = 'SET_LEAST_CONCEDED_TEAM'

export const SET_PREDICTION_FIELD = 'SET_PREDICTION_FIELD'


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


export const setUsername = (username, predictionID) => ({
    type: SET_USERNAME,
    username,
    predictionID
})



export const setGoalsLeague = (predictionID, leagueMatchKey, team, goals) => ({
    type: SET_GOALS_EXISTENT_PREDICTION,
    predictionID,
    leagueMatchKey,
    team,
    goals
})

export const setR16Teams = (predictionID, r16Teams) => ({
    type: SET_R16_TEAMS,
    r16Teams,
    predictionID
})

export const updatedR16Teams= (predictionID) => ({
    type: UPDATED_R16_TEAMS,
    predictionID
})


export const setGoalsR16 = (predictionID, r16MatchKey, team, goals) => ({
    type: SET_GOALS_R16,
    predictionID,
    r16MatchKey,
    team,
    goals
})

export const setQuarterFinalTeams = (predictionID, quarterFinalTeams) => ({
    type: SET_QF_TEAMS,
    quarterFinalTeams,
    predictionID
})

export const updatedQuarterFinalTeams = (predictionID) => ({
    type: UPDATED_QF_TEAMS,
    predictionID
})


export const setGoalsQuarterFinal = (predictionID, quarterFinalMatchKey, team, goals) => ({
    type: SET_GOALS_QF,
    predictionID,
    quarterFinalMatchKey,
    team,
    goals
})

export const setSemiFinalTeams = (predictionID, semiFinalTeams) => ({
    type: SET_SF_TEAMS,
    semiFinalTeams,
    predictionID
})

export const updatedSemiFinalTeams= (predictionID) => ({
    type: UPDATED_SF_TEAMS,
    predictionID
})


export const setGoalsSemiFinal = (predictionID, semiFinalMatchKey, team, goals) => ({
    type: SET_GOALS_SF,
    predictionID,
    semiFinalMatchKey,
    team,
    goals
})

export const setFinalTeams = (predictionID, finalTeams) => ({
    type: SET_FINAL_TEAMS,
    finalTeams,
    predictionID
})

export const updatedFinalTeams = (predictionID) => ({
    type: UPDATED_FINAL_TEAMS,
    predictionID
})


export const setGoalsFinal = (predictionID, finalMatchKey, team, goals) => ({
    type: SET_GOALS_FINAL,
    predictionID,
    finalMatchKey,
    team,
    goals
})

export const setEuroWinnerTeam = (predictionID, euroWinnerTeam) => ({
    type: SET_EURO_WINNER_TEAM,
    predictionID,
    euroWinnerTeam
})

export const setTopScorerTeam = (predictionID, topScorerTeam) => ({
    type: SET_TOP_SCORER_TEAM,
    predictionID,
    topScorerTeam
})

export const setLeastConcededTeam = (predictionID, leastConcededTeam) => ({
    type: SET_LEAST_CONCEDED_TEAM,
    predictionID,
    leastConcededTeam
})


export const setPredictionField = (predictionID, field, prediction) => ({
    type: SET_PREDICTION_FIELD,
    predictionID,
    field,
    prediction
})