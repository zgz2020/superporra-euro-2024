import * as mutations from '../mutations'

export const privateLeagues = (privateLeagues = [], action) => {
    switch (action.type) {
        case mutations.SET_STATE:
            return action.state.privateLeagues
        case mutations.CREATE_PRIVATE_LEAGUE:
            return [ ...privateLeagues, action.leagueName ]
        default:
            return privateLeagues
    }
}

export const privateLeagueRankings = (privateLeagueRankings = "--", action) => {
    switch (action.type) {
        case mutations.SHOW_PRIVATE_LEAGUE_RANKINGS:
            return action.privateLeague
        default:
            return privateLeagueRankings
    }
}