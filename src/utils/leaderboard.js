import { 
    knockOutStages,
    pointsPerQualifiedTeam,
    emptyPrediction,
    countryShortNames,
    groupMatches
} from './config'
import { topScorerCountriesNamesList, leastConcededCountriesNamesList } from './predictions'

// Scoring rules can be found here: https://raftwc.wixsite.com/raftworldcup/scoring-rules

const matchNotPlayedYet = (stage, match, results) => 
    results[stage][match.id].homeGoals === " "
    || results[stage][match.id].awayGoals === " "

const matchScoreNotPredicted = (match) => match.homeGoals === " " || match.awayGoals === " "

const compareMatchGoals = (stage, match, team, results) => 
    match[`${team}Goals`] === results[stage][match.id][`${team}Goals`]

// SCORING RULES:   - a. Goals Home - 5 points
//                  - b. Goals Away - 5 points
export const getMatchTeamGoalsPoints = (stage, match, team, results) => 
    !matchNotPlayedYet(stage, match, results) 
        && compareMatchGoals(stage, match, team, results) 
            ? 5 : 0  

// SCORING RULE - d. Goals Bonus (knock-out stages only) - 5 points
export const getMatchGoalsBonusPoints = (stage, match, results) =>
    getMatchTeamGoalsPoints(stage, match, "home", results) === 5
        && getMatchTeamGoalsPoints(stage, match, "away", results) === 5 
            ? 5 : 0


const matchGoalsDiff = (match) => Math.sign(match.homeGoals - match.awayGoals)

// SCORING RULE - c. Winner/Draw (groups stage only) - 10 points
export const getLeagueMatchWinnerPoints = (match, results) => 
    !matchNotPlayedYet("leagueMatches", match, results)
        && !matchScoreNotPredicted(match)
        && matchGoalsDiff(match) === matchGoalsDiff(results.leagueMatches[match.id])
            ? 10 : 0
    
export const getLeagueMatchPoints = (match, results) => 
    getMatchTeamGoalsPoints("leagueMatches", match, "home", results)
    + getMatchTeamGoalsPoints("leagueMatches", match, "away", results)
    + getLeagueMatchWinnerPoints(match, results)

export const getKnockOutMatchPoints = (stage, match, results) => 
    getMatchTeamGoalsPoints(stage, match, "home", results)
    + getMatchTeamGoalsPoints(stage, match, "away", results)
    + getMatchGoalsBonusPoints(stage, match, results)
    
export const getGroupMatchPoints = (group, prediction, results) => // Used on participant's detailed scores
    Object.keys(groupMatches(group, prediction)).reduce(function(groupPoints, match){
        return groupPoints + getLeagueMatchPoints(prediction.leagueMatches[match], results)
    }, 0)

export const getStageMatchPoints = (prediction, stage, results) => // Used on participant's detailed scores
    Object.keys(prediction[stage]).reduce(function(stagePoints, stageMatch) {
        return stagePoints + getKnockOutMatchPoints(stage, prediction[stage][stageMatch], results)
    }, 0)

const getAllMatchesPoints = (prediction, results) => // Used on leaderboards - participant's total score
    Object.keys(prediction.leagueMatches).reduce(function(leaguePoints, leagueMatch) {
        return leaguePoints + getLeagueMatchPoints(prediction.leagueMatches[leagueMatch], results)
        }, 0)
    +
    knockOutStages.reduce(function(knoctOutPoints, stage) {
        return knoctOutPoints 
            + getStageMatchPoints(prediction, stage, results)
    }, 0)


const stageTeams = (stage, prediction) =>
    Object.keys(prediction[stage]).map(stageMatch => { 
        return [
            prediction[stage][stageMatch].homeTeam, 
            prediction[stage][stageMatch].awayTeam
        ]
        .join(", ")
    }).join(", ")


const knockOutTeamPlaceholders = 
    knockOutStages.map(stage => {
        return stageTeams(stage, emptyPrediction)
    }).join(", ")


const compareQualifiedTeam = (stage, match, team, results) => {
    const teamName = match[`${team}Team`]

    let qualifiedBonusTeam // Team's final position in leagueMatches stage matches with actual results
    let qualifiedTeam // Team qualifies for next stage; position does not match with actual results

    let points = 0

    if (knockOutTeamPlaceholders.includes(teamName)) { // Check if stage teams not filled in yet
        return { points }
    } else if (stage === 'r16Matches') { // Check qualified teams for 'r16Matches' stage - SCORING RULE - e. Groups - Winner and Runner-up - 10 or 5 points
        if (teamName === results[stage][match.id][`${team}Team`]) {
            points = pointsPerQualifiedTeam(stage)
            qualifiedBonusTeam = teamName
            return { points, qualifiedBonusTeam }
        } else if (stageTeams(stage, results).includes(teamName)) {
            points = 5
            qualifiedTeam = teamName
            return { points, qualifiedTeam }
        }
    } else if (stageTeams(stage, results).includes(teamName)) { // Check qualified teams for rest of stages - SCORING RULE - f., g, h. and i.
        points = pointsPerQualifiedTeam(stage)
        qualifiedTeam = teamName
        return { points, qualifiedTeam }
    } 
    
    return { points }
}

const getMatchQualifedTeamsPoints = (stage, match, results) => 
    compareQualifiedTeam(stage, match, "home", results).points 
    + compareQualifiedTeam(stage, match, "away", results).points

// POINTS got per qualified team for 'stage'
export const stageQualifiedTeamsPoints = (prediction, stage, results) => 
    Object.keys(prediction[stage]).reduce(function(stagePoints, stageMatch) {
        return stagePoints + getMatchQualifedTeamsPoints(stage, prediction[stage][stageMatch], results)
    }, 0)


export const getMatchQualifiedTeams = (stage, match, qualified, results) => { // `qualified' values: 'qualifiedBonusTeam', 'qualifiedTeam'
    let MatchQualifiedTeams =  []

    if (compareQualifiedTeam(stage, match, "home", results)[qualified]) {
        MatchQualifiedTeams.push(compareQualifiedTeam(stage, match, "home", results)[qualified])
    }
    if (compareQualifiedTeam(stage, match, "away", results)[qualified]) {
        MatchQualifiedTeams.push(compareQualifiedTeam(stage, match, "away", results)[qualified])
    }

    return MatchQualifiedTeams // Returns match's teams that qualify for next stage; either 'qualifiedBonusTeam' or 'qualifiedTeam'
}

export const getR16BonusQualifiedTeams = (prediction, results) => 
    Object.keys(prediction.r16Matches).reduce(function(r16BonusQualifiedTeams, match){
        return r16BonusQualifiedTeams.concat(getMatchQualifiedTeams("r16Matches", prediction.r16Matches[match], "qualifiedBonusTeam", results))
    }, [])
    

export const getStageQualifiedTeams = (prediction, stage, results) => 
    Object.keys(prediction[stage]).reduce(function(r16BonusQualifiedTeams, match){
        return r16BonusQualifiedTeams.concat(getMatchQualifiedTeams(stage, prediction.r16Matches[match], "qualifiedTeam", results))
    }, [])

export const qualifiedTeamsShortNames = (teams) => 
    teams.map(team => countryShortNames[team])


// SCORING RULES - e., f., g., h. and i. - Teams qualified for next rounds
const knockOutQualifiedTeamsPoints = (prediction, results) => 
    knockOutStages.reduce(function(qualifiedTeamsPoints, stage) {
        return qualifiedTeamsPoints 
            + Object.keys(prediction[stage]).reduce(function(stagePoints, stageMatch) {
                return stagePoints + getMatchQualifedTeamsPoints(stage, prediction[stage][stageMatch], results)
            }, 0)
    }, 0)


// SCORING RULES - i. World Cup Winner - 40 points
export const getEuroWinnerPoints = (prediction, results) =>
    results.winner !== "???" && prediction.winner === results.winner ? 40 : 0

// SCORING RULES - j. and k. -  Top Scorer / Least goals conceded - 25 points
export const getTeamGlobalGoalsPoints = (prediction, results, predictionName) => {
    const getTeamsFunction = predictionName === "topScorer" ? topScorerCountriesNamesList : leastConcededCountriesNamesList

    return results[predictionName] !== "???" &&
        getTeamsFunction(prediction).some(team => getTeamsFunction(results).includes(team)) ? 25 : 0
}
    

// Participant TOTAL POINTS
export const participantTotalPoints = (prediction, results) => 
    getAllMatchesPoints(prediction, results)
    + knockOutQualifiedTeamsPoints(prediction, results)
    + getEuroWinnerPoints(prediction, results)
    + getTeamGlobalGoalsPoints(prediction, results, "topScorer")
    + getTeamGlobalGoalsPoints(prediction, results, "leastConceded")
