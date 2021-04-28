import * as mutations from '../mutations'
import { defaultState } from '../../../server/defaultState'

export const predictions = (predictions = defaultState.predictions, action) => {
    switch(action.type) {
        case mutations.SET_STATE:
            return action.state.predictions
        case mutations.CREATE_PREDICTION:
            return { 
                ...predictions, 
                byId: { 
                    ...predictions.byId, 
                    [action.predictionID]: {
                        id: action.predictionID,
                        owner: action.userID,
                        username: action.username,
                        winner: action.prediction.winner,
                        topScorer: action.prediction.topScorer,
                        leastConceded: action.prediction.leastConceded,
                        leagueMatches: action.prediction.leagueMatches,
                        r16Matches: action.prediction.r16Matches,
                        quarterFinalMatches: action.prediction.quarterFinalMatches,
                        semiFinalMatches: action.prediction.semiFinalMatches,
                        finalMatches: action.prediction.finalMatches
                    }
                },
                allIds: [ ...predictions.allIds, action.predictionID]
            }
        case mutations.UPDATE_PREDICTION:
            return {
                ...predictions,
                byId: {
                    ...predictions.byId,
                    [action.predictionID]: action.prediction
                }
            }
        case mutations.ADD_PREDICTION_PRIVATE_LEAGUE: 
            return {
                ...predictions,
                byId: {
                    ...predictions.byId,
                    [action.predictionID]: { 
                        ...predictions.byId[action.predictionID],
                        privateLeague: predictions.byId[action.predictionID].privateLeague ?
                            [
                                ...predictions.byId[action.predictionID].privateLeague, 
                                action.privateLeague
                            ]
                            :
                            [
                                action.privateLeague
                            ]
                    }
                }
            }
        case mutations.REMOVE_PREDICTION_PRIVATE_LEAGUE: 
            return {
                ...predictions,
                byId: {
                    ...predictions.byId,
                    [action.predictionID]: { 
                        ...predictions.byId[action.predictionID],
                        privateLeague: [
                            ...predictions.byId[action.predictionID].privateLeague.slice(0, action.privateLeagueIndex), 
                            ...predictions.byId[action.predictionID].privateLeague.slice(action.privateLeagueIndex + 1) 
                        ]
                    }
                }
            }
        case mutations.SET_USERNAME_EXISTENT_PREDICTION:
            return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], username: action.username } } }

        // ------- NEW COMMON REDUCER -----------
        case mutations.SET_GOALS_EXISTENT_PREDICTION:
            return {
                ...predictions,
                byId: {
                    ...predictions.byId,
                    [action.predictionID]: {
                        ...predictions.byId[action.predictionID],
                        [action.stage]: {
                            ...predictions.byId[action.predictionID][action.stage],
                            [action.matchKey]: {
                                ...predictions.byId[action.predictionID][action.stage][action.matchKey],
                                [action.team]: action.goals
                            }
                        }
                    }
                }
                
            }
        // ----------------------------------------


        // case mutations.SET_GOALS_LEAGUE:
        //     return { 
        //         ...predictions, 
        //         byId: { 
        //             ...predictions.byId,
        //             [action.predictionID]: { 
        //                 ...predictions.byId[action.predictionID],
        //                 leagueMatches: { 
        //                     ...predictions.byId[action.predictionID].leagueMatches,
        //                     [action.leagueMatchKey]: { 
        //                         ...predictions.byId[action.predictionID].leagueMatches[action.leagueMatchKey], 
        //                         [action.team]: action.goals
        //                     }
        //                 }
        //             }
        //         }
        //     }

        case mutations.SET_R16_TEAMS_EXISTENT_PREDICTION:
            return { 
                ...predictions,
                byId: { 
                    ...predictions.byId,
                    [action.predictionID]: { 
                        ...predictions.byId[action.predictionID],
                        r16Matches: action.r16Teams
                    }
                }
            }

        case mutations.SET_QF_TEAMS_EXISTENT_PREDICTION:
            return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], quarterFinalMatches: action.quarterFinalTeams}}}

        case mutations.SET_SF_TEAMS_EXISTENT_PREDICTION:
            return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], semiFinalMatches: action.semiFinalTeams }}}

        case mutations.SET_FINAL_TEAMS_EXISTENT_PREDICTION:
            return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], finalMatches: action.finalTeams }}}

        case mutations.SET_EURO_WINNER_TEAM_EXISTENT_PREDICTION:
            return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], winner: action.euroWinnerTeam }}}
        case mutations.SET_TOP_SCORER_TEAM_EXISTENT_PREDICTION:
            return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], topScorer: action.topScorerTeam }}}
        case mutations.SET_LEAST_CONCEDED_TEAM_EXISTENT_PREDICTION:
            return { ...predictions, byId: { ...predictions.byId, [action.predictionID]: { ...predictions.byId[action.predictionID], leastConceded: action.leastConcededTeam }}}
        default:
            return predictions
    } 
}