import { knockOutStages, pointsPerQualifiedTeam, emptyPrediction } from './config'

// Scoring rules can be found here: https://raftwc.wixsite.com/raftworldcup/scoring-rules

const matchNotPlayedYet = (stage, match, results) => 
    results[stage][match.id].homeGoals === " "
    || results[stage][match.id].awayGoals === " "

const matchScoreNotPredicted = (match) => match.homeGoals === " " || match.awayGoals === " "

const compareMatchGoals = (stage, match, team, results) => 
    match[`${team}Goals`] === results[stage][match.id][`${team}Goals`]

const getMatchGoalsPoints = (stage, match, results) => {
    let points = 0

    if (matchNotPlayedYet(stage, match, results)) return points
    
    // SCORING RULE - a. Goals Home - 5 points
    if (compareMatchGoals(stage, match, "home", results)) {
        points = points + 5
        // SCORING RULE - c. Goals Bonus (knock-out stages only) - 5 points
        if (stage !== 'leagueMatches' && compareMatchGoals(stage, match, "away", results)) { 
            points = points + 5
        }
    }
    // SCORING RULE - b. Goals Away - 5 points
    if (compareMatchGoals(stage, match, "away", results)) {
        points = points + 5
    }

    return points
}


const matchGoalsDiff = (match) => Math.sign(match.homeGoals - match.awayGoals)

// SCORING RULE - d. Winner/Draw (groups stage only) - 10 points
const getLeagueMatchWinnerPoints = (match, results) => {
    if ( matchNotPlayedYet("leagueMatches", match, results)
        || matchScoreNotPredicted(match)
    ) return 0

    return matchGoalsDiff(match) === matchGoalsDiff(results.leagueMatches[match.id]) ? 10 : 0
}

const getLeagueMatchPoints = (stage, match, results) => 
    getMatchGoalsPoints(stage, match, results)
    + getLeagueMatchWinnerPoints(match, results)
    

const getMatchesPoints = (prediction, results) => 
    Object.keys(prediction.leagueMatches).reduce(function(leaguePoints, leagueMatch) {
        return leaguePoints + getLeagueMatchPoints("leagueMatches", prediction.leagueMatches[leagueMatch], results)
        }, 0)
    +
    knockOutStages.reduce(function(knoctOutPoints, stage) {
        return knoctOutPoints 
            + Object.keys(prediction[stage]).reduce(function(stagePoints, stageMatch) {
                return stagePoints + getMatchGoalsPoints(stage, prediction[stage][stageMatch], results)
            }, 0)
    }, 0)


// --------------------------------------------


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

    const points = 
        knockOutTeamPlaceholders.includes(teamName) ? 0 :
            stageTeams(stage, results).includes(teamName) ? pointsPerQualifiedTeam(stage)
                : teamName === results[stage][match.id][`${team}Team`] ? 5 : 0
    
    return points
}

const getMatchQualifedTeamsPoints = (stage, match, results) => 
    compareQualifiedTeam(stage, match, "home", results) 
    + compareQualifiedTeam(stage, match, "away", results)


// SCORING RULE - e. Groups - Winner and Runner-up - 10 or 5 points
const knockOutQualifiedTeamsPoints = (prediction, results) => 
    knockOutStages.reduce(function(qualifiedTeamsPoints, stage) {
        return qualifiedTeamsPoints 
            + Object.keys(prediction[stage]).reduce(function(stagePoints, stageMatch) {
                return stagePoints + getMatchQualifedTeamsPoints(stage, prediction[stage][stageMatch], results)
            }, 0)
    }, 0)


// Participant TOTAL POINTS
export const participantTotalPoints = (prediction, results) => 
    getMatchesPoints(prediction, results)
    + knockOutQualifiedTeamsPoints(prediction, results)
