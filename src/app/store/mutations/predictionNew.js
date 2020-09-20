export const SET_USERNAME_NEW_PREDICTION = 'SET_USERNAME_NEW_PREDICTION'

export const SET_GOALS_NEW_PREDICTION_LEAGUE = 'SET_GOALS_NEW_PREDICTION_LEAGUE'
export const SET_R16_TEAMS_NEW_PREDICTION = 'SET_R16_TEAMS_NEW_PREDICTION'
export const UPDATED_R16_TEAMS_NEW_PREDICTION = 'UPDATED_R16_TEAMS_NEW_PREDICTION'

export const SET_GOALS_NEW_PREDICTION_R16 = 'SET_GOALS_NEW_PREDICTION_R16'
export const SET_QF_TEAMS_NEW_PREDICTION = 'SET_QF_TEAMS_NEW_PREDICTION'
export const UPDATED_QF_TEAMS_NEW_PREDICTION = 'UPDATED_QF_TEAMS_NEW_PREDICTION'

export const SET_GOALS_NEW_PREDICTION_QF = 'SET_GOALS_NEW_PREDICTION_QF'
export const SET_SF_TEAMS_NEW_PREDICTION = 'SET_SF_TEAMS_NEW_PREDICTION'
export const UPDATED_SF_TEAMS_NEW_PREDICTION = 'UPDATED_SF_TEAMS_NEW_PREDICTION'

export const SET_GOALS_NEW_PREDICTION_SF = 'SET_GOALS_NEW_PREDICTION_SF'
export const SET_FINAL_TEAMS_NEW_PREDICTION = 'SET_FINAL_TEAMS_NEW_PREDICTION'
export const UPDATED_FINAL_TEAMS_NEW_PREDICTION = 'UPDATED_FINAL_TEAMS_NEW_PREDICTION'

export const SET_GOALS_NEW_PREDICTION_FINAL = 'SET_GOALS_NEW_PREDICTION_FINAL'
export const SET_EURO_WINNER_TEAM_NEW_PREDICTION = 'SET_EURO_WINNER_TEAM_NEW_PREDICTION'
export const SET_TOP_SCORER_TEAM_NEW_PREDICTION = 'SET_TOP_SCORER_TEAM_NEW_PREDICTION'
export const SET_LEAST_CONCEDED_TEAM_NEW_PREDICTION = 'SET_LEAST_CONCEDED_TEAM_NEW_PREDICTION'

// export const SET_PREDICTION_FIELD_NEW_PREDICTION = 'SET_PREDICTION_FIELD_NEW_PREDICTION'



export const setUsernameNewPrediction = (username) => ({
    type: SET_USERNAME_NEW_PREDICTION,
    username
})

export const setGoalsNewPredictionLeague = (matchKey, team, goals) => ({
    type: SET_GOALS_NEW_PREDICTION_LEAGUE,
    matchKey,
    team,
    goals
})

export const setR16TeamsNewPrediction = (r16Teams) => ({
    type: SET_R16_TEAMS_NEW_PREDICTION,
    r16Teams
})

export const updatedR16TeamsNewPrediction= () => ({
    type: UPDATED_R16_TEAMS_NEW_PREDICTION
})


export const setGoalsNewPredictionR16 = (matchKey, team, goals) => ({
    type: SET_GOALS_NEW_PREDICTION_R16,
    matchKey,
    team,
    goals
})

export const setQuarterFinalTeamsNewPrediction = (quarterFinalTeams) => ({
    type: SET_QF_TEAMS_NEW_PREDICTION,
    quarterFinalTeams
})

export const updatedQuarterFinalTeamsNewPrediction = () => ({
    type: UPDATED_QF_TEAMS_NEW_PREDICTION
})


export const setGoalsNewPredictionQuarterFinal = (matchKey, team, goals) => ({
    type: SET_GOALS_NEW_PREDICTION_QF,
    matchKey,
    team,
    goals
})

export const setSemiFinalTeamsNewPrediction = (semiFinalTeams) => ({
    type: SET_SF_TEAMS_NEW_PREDICTION,
    semiFinalTeams
})

export const updatedSemiFinalTeamsNewPrediction = () => ({
    type: UPDATED_SF_TEAMS_NEW_PREDICTION
})


export const setGoalsNewPredictionSemiFinal = (matchKey, team, goals) => ({
    type: SET_GOALS_NEW_PREDICTION_SF,
    matchKey,
    team,
    goals
})

export const setFinalTeamsNewPrediction = (finalTeams) => ({
    type: SET_FINAL_TEAMS_NEW_PREDICTION,
    finalTeams
})

export const updatedFinalTeamsNewPrediction = () => ({
    type: UPDATED_FINAL_TEAMS_NEW_PREDICTION
})


export const setGoalsNewPredictionFinal = (matchKey, team, goals) => ({
    type: SET_GOALS_NEW_PREDICTION_FINAL,
    matchKey,
    team,
    goals
})

export const setEuroWinnerTeamNewPrediction = (euroWinnerTeam) => ({
    type: SET_EURO_WINNER_TEAM_NEW_PREDICTION,
    euroWinnerTeam
})

export const setTopScorerTeamNewPrediction = (topScorerTeam) => ({
    type: SET_TOP_SCORER_TEAM_NEW_PREDICTION,
    topScorerTeam
})

export const setLeastConcededTeamNewPrediction = (leastConcededTeam) => ({
    type: SET_LEAST_CONCEDED_TEAM_NEW_PREDICTION,
    leastConcededTeam
})


// export const setPredictionFieldNewPrediction = (field, prediction) => ({
//     type: SET_PREDICTION_FIELD_NEW_PREDICTION,
//     field,
//     prediction
// })
