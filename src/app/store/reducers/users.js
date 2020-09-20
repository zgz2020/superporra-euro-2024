import * as mutations from '../mutations'
import { defaultState } from '../../../server/defaultState'

export const users = (users = defaultState.users, action) => {
    switch(action.type) {
        case mutations.SET_STATE:
            return action.state.users
        case mutations.CREATE_USER:
            return { 
                ...users, 
                byId: {
                    ...users.byId,
                    [action.userID]: {
                        id: action.userID,
                        email: action.email,
                    }
                },
                allIds: [ ...users.allIds, action.userID]
            }
        default:
            return users
    }
}