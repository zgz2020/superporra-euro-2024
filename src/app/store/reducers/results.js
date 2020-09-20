import * as mutations from '../mutations'
import { defaultState } from '../../../server/defaultState'

export const results = (results = defaultState.results ,action) => {
    switch(action.type) {
        case mutations.SET_STATE:
            return action.state.results
        case mutations.UPDATE_RESULTS:
            return action.results
    }
    return results
}