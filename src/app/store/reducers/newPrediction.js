import * as mutations from '../mutations'
import { emptyPrediction } from '../../../utils/config'


export const newPrediction = (newPrediction = emptyPrediction, action) => {
    switch(action.type) {
        case mutations.SET_RANDOM_PREDICTION:
            return {
                ...newPrediction,
                leagueMatches: action.randomPrediction.leagueMatches,
                r16Matches: action.randomPrediction.r16Matches,
                quarterFinalMatches: action.randomPrediction.quarterFinalMatches,
                semiFinalMatches: action.randomPrediction.semiFinalMatches,
                finalMatches: action.randomPrediction.finalMatches,
                winner: action.randomPrediction.winner,
                topScorer: action.randomPrediction.topScorer,
                leastConceded: action.randomPrediction.leastConceded
            }


        // ------- NEW COMMON REDUCER -----------
        case mutations.SET_GOALS_NEW_PREDICTION:
            return {
                ...newPrediction,
                [action.stage]: {
                    ...newPrediction[action.stage],
                    [action.matchKey]: {
                        ...newPrediction[action.stage][action.matchKey],
                        [action.team]: action.goals
                    }
                }
            }
        // ----------------------------------------


        // case mutations.SET_GOALS_NEW_PREDICTION_LEAGUE:
        //     return { 
        //         ...newPrediction, 
        //         leagueMatches: { 
        //             ...newPrediction.leagueMatches, 
        //             [action.matchKey]: { 
        //                 ...newPrediction.leagueMatches[action.matchKey], 
        //                 [action.team]: action.goals
        //             }
        //         }
        //     }
        case mutations.SET_R16_TEAMS_NEW_PREDICTION:
            return { ...newPrediction, r16Matches: action.r16Teams }
        // case mutations.SET_GOALS_NEW_PREDICTION_R16:
        //     return { 
        //         ...newPrediction, 
        //         r16Matches: { ...newPrediction.r16Matches, [action.matchKey]: { ...newPrediction.r16Matches[action.matchKey], [action.team]: action.goals}}
        //     }
        case mutations.SET_QF_TEAMS_NEW_PREDICTION:
            return { ...newPrediction, quarterFinalMatches: action.quarterFinalTeams }
        // case mutations.SET_GOALS_NEW_PREDICTION_QF:
        //     return { 
        //         ...newPrediction, 
        //         quarterFinalMatches: { ...newPrediction.quarterFinalMatches, [action.matchKey]: { ...newPrediction.quarterFinalMatches[action.matchKey], [action.team]: action.goals}}
        //     }
        case mutations.SET_SF_TEAMS_NEW_PREDICTION:
            return { ...newPrediction, semiFinalMatches: action.semiFinalTeams }
        // case mutations.SET_GOALS_NEW_PREDICTION_SF:
        //     return { 
        //         ...newPrediction, 
        //         semiFinalMatches: { ...newPrediction.semiFinalMatches, [action.matchKey]: { ...newPrediction.semiFinalMatches[action.matchKey], [action.team]: action.goals}}
        //     }
        case mutations.SET_FINAL_TEAMS_NEW_PREDICTION:
            return { ...newPrediction, finalMatches: action.finalTeams }
        // case mutations.SET_GOALS_NEW_PREDICTION_FINAL:
        //     return { 
        //         ...newPrediction, 
        //         finalMatches: { ...newPrediction.finalMatches, [action.matchKey]: { ...newPrediction.finalMatches[action.matchKey], [action.team]: action.goals}}
        //     }
        case mutations.SET_EURO_WINNER_TEAM_NEW_PREDICTION:
            return { ...newPrediction, winner: action.euroWinnerTeam }
        case mutations.SET_TOP_SCORER_TEAM_NEW_PREDICTION:
            return { ...newPrediction, topScorer: action.topScorerTeam }
        case mutations.SET_LEAST_CONCEDED_TEAM_NEW_PREDICTION:
            return { ...newPrediction, leastConceded: action.leastConcededTeam }
        case mutations.RESET_PREDICTION_CREATION_FORM:
            return emptyPrediction
        default:
            return newPrediction
    } 
}

export const newPredictionUsername = (newPredictionUsername = "", action) => {
    switch (action.type) {
        case mutations.SET_USERNAME_NEW_PREDICTION:
            return action.username
        case mutations.RESET_PREDICTION_CREATION_FORM:
            return ""
    }
    return newPredictionUsername
}