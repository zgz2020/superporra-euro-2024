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

export const USERNAME_VALIDATION = 'USERNAME_VALIDATION'
export const SHOW_NICKNAME_TAKEN = 'SHOW_NICKNAME_TAKEN'
export const HIDE_NICKNAME_TAKEN = 'HIDE_NICKNAME_TAKEN'


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


export const usernameValidation = (username) => ({
    type: USERNAME_VALIDATION,
    username
})

export const showNicknameTaken = () => ({
    type: SHOW_NICKNAME_TAKEN
})

export const hideNicknameTaken = () => ({
    type: HIDE_NICKNAME_TAKEN
})
