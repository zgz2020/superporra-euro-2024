import * as mutations from '../mutations'

export const mongoDataLoading = (mongoDataLoading = true, action) => {
    switch(action.type) {
        case mutations.MONGO_DATA_LOADED:
            return false
        case mutations.GET_MONGO_DATA:
            return true
    }
    return mongoDataLoading
}