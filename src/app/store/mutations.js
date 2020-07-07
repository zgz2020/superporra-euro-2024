// export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
// export const SET_TASK_GROUP = `SET_TASK_GROUP`;
// export const SET_TASK_NAME = `SET_TASK_NAME`;
// export const ADD_TASK_COMMENT = `ADD_TASK_COMMENT`;
// export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
// export const CREATE_TASK = `CREATE_TASK`;
// export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
// export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
// export const AUTHENTICATING = `AUTHENTICATING`;
// export const AUTHENTICATED = `AUTHENTICATED`;
// export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
// export const SET_STATE = `SET_STATE`;
// export const USERNAME_RESERVED = `USERNAME_RESERVED`;
// export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;

// export const setTaskCompletion = (id, isComplete = true)=>({
//     type:SET_TASK_COMPLETE,
//     taskID:id,
//     isComplete
// });

// export const addTaskComment = (commentID, taskID, ownerID, content)=>({
//     type:ADD_TASK_COMMENT,
//     id:commentID,
//     task: taskID,
//     owner: ownerID,
//     content
// });

// export const requestTaskCreation = (groupID)=>({
//     type:REQUEST_TASK_CREATION,
//     groupID
// });

// export const createTask = (taskID, groupID, ownerID)=>({
//     type:CREATE_TASK,
//     taskID,
//     groupID,
//     ownerID
// });

// export const setTaskGroup = (taskID, groupID)=>({
//     type:SET_TASK_GROUP,
//     taskID,
//     groupID
// });

// export const setTaskName = (taskID, name)=>({
//     type:SET_TASK_NAME,
//     taskID,
//     name
// });

// export const requestAuthenticateUser = (username, password)=>({
//     type:REQUEST_AUTHENTICATE_USER,
//     username,
//     password
// });

// export const processAuthenticateUser = (status = AUTHENTICATING, session = null)=>({
//     type: PROCESSING_AUTHENTICATE_USER,
//     session,
//     authenticated: status
// });

// export const setState = (state = {})=>({
//     type:SET_STATE,
//     state
// });


// export const requestCreateUserAccount = (username,password)=>({
//     type:REQUEST_USER_ACCOUNT_CREATION,
//     username,
//     password
// });


// ----------------------------------------------------------
// ----------------------------------------------------------


// ----- CREATE PREDICTION -----

export const REQUEST_PREDICTION_CREATION = 'REQUEST_PREDICTION_CREATION'
export const CREATE_PREDICTION = 'CREATE_PREDICTION'
export const CREATE_USER = 'CREATE_USER'
export const RESET_PREDICTION_CREATION_FORM = 'RESET_PREDICTION_CREATION_FORM'


// ----- UPDATE PREDICTION -----

export const REQUEST_PREDICTION_UPDATE = 'REQUEST_PREDICTION_UPDATE'
export const UPDATE_PREDICTION = 'UPDATE_PREDICTION'


// ----- NEW PREDICTION -----

export const SET_USERNAME_NEW_PREDICTION = 'SET_USERNAME_NEW_PREDICTION'

export const GENERATE_RANDOM_PREDICTIONS_REQUEST = 'GENERATE_RANDOM_PREDICTIONS_REQUEST'
export const SET_RANDOM_PREDICTION = 'SET_RANDOM_PREDICTION'
export const RANDOM_PREDICTIONS_LOADING = 'RANDOM_PREDICTIONS_LOADING'
export const RANDOM_PREDICTIONS_LOADED = 'RANDOM_PREDICTIONS_LOADED'

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

export const SET_GOALS_NEW_PREDICTION_FINAL = 'SET_GOALS_NEW_PREDICTION_FINAL'

export const SET_PREDICTION_FIELD_NEW_PREDICTION = 'SET_PREDICTION_FIELD_NEW_PREDICTION'


// ----- UPDATE PREDICTION -----

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

export const SET_GOALS_FINAL = 'SET_GOALS_FINAL'

export const SET_PREDICTION_FIELD = 'SET_PREDICTION_FIELD'


// ----- OTHER -----

export const SHOW_PREDICTIONS_FORM_NEW = 'SHOW_PREDICTIONS_FORM_NEW'
export const HIDE_PREDICTIONS_FORM_NEW = 'HIDE_PREDICTIONS_FORM_NEW'
export const SHOW_PREDICTIONS_FORM_EXISTENT = 'SHOW_PREDICTIONS_FORM_EXISTENT'
export const HIDE_PREDICTIONS_FORM_EXISTENT = 'HIDE_PREDICTIONS_FORM_EXISTENT'
export const SHOW_PREDICTIONS_FORM_RESULTS = 'SHOW_PREDICTIONS_FORM_RESULTS'
export const HIDE_PREDICTIONS_FORM_RESULTS = 'HIDE_PREDICTIONS_FORM_RESULTS'


