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

export const joinLeagueError = (joinLeagueError = false, action) => {
    switch(action.type) {
        case mutations.SHOW_JOIN_LEAGUE_ERROR:
            return true
        case mutations.HIDE_JOIN_LEAGUE_ERROR:
            return false
    }
    return joinLeagueError
}

export const joinLeagueSuccess = (joinLeagueSuccess = false, action) => {
    switch(action.type) {
        case mutations.SHOW_JOIN_LEAGUE_SUCCESS:
            return true
        case mutations.HIDE_JOIN_LEAGUE_SUCCESS:
            return false
    }
    return joinLeagueSuccess
}

export const leagueNameTaken = (leagueNameTaken = false, action) => {
    switch(action.type) {
        case mutations.SHOW_LEAGUE_NAME_TAKEN:
            return true
        case mutations.HIDE_LEAGUE_NAME_TAKEN:
            return false
    }
    return leagueNameTaken
}

export const createLeagueSuccess = (createLeagueSuccess = false, action) => {
    switch(action.type) {
        case mutations.SHOW_CREATE_PRIVATE_LEAGUE_SUCCESS:
            return true
        case mutations.HIDE_CREATE_PRIVATE_LEAGUE_SUCCESS:
            return false
    }
    return createLeagueSuccess
}

export const quitLeagueError = (quitLeagueError = false, action) => {
    switch(action.type) {
        case mutations.SHOW_QUIT_LEAGUE_ERROR:
            return true
        case mutations.HIDE_QUIT_LEAGUE_ERROR:
            return false
    }
    return quitLeagueError
}

export const quitLeagueSuccess = (quitLeagueSuccess = false, action) => {
    switch(action.type) {
        case mutations.SHOW_QUIT_LEAGUE_SUCCESS:
            return true
        case mutations.HIDE_QUIT_LEAGUE_SUCCESS:
            return false
    }
    return quitLeagueSuccess
}