export const SHOW_PRIVATE_LEAGUE_RANKINGS = 'SHOW_PRIVATE_LEAGUE_RANKINGS'

export const REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE = 'REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE'
export const SHOW_JOIN_LEAGUE_ERROR = 'SHOW_JOIN_LEAGUE_ERROR'
export const HIDE_JOIN_LEAGUE_ERROR = 'HIDE_JOIN_LEAGUE_ERROR'
export const SHOW_JOIN_LEAGUE_SUCCESS = 'SHOW_JOIN_LEAGUE_SUCCESS'
export const HIDE_JOIN_LEAGUE_SUCCESS = 'HIDE_JOIN_LEAGUE_SUCCESS'
export const ADD_PREDICTION_PRIVATE_LEAGUE = 'ADD_PREDICTION_PRIVATE_LEAGUE'
export const REMOVE_PREDICTION_PRIVATE_LEAGUE = 'REMOVE_PREDICTION_PRIVATE_LEAGUE'

export const CREATE_PRIVATE_LEAGUE = 'CREATE_PRIVATE_LEAGUE'
export const LEAGUE_NAME_VALIDATION = 'LEAGUE_NAME_VALIDATION'
export const SHOW_LEAGUE_NAME_TAKEN = 'SHOW_LEAGUE_NAME_TAKEN'
export const HIDE_LEAGUE_NAME_TAKEN = 'HIDE_LEAGUE_NAME_TAKEN'
export const SHOW_CREATE_PRIVATE_LEAGUE_SUCCESS = 'SHOW_CREATE_PRIVATE_LEAGUE_SUCCESS'
export const HIDE_CREATE_PRIVATE_LEAGUE_SUCCESS = 'HIDE_CREATE_PRIVATE_LEAGUE_SUCCESS'

export const SHOW_QUIT_LEAGUE_ERROR = 'SHOW_QUIT_LEAGUE_ERROR'
export const HIDE_QUIT_LEAGUE_ERROR = 'HIDE_QUIT_LEAGUE_ERROR'
export const SHOW_QUIT_LEAGUE_SUCCESS = 'SHOW_QUIT_LEAGUE_SUCCESS'
export const HIDE_QUIT_LEAGUE_SUCCESS = 'HIDE_QUIT_LEAGUE_SUCCESS'

export const showPrivateLeagueRankings = (privateLeague) => ({
    type: SHOW_PRIVATE_LEAGUE_RANKINGS,
    privateLeague
})


export const requestUpdatePredictionPrivateLeague = (action, predictionID, privateLeague, privateLeagueIndex) => ({
    type: REQUEST_UPDATE_PREDICTION_PRIVATE_LEAGUE,
    action,
    predictionID,
    privateLeague,
    privateLeagueIndex
})

export const showJoinLeagueSuccess= () => ({
    type: SHOW_JOIN_LEAGUE_SUCCESS
})

export const hideJoinLeagueSuccess= () => ({
    type: HIDE_JOIN_LEAGUE_SUCCESS
})

export const showJoinLeagueError = () => ({
    type: SHOW_JOIN_LEAGUE_ERROR
})

export const hideJoinLeagueError = () => ({
    type: HIDE_JOIN_LEAGUE_ERROR
})

export const addPredictionPrivateLeague = (predictionID, privateLeague) => ({
    type: ADD_PREDICTION_PRIVATE_LEAGUE,
    predictionID,
    privateLeague
})

export const removePredictionPrivateLeague = (predictionID, privateLeagueIndex) => ({
    type: REMOVE_PREDICTION_PRIVATE_LEAGUE,
    predictionID,
    privateLeagueIndex
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

export const leagueNameValidation = (leagueName) => ({
    type: LEAGUE_NAME_VALIDATION,
    leagueName
})

export const showLeagueNameTaken = () => ({
    type: SHOW_LEAGUE_NAME_TAKEN
})

export const hideLeagueNameTaken = () => ({
    type: HIDE_LEAGUE_NAME_TAKEN
})

export const showQuitLeagueError= () => ({
    type: SHOW_QUIT_LEAGUE_ERROR
})

export const hideQuitLeagueError= () => ({
    type: HIDE_QUIT_LEAGUE_ERROR
})

export const showQuitLeagueSuccess= () => ({
    type: SHOW_QUIT_LEAGUE_SUCCESS
})

export const hideQuitLeagueSuccess= () => ({
    type: HIDE_QUIT_LEAGUE_SUCCESS
})