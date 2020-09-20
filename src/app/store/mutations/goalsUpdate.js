export const SET_GOALS_ALL = 'SET_GOALS_ALL'
export const GOALS_UPDATED = 'GOALS_UPDATED'

export const SET_GOALS_NEW_PREDICTION = 'SET_GOALS_NEW_PREDICTION'
export const SET_GOALS_EXISTENT_PREDICTION = 'SET_GOALS_EXISTENT_PREDICTION'
export const SET_GOALS_RESULTS = 'SET_GOALS_RESULTS'
// ---

export const GOALS_UPDATED_LEAGUE_NEW_PREDICTION = 'GOALS_UPDATED_LEAGUE_NEW_PREDICTION'
export const GOALS_UPDATED_R16_NEW_PREDICTION = 'GOALS_UPDATED_R16_NEW_PREDICTION'
export const GOALS_UPDATED_QUARTER_FINAL_NEW_PREDICTION = 'GOALS_UPDATED_QUARTER_FINAL_NEW_PREDICTION'
export const GOALS_UPDATED_SEMI_FINAL_NEW_PREDICTION = 'GOALS_UPDATED_SEMI_FINAL_NEW_PREDICTION'
export const GOALS_UPDATED_FINAL_NEW_PREDICTION = 'GOALS_UPDATED_FINAL_NEW_PREDICTION'

export const GOALS_UPDATED_LEAGUE_EXISTENT_PREDICTION = 'GOALS_UPDATED_LEAGUE_EXISTENT_PREDICTION'
export const GOALS_UPDATED_R16_EXISTENT_PREDICTION = 'GOALS_UPDATED_R16_EXISTENT_PREDICTION'
export const GOALS_UPDATED_QUARTER_FINAL_EXISTENT_PREDICTION = 'GOALS_UPDATED_QUARTER_FINAL_EXISTENT_PREDICTION'
export const GOALS_UPDATED_SEMI_FINAL_EXISTENT_PREDICTION = 'GOALS_UPDATED_SEMI_FINAL_EXISTENT_PREDICTION'
export const GOALS_UPDATED_FINAL_EXISTENT_PREDICTION = 'GOALS_UPDATED_FINAL_EXISTENT_PREDICTION'

export const GOALS_UPDATED_LEAGUE_RESULTS = 'GOALS_UPDATED_LEAGUE_RESULTS'
export const GOALS_UPDATED_R16_RESULTS = 'GOALS_UPDATED_R16_RESULTS'
export const GOALS_UPDATED_QUARTER_FINAL_RESULTS = 'GOALS_UPDATED_QUARTER_FINAL_RESULTS'
export const GOALS_UPDATED_SEMI_FINAL_RESULTS = 'GOALS_UPDATED_SEMI_FINAL_RESULTS'
export const GOALS_UPDATED_FINAL_RESULTS = 'GOALS_UPDATED_FINAL_RESULTS'

export const UPDATE_TEAMS_REQUEST = 'UPDATE_TEAMS_REQUEST'



export const setGoalsAll = (predictionType, predictionID, stage, matchKey, team, goals) => ({
    type: SET_GOALS_ALL,
    predictionType,
    predictionID,
    stage,
    matchKey,
    team,
    goals
})

export const goalsUpdated = (predictionType, stage) => ({
    type: GOALS_UPDATED,
    predictionType,
    stage
})

export const setGoalsNewPrediction = (stage, matchKey, team, goals) => ({
    type: SET_GOALS_NEW_PREDICTION,
    stage,
    matchKey,
    team,
    goals
})

export const setGoalsExistentPrediction = (predictionID, stage, matchKey, team, goals) => ({
    type: SET_GOALS_EXISTENT_PREDICTION,
    predictionID,
    stage, 
    matchKey,
    team,
    goals
})

export const setGoalsResults = (stage, matchKey, team, goals) => ({
    type: SET_GOALS_RESULTS,
    stage, 
    matchKey,
    team,
    goals
})

export const updateTeamsRequest = (predictionType, stage) => ({
    type: UPDATE_TEAMS_REQUEST,
    predictionType,
    stage
})