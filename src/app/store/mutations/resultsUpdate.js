export const UPDATE_RESULTS = 'UPDATE_RESULTS'

export const SET_R16_TEAMS_RESULTS = 'SET_R16_TEAMS_RESULTS'
export const UPDATED_R16_TEAMS_RESULTS = 'UPDATED_R16_TEAMS_RESULTS'

export const SET_QF_TEAMS_RESULTS = 'SET_QF_TEAMS_RESULTS'
export const UPDATED_QF_TEAMS_RESULTS = 'UPDATED_QF_TEAMS_RESULTS'

export const SET_SF_TEAMS_RESULTS = 'SET_SF_TEAMS_RESULTS'
export const UPDATED_SF_TEAMS_RESULTS = 'UPDATED_SF_TEAMS_RESULTS'

export const SET_FINAL_TEAMS_RESULTS = 'SET_FINAL_TEAMS_RESULTS'
export const UPDATED_FINAL_TEAMS_RESULTS = 'UPDATED_FINAL_TEAMS_RESULTS'

export const SET_EURO_WINNER_TEAM_RESULTS = 'SET_EURO_WINNER_TEAM_RESULTS'
export const SET_TOP_SCORER_TEAM_RESULTS = 'SET_TOP_SCORER_TEAM_RESULTS'
export const SET_LEAST_CONCEDED_TEAM_RESULTS = 'SET_LEAST_CONCEDED_TEAM_RESULTS'


export const updateResults = (results) => ({
    type: UPDATE_RESULTS,
    results
})

export const setR16TeamsResults = (r16Teams) => ({
    type: SET_R16_TEAMS_RESULTS,
    r16Teams
})

export const updatedR16TeamsResults= () => ({
    type: UPDATED_R16_TEAMS_RESULTS
})

export const setQuarterFinalTeamsResults = (quarterFinalTeams) => ({
    type: SET_QF_TEAMS_RESULTS,
    quarterFinalTeams
})

export const updatedQuarterFinalTeamsResults = () => ({
    type: UPDATED_QF_TEAMS_RESULTS
})


export const setSemiFinalTeamsResults = (semiFinalTeams) => ({
    type: SET_SF_TEAMS_RESULTS,
    semiFinalTeams
})

export const updatedSemiFinalTeamsResults = () => ({
    type: UPDATED_SF_TEAMS_RESULTS
})

export const setFinalTeamsResults = (finalTeams) => ({
    type: SET_FINAL_TEAMS_RESULTS,
    finalTeams
})

export const updatedFinalTeamsResults = () => ({
    type: UPDATED_FINAL_TEAMS_RESULTS
})

export const setEuroWinnerTeamResults = (euroWinnerTeam) => ({
    type: SET_EURO_WINNER_TEAM_RESULTS,
    euroWinnerTeam
})

export const setTopScorerTeamResults = (topScorerTeam) => ({
    type: SET_TOP_SCORER_TEAM_RESULTS,
    topScorerTeam
})

export const setLeastConcededTeamResults = (leastConcededTeam) => ({
    type: SET_LEAST_CONCEDED_TEAM_RESULTS,
    leastConcededTeam
})