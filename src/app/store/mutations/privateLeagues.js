export const SHOW_PRIVATE_LEAGUE_RANKINGS = 'SHOW_PRIVATE_LEAGUE_RANKINGS'

export const showPrivateLeagueRankings = (privateLeague) => ({
    type: SHOW_PRIVATE_LEAGUE_RANKINGS,
    privateLeague
})