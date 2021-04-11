import * as mutations from '../mutations'

export const privateLeagues = (privateLeagues = [], action) => {
    switch (action.type) {
        case mutations.SET_STATE:
            return action.state.privateLeagues
        default:
            return privateLeagues
    }
}

export const privateLeagueRankings = (privateLeagueRankings = null, action) => {
    switch (action.type) {
        case mutations.SHOW_PRIVATE_LEAGUE_RANKINGS:
            return action.privateLeague
        default:
            return privateLeagueRankings
    }
}