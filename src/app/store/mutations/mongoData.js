export const GET_MONGO_DATA = 'GET_MONGO_DATA'
export const SET_STATE = 'SET_STATE'
export const MONGO_DATA_LOADED = 'MONGO_DATA_LOADED'

// ----- GET DATA FROM MONGO DATABASE -----

export const getMongoData = () => ({
    type: GET_MONGO_DATA,
    getData: true
})

export const setState = ( state = {} ) => ({
    type: SET_STATE,
    state
})

export const mongoDataLoaded = () => ({
    type: MONGO_DATA_LOADED
})