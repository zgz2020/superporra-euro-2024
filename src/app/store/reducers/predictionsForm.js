import * as mutations from '../mutations'

export const predictionsFormNew = (predictionsFormNew = false, action) => {
    switch(action.type) {
        case mutations.SHOW_PREDICTIONS_FORM_NEW:
            return true
        case mutations.HIDE_PREDICTIONS_FORM_NEW:
            return false
    }
    return predictionsFormNew
}

export const predictionsFormExistent = (predictionsFormExistent = false, action) => {
    switch(action.type) {
        case mutations.SHOW_PREDICTIONS_FORM_EXISTENT:
            return true
        case mutations.HIDE_PREDICTIONS_FORM_EXISTENT:
            return false
    }
    return predictionsFormExistent
}

export const predictionsFormResults = (predictionsFormResults = false, action) => {
    switch(action.type) {
        case mutations.SHOW_PREDICTIONS_FORM_RESULTS:
            return true
        case mutations.HIDE_PREDICTIONS_FORM_RESULTS:
            return false
    }
    return predictionsFormResults
}

export const createPredictionsForm = (createPredictionsForm = false, action) => {
    switch(action.type) {
        case mutations.SHOW_CREATE_PREDICTIONS_FORM:
            return true
        case mutations.HIDE_CREATE_PREDICTIONS_FORM:
            return false
    }
    return createPredictionsForm
}

export const generatingRandomPredictions = (generatingRandomPredictions = false, action) => {
    switch (action.type) {
        case mutations.RANDOM_PREDICTIONS_LOADING:
            return true
        case mutations.RANDOM_PREDICTIONS_LOADED:
            return false
    }
    return generatingRandomPredictions
}

export const predictionsSubmitted = (predictionsSubmitted = false, action) => {
    switch (action.type) {
        case mutations.SHOW_PREDICTIONS_SUBMITTED:
            return true
        case mutations.HIDE_PREDICTIONS_SUBMITTED:
            return false
    }
    return predictionsSubmitted
}

export const nicknameTaken = (nicknameTaken = false, action) => {
    switch (action.type) {
        case mutations.SHOW_NICKNAME_TAKEN:
            return true
        case mutations.HIDE_NICKNAME_TAKEN:
            return false
    }
    return nicknameTaken
}

export const noNickname = (noNickname = false, action) => {
    switch (action.type) {
        case mutations.SHOW_NO_NICKNAME:
            return true
        case mutations.HIDE_NO_NICKNAME:
            return false
    }
    return noNickname
}

export const randomPredictionsGenerated = (randomPredictionsGenerated = false, action) => {
    switch (action.type) {
        case mutations.SHOW_RANDOM_PREDICTIONS_GENERATED:
            return true
        case mutations.HIDE_RANDOM_PREDICTIONS_GENERATED:
            return false
    }
    return randomPredictionsGenerated
}

export const predictionsIncomplete = (predictionsIncomplete = false, action) => {
    switch (action.type) {
        case mutations.SHOW_PREDICTIONS_INCOMPLETE:
            return true
        case mutations.HIDE_PREDICTIONS_INCOMPLETE:
            return false
    }
    return predictionsIncomplete
}

export const joiningCompetitionSuccess = (joiningCompetitionSuccess = false, action) => {
    switch (action.type) {
        case mutations.SHOW_JOINING_COMPETITION_SUCCESS:
            return true
        case mutations.HIDE_JOINING_COMPETITION_SUCCESS:
            return false 
    }
    return joiningCompetitionSuccess
}