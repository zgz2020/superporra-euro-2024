import * as mutations from '../mutations'
import { defaultState } from '../../../server/defaultState'

export const results = (results = defaultState.results ,action) => {
    switch(action.type) {

        case mutations.SET_STATE:
            return action.state.results

        // case mutations.UPDATE_RESULTS:
        //     return action.results

        case mutations.SET_GOALS_RESULTS:
            return {
                ...results,
                [action.stage]: {
                    ...results[action.stage],
                    [action.matchKey]: {
                        ...results[action.stage][action.matchKey],
                        [action.team]: action.goals
                    }
                }
            }

            case mutations.SET_R16_TEAMS_RESULTS:
                return { ...results, r16Matches: action.r16Teams }

            case mutations.SET_QF_TEAMS_RESULTS:
                return { ...results, quarterFinalMatches: action.quarterFinalTeams }

            case mutations.SET_SF_TEAMS_RESULTS:
                return { ...results, semiFinalMatches: action.semiFinalTeams }

            case mutations.SET_FINAL_TEAMS_RESULTS:
                return { ...results, finalMatches: action.finalTeams }

            case mutations.SET_EURO_WINNER_TEAM_RESULTS:
                return { ...results, winner: action.euroWinnerTeam }

            case mutations.SET_TOP_SCORER_TEAM_RESULTS:
                return { ...results, topScorer: action.topScorerTeam }

            case mutations.SET_LEAST_CONCEDED_TEAM_RESULTS:
                return { ...results, leastConceded: action.leastConcededTeam }
    }
    return results
}