export const SHOW_CREATE_PREDICTIONS_FORM = 'SHOW_CREATE_PREDICTIONS_FORM'
export const HIDE_CREATE_PREDICTIONS_FORM = 'HIDE_CREATE_PREDICTIONS_FORM'
export const SHOW_PREDICTIONS_SUBMITTED = 'SHOW_PREDICTIONS_SUBMITTED'
export const HIDE_PREDICTIONS_SUBMITTED = 'HIDE_PREDICTIONS_SUBMITTED'

export const GET_MONGO_DATA = 'GET_MONGO_DATA'
export const SET_STATE = 'SET_STATE'

// ----- NOT USED AT THE MOMENT ------

export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER'
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER'
export const AUTHENTICATING = 'AUTHENTICATING'
export const AUTHENTICATED = 'AUTHENTICATED'
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'

// ------------------------------------



// ----- GET DATA FROM MONGO DATABASE -----

export const getMongoData = () => ({
    type: GET_MONGO_DATA,
    getData: true
})

export const setState = ( state = {} ) => ({
    type: SET_STATE,
    state
})



// ----- CREATE PREDICTION -----

export const requestPredictionCreation = (username, prediction) => ({
    type: REQUEST_PREDICTION_CREATION,
    username,
    prediction
})

export const createPrediction = (predictionID, prediction) => ({
    type: CREATE_PREDICTION,
    predictionID,
    prediction
})

export const createUser = (userID, username) => ({
    type: CREATE_USER,
    userID,
    username
})

export const resetPredictionCreationForm = () => ({
    type: RESET_PREDICTION_CREATION_FORM
})

// ----- UPDATE PREDICTION -----

export const requestPredictionUpdate = (userID, username, prediction) => ({
    type: REQUEST_PREDICTION_UPDATE,
    userID,
    username,
    prediction
})

export const updatePrediction = (predictionID, prediction) => ({
    type: UPDATE_PREDICTION,
    predictionID,
    prediction
})


// ----- NEW PREDICTION -----

export const setUsernameNewPrediction = (username) => ({
    type: SET_USERNAME_NEW_PREDICTION,
    username
})


export const generateRandomPredictionsRequest = (predictionType, userID) => ({
    type: GENERATE_RANDOM_PREDICTIONS_REQUEST,
    predictionType, 
    userID
})

export const setRandomPredictionNew = (randomPrediction) => ({
    type: SET_RANDOM_PREDICTION,
    randomPrediction
})

export const randomPredictionsLoading = () => ({
    type: RANDOM_PREDICTIONS_LOADING
})

export const randomPredictionsLoaded = () => ({
    type: RANDOM_PREDICTIONS_LOADED
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


export const setGoalsNewPredictionFinal = (matchKey, team, goals) => ({
    type: SET_GOALS_NEW_PREDICTION_FINAL,
    matchKey,
    team,
    goals
})


export const setPredictionFieldNewPrediction = (field, prediction) => ({
    type: SET_PREDICTION_FIELD_NEW_PREDICTION,
    field,
    prediction
})



// ----- UPDATE PREDICTION -----

export const setUsername = (username, userID) => ({
    type: SET_USERNAME,
    username,
    userID
})


export const setGoalsLeague = (predictionID, leagueMatchKey, team, goals) => ({
    type: SET_GOALS_LEAGUE,
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


export const setGoalsFinal = (predictionID, finalMatchKey, team, goals) => ({
    type: SET_GOALS_FINAL,
    predictionID,
    finalMatchKey,
    team,
    goals
})


export const setPredictionField = (predictionID, field, prediction) => ({
    type: SET_PREDICTION_FIELD,
    predictionID,
    field,
    prediction
})



// ----- OTHER -----

export const showPredictionsFormNew = () => ({
    type: SHOW_PREDICTIONS_FORM_NEW
})
export const hidePredictionsFormNew = () => ({
    type: HIDE_PREDICTIONS_FORM_NEW
})

export const showPredictionsFormExistent = () => ({
    type: SHOW_PREDICTIONS_FORM_EXISTENT
})
export const hidePredictionsFormExistent = () => ({
    type: HIDE_PREDICTIONS_FORM_EXISTENT
})

export const showPredictionsFormResults = () => ({
    type: SHOW_PREDICTIONS_FORM_RESULTS
})
export const hidePredictionsFormResults = () => ({
    type: HIDE_PREDICTIONS_FORM_RESULTS
})

export const showPredictionsSubmitted = () => ({
    type: SHOW_PREDICTIONS_SUBMITTED
})
export const hidePredictionsSubmitted = () => ({
    type: HIDE_PREDICTIONS_SUBMITTED
})


// --- code below this line CURRENTLY NOT IN USE ---

// export const requestAuthenticateUser = (username, password) => ({
//     type: REQUEST_AUTHENTICATE_USER,
//     username,
//     password
// })

// export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
//     type: PROCESSING_AUTHENTICATE_USER,
//     session,
//     authenticated: status
// })
