export const SHOW_PRIVATE_LEAGUE_RANKINGS = 'SHOW_PRIVATE_LEAGUE_RANKINGS'
export const REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE = 'REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE'
export const UPDATE_PREDICTION_PRIVATE_LEAGUE = 'UPDATE_PREDICTION_PRIVATE_LEAGUE'
export const CREATE_PRIVATE_LEAGUE = 'CREATE_PRIVATE_LEAGUE'
export const SHOW_CREATE_PRIVATE_LEAGUE_SUCCESS = 'SHOW_CREATE_PRIVATE_LEAGUE_SUCCESS'
export const HIDE_CREATE_PRIVATE_LEAGUE_SUCCESS = 'HIDE_CREATE_PRIVATE_LEAGUE_SUCCESS'


export const showPrivateLeagueRankings = (privateLeague) => ({
    type: SHOW_PRIVATE_LEAGUE_RANKINGS,
    privateLeague
})

export const requestUpdatePredictionPrivateLeague = (username, privateLeague) => ({
    type: REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE,
    username,
    privateLeague
})

export const updatePredictionPrivateLeague = (predictionID, privateLeague) => ({
    type: UPDATE_PREDICTION_PRIVATE_LEAGUE,
    predictionID,
    privateLeague
})

export const createPrivateLeague = (leagueName) => ({
    type: CREATE_PRIVATE_LEAGUE,
    leagueName
})

export const showCreateLeagueSuccess = () => ({
    type: SHOW_CREATE_PRIVATE_LEAGUE_SUCCESS
})

export const hideCreateLeagueSuccess = () => ({
    type: HIDE_CREATE_PRIVATE_LEAGUE_SUCCESS
})