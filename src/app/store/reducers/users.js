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
                    [action.id]: {
                        id: action.id,
                        passwordHash: action.passwordHash,
                    }
                },
                allIds: [ ...users.allIds, action.id]
            }
        default:
            return users
    }
}