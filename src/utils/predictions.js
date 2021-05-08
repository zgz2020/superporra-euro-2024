import React from 'react'
import { 
    leagueGroups,
    goalsDropDown,
    teamsList,
    emptyPrediction,
    allMatchStages
} from './config'


export const goalsMenuOptions = () => (
    goalsDropDown.map(goalValue => (
        <option key={goalValue} value={goalValue}>{goalValue}</option>
    ))
)

// --------------- Group Stage - Team Stats Methods ------------------------

const teamLeagueMatchesPlayed = (prediction, team) => {
    return Object.keys(prediction.leagueMatches).filter(leagueMatch => 
        ((prediction.leagueMatches[leagueMatch].homeTeam === team) || (prediction.leagueMatches[leagueMatch].awayTeam === team))
        &&
        (prediction.leagueMatches[leagueMatch].homeGoals !== " ")
        &&
        (prediction.leagueMatches[leagueMatch].awayGoals !== " ")
    ).length
}

const getTeamGoalsScoredStage = (prediction, stage, team) => {
    return Object.keys(prediction[stage]).reduce(function(counter, match){
        if(prediction[stage][match].homeTeam === team && prediction[stage][match].homeGoals !== " "){
            return counter + parseInt(prediction[stage][match].homeGoals)
        } else if (prediction[stage][match].awayTeam === team && prediction[stage][match].awayGoals !== " "){
            return counter + parseInt(prediction[stage][match].awayGoals)
        } else {
            return counter
        }
    }, 0)
}

const geatTeamGoalsScoredAllStages = (prediction, team) => {
    return allMatchStages.reduce(function(counter, stage){
        return counter + getTeamGoalsScoredStage(prediction, stage, team)
    }, 0)
}

const getTeamGoalsConcededStage = (prediction, stage, team) => {
    return Object.keys(prediction[stage]).reduce(function(counter, match){
        if(prediction[stage][match].homeTeam === team && prediction[stage][match].awayGoals !== " "){
            return counter + parseInt(prediction[stage][match].awayGoals)
        } else if (prediction[stage][match].awayTeam === team && prediction[stage][match].homeGoals !== " "){
            return counter + parseInt(prediction[stage][match].homeGoals)
        } else {
            return counter
        }
    }, 0)
}

const geatTeamGoalsConcededAllStages = (prediction, team) => {
    return allMatchStages.reduce(function(counter, stage){
        return counter + getTeamGoalsConcededStage(prediction, stage, team)
    }, 0)
}

const getMatchWinner = (game) => {
    let goalsDiff = parseInt(game.homeGoals) - parseInt(game.awayGoals)

    switch (true) {
        case goalsDiff == 0:
            return 'DRAW'
        case goalsDiff > 0:
            return 'HOME'
        case goalsDiff < 0:
            return 'AWAY'
        default:
            return 'Something is wrong'
    }
}

export const teamLeaguePoints = (prediction, team) => {
    return Object.keys(prediction.leagueMatches).reduce(function(counter, curr) {
        if(prediction.leagueMatches[curr].homeGoals !== " " && prediction.leagueMatches[curr].awayGoals !== " ") {
            if(prediction.leagueMatches[curr].homeTeam === team || prediction.leagueMatches[curr].awayTeam === team) {
                switch (getMatchWinner(prediction.leagueMatches[curr])) {
                    case 'DRAW':
                        return counter + 1
                    case 'HOME':
                        return prediction.leagueMatches[curr].homeTeam === team ? counter + 3 : counter
                    case 'AWAY':
                        return prediction.leagueMatches[curr].awayTeam === team ? counter + 3 : counter
                    default:
                        return counter
                }
            } else {
                return counter
            }
        } else {
            return counter
        }
    }, 0)
}

let compareTeamStats = (a, b) => {
    if(a.points > b.points) return -1
    if(a.points < b.points) return 1
    if(a.points == b.points) {
        if( (a.goalsScored - a.goalsConceded) > (b.goalsScored - b.goalsConceded) ) return -1
        if( (a.goalsScored - a.goalsConceded) < (b.goalsScored - b.goalsConceded) ) return 1
        if( (a.goalsScored - a.goalsConceded) == (b.goalsScored - b.goalsConceded) ) {
            if(a.goalsScored > b.goalsScored) return -1
            if(a.goalsScored < b.goalsScored) return 1
        }
    }
}

export const getLeagueGroupTable = (prediction, group) => {
    let groupTeamsStats = []

    leagueGroups[group].map( team => {
        let teamStats = {}
        teamStats.group = group
        teamStats.name = team
        teamStats.points = teamLeaguePoints(prediction, team)
        teamStats.gamesPlayed = teamLeagueMatchesPlayed(prediction, team)
        teamStats.goalsScored = getTeamGoalsScoredStage(prediction, "leagueMatches", team) // teamLeagueGoalsScored(prediction, team)
        teamStats.goalsConceded = getTeamGoalsConcededStage(prediction, "leagueMatches", team) // teamLeagueGoalsConceded(prediction, team)
        groupTeamsStats.push(teamStats)
    })
    return groupTeamsStats.sort(compareTeamStats)
}


// ---------- Knock-Out Stages - Teams qualifies methods --------- 

const bestThirdTeams = (prediction) => {
    let thirdTeams = []
    // Returns 'third ranked' teams in each group
    Object.keys(leagueGroups).map(group => {
        thirdTeams.push(getLeagueGroupTable(prediction, group)[2])
    })
    // Returns 4 best 'third ranked' teams
    return thirdTeams.sort(compareTeamStats).slice(0, 4)
}

const groupGamesPlayed = (prediction, group) => {
    if (group) { // Checks if at least one game has been played for a given group
        if (getLeagueGroupTable(prediction, group)[2].gamesPlayed !== 0) return true  
    } 
    else if ( // Checks if at least one game has been played for each group
        getLeagueGroupTable(prediction, "A")[3].gamesPlayed !== 0
        && getLeagueGroupTable(prediction, "B")[3].gamesPlayed !== 0
        && getLeagueGroupTable(prediction, "C")[3].gamesPlayed !== 0
        && getLeagueGroupTable(prediction, "D")[3].gamesPlayed !== 0
        && getLeagueGroupTable(prediction, "E")[3].gamesPlayed !== 0
        && getLeagueGroupTable(prediction, "F")[3].gamesPlayed !== 0
    ) return true 
}

const thirdTeamsR16Matches = (prediction) => {

    // Returns the best 4 third teams that qualify for R16
    // - And the R16 match for each 'best third' team qualified according to:
    // https://en.wikipedia.org/wiki/UEFA_Euro_2020#Ranking_of_third-placed_teams
    // Third-placed teams
    // qualify from groups		1B  1C  1E  1F
    // A	B	C	D			3A	3D	3B	3C
    // A	B	C		E		3A	3E	3B	3C
    // A	B	C			F	3A	3F	3B	3C
    // A	B		D	E		3D	3E	3A	3B
    // A	B		D		F	3D	3F	3A	3B
    // A	B			E	F	3E	3F	3B	3A
    // A		C	D	E		3E	3D	3C	3A
    // A		C	D		F	3F	3D	3C	3A
    // A		C		E	F	3E	3F	3C	3A
    // A			D	E	F	3E	3F	3D	3A
    //     B	C	D	E		3E	3D	3B	3C
    //     B	C	D		F	3F	3D	3C	3B
    //     B	C		E	F	3F	3E	3C	3B
    //     B		D	E	F	3F	3E	3D	3B
    //         C	D	E	F	3F	3E	3D	3C
    
    let bestThirdGroups = []
    bestThirdTeams(prediction).map(team => bestThirdGroups.push(team.group))

    switch (bestThirdGroups.sort().join("")) {
        case "ABCD":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "A")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "B")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "C")[2].name
            }
        case "ABCE":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "A")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "B")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "C")[2].name
            }
        case "ABCF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "A")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "B")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "C")[2].name
            }
        case "ABDE":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "A")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "B")[2].name
            }
        case "ABDF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "A")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "B")[2].name
            }
        case "ABEF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "B")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "A")[2].name
            }
        case "ACDE":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "C")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "A")[2].name
            }
        case "ACDF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "C")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "A")[2].name
            }
        case "ACEF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "C")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "A")[2].name
            }
        case "ADEF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "A")[2].name
            }
        case "BCDE":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "B")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "C")[2].name
            }
        case "BCDF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "C")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "B")[2].name
            }
        case "BCEF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "C")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "B")[2].name
            }
        case "BDEF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "B")[2].name
            }
        case "CDEF":
            return {
                oponentFirstB: getLeagueGroupTable(prediction, "F")[2].name,
                oponentFirstC: getLeagueGroupTable(prediction, "E")[2].name,
                oponentFirstE: getLeagueGroupTable(prediction, "D")[2].name,
                oponentFirstF: getLeagueGroupTable(prediction, "C")[2].name
            }
        default:
            return {
                oponentFirstB: "Something is wrong",
                oponentFirstC: "Something is wrong",
                oponentFirstE: "Something is wrong",
                oponentFirstF: "Something is wrong"
            }
    }
}


export const getR16Teams = (prediction) => ({
    // Returns the teams that qualified for knock-out stages
    // - A Placeholder is returned if no games have been played
    "1": { 
        ...prediction.r16Matches["1"],
        homeTeam: groupGamesPlayed(prediction, "A") ? 
            getLeagueGroupTable(prediction, "A")[1].name 
            : emptyPrediction.r16Matches["1"].homeTeam,
        awayTeam: groupGamesPlayed(prediction, "B") ? 
            getLeagueGroupTable(prediction, "B")[1].name 
            : emptyPrediction.r16Matches["1"].awayTeam
    },
    "2": {
        ...prediction.r16Matches["2"],
        homeTeam: groupGamesPlayed(prediction, "A") ? 
            getLeagueGroupTable(prediction, "A")[0].name 
            : emptyPrediction.r16Matches["2"].homeTeam,
        awayTeam: groupGamesPlayed(prediction, "C") ? 
            getLeagueGroupTable(prediction, "C")[1].name 
            : emptyPrediction.r16Matches["2"].awayTeam
    },
    "3": {
        ...prediction.r16Matches["3"],
        homeTeam: groupGamesPlayed(prediction, "C") ? 
            getLeagueGroupTable(prediction, "C")[0].name 
            : emptyPrediction.r16Matches["3"].homeTeam,
        awayTeam: groupGamesPlayed(prediction) ?
            thirdTeamsR16Matches(prediction).oponentFirstC
            : emptyPrediction.r16Matches["3"].awayTeam
    },
    "4": {
        ...prediction.r16Matches["4"],
        homeTeam: groupGamesPlayed(prediction, "B") ? 
            getLeagueGroupTable(prediction, "B")[0].name 
            : emptyPrediction.r16Matches["4"].homeTeam,
        awayTeam: groupGamesPlayed(prediction) ?
            thirdTeamsR16Matches(prediction).oponentFirstB
            : emptyPrediction.r16Matches["4"].awayTeam
    },
    "5": {
        ...prediction.r16Matches["5"],
        homeTeam: groupGamesPlayed(prediction, "D") ? 
            getLeagueGroupTable(prediction, "D")[1].name 
            : emptyPrediction.r16Matches["5"].homeTeam,
        awayTeam: groupGamesPlayed(prediction, "E") ? 
            getLeagueGroupTable(prediction, "E")[1].name 
            : emptyPrediction.r16Matches["5"].awayTeam
    },
    "6": {
        ...prediction.r16Matches["6"],
        homeTeam: groupGamesPlayed(prediction, "F") ? 
            getLeagueGroupTable(prediction, "F")[0].name 
            : emptyPrediction.r16Matches["6"].homeTeam,
        awayTeam: groupGamesPlayed(prediction) ?
            thirdTeamsR16Matches(prediction).oponentFirstF
            : emptyPrediction.r16Matches["6"].awayTeam
    },
    "7": {
        ...prediction.r16Matches["7"],
        homeTeam: groupGamesPlayed(prediction, "D") ? 
            getLeagueGroupTable(prediction, "D")[0].name 
            : emptyPrediction.r16Matches["7"].homeTeam,
        awayTeam: groupGamesPlayed(prediction, "F") ? 
            getLeagueGroupTable(prediction, "F")[1].name 
            : emptyPrediction.r16Matches["7"].awayTeam
    },
    "8": {
        ...prediction.r16Matches["8"],
        homeTeam: groupGamesPlayed(prediction, "E") ? 
            getLeagueGroupTable(prediction, "E")[0].name 
            : emptyPrediction.r16Matches["8"].homeTeam,
        awayTeam: groupGamesPlayed(prediction) ?
            thirdTeamsR16Matches(prediction).oponentFirstE
            : emptyPrediction.r16Matches["8"].awayTeam
    }
})


const getKnockOutMatchWinner = (game) => {
    if (parseInt(game.homeGoals) - parseInt(game.awayGoals) > 0) return game.homeTeam
    if (parseInt(game.homeGoals) - parseInt(game.awayGoals) < 0) return game.awayTeam
    // If a draw, decide match winner randomly
    if (parseInt(game.homeGoals) - parseInt(game.awayGoals) === 0) {
        const randomWinner = Math.random()
        if (randomWinner < 0.5) { 
            return game.homeTeam
        } else return game.awayTeam
    }
}


export const getQuarterFinalTeams = (prediction) => ({
    "1": {
        ...prediction.quarterFinalMatches["1"], 
        homeTeam: prediction.r16Matches["6"].homeGoals === " " || prediction.r16Matches["6"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["1"].homeTeam
            : getKnockOutMatchWinner(prediction.r16Matches["6"]), 
        awayTeam: prediction.r16Matches["5"].homeGoals === " " || prediction.r16Matches["5"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["1"].awayTeam 
            : getKnockOutMatchWinner(prediction.r16Matches["5"])
    },
    "2": {
        ...prediction.quarterFinalMatches["2"], 
        homeTeam: prediction.r16Matches["4"].homeGoals === " " || prediction.r16Matches["4"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["2"].homeTeam 
            : getKnockOutMatchWinner(prediction.r16Matches["4"]), 
        awayTeam: prediction.r16Matches["2"].homeGoals === " " || prediction.r16Matches["2"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["2"].awayTeam 
            : getKnockOutMatchWinner(prediction.r16Matches["2"])
    },
    "3": {
        ...prediction.quarterFinalMatches["3"], 
        homeTeam: prediction.r16Matches["3"].homeGoals === " " || prediction.r16Matches["3"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["3"].homeTeam
            : getKnockOutMatchWinner(prediction.r16Matches["3"]), 
        awayTeam: prediction.r16Matches["1"].homeGoals === " " || prediction.r16Matches["1"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["3"].awayTeam
            : getKnockOutMatchWinner(prediction.r16Matches["1"])
    },
    "4": {
        ...prediction.quarterFinalMatches["4"], 
        homeTeam: prediction.r16Matches["8"].homeGoals === " " || prediction.r16Matches["8"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["4"].homeTeam
            : getKnockOutMatchWinner(prediction.r16Matches["8"]), 
        awayTeam: prediction.r16Matches["7"].homeGoals === " " || prediction.r16Matches["7"].awayGoals === " " ? 
            emptyPrediction.quarterFinalMatches["4"].awayTeam
            : getKnockOutMatchWinner(prediction.r16Matches["7"])
    }

})

export const getSemiFinalTeams = (prediction) => ({
    "1": {
        ...prediction.semiFinalMatches["1"], 
        homeTeam: prediction.quarterFinalMatches["2"].homeGoals === " " || prediction.quarterFinalMatches["2"].awayGoals === " " ? 
            emptyPrediction.semiFinalMatches["1"].homeTeam 
            : getKnockOutMatchWinner(prediction.quarterFinalMatches["2"]), 
        awayTeam: prediction.quarterFinalMatches["1"].homeGoals === " " || prediction.quarterFinalMatches["1"].awayGoals === " " ? 
            emptyPrediction.semiFinalMatches["1"].awayTeam 
            : getKnockOutMatchWinner(prediction.quarterFinalMatches["1"])
    },
    "2": {
        ...prediction.semiFinalMatches["2"], 
        homeTeam: prediction.quarterFinalMatches["4"].homeGoals === " " || prediction.quarterFinalMatches["4"].awayGoals === " " ? 
            emptyPrediction.semiFinalMatches["2"].homeTeam 
            : getKnockOutMatchWinner(prediction.quarterFinalMatches["4"]), 
        awayTeam: prediction.quarterFinalMatches["3"].homeGoals === " " || prediction.quarterFinalMatches["3"].awayGoals === " " ? 
            emptyPrediction.semiFinalMatches["2"].awayTeam 
            : getKnockOutMatchWinner(prediction.quarterFinalMatches["3"])
    }

})

export const getFinalTeams = (prediction) => ({
    "1": {
        ...prediction.finalMatches["1"], 
        homeTeam: prediction.semiFinalMatches["1"].homeGoals === " " || prediction.semiFinalMatches["1"].awayGoals === " " ? 
            emptyPrediction.finalMatches["1"].homeTeam 
            : getKnockOutMatchWinner(prediction.semiFinalMatches["1"]), 
        awayTeam: prediction.semiFinalMatches["2"].homeGoals === " " || prediction.semiFinalMatches["2"].awayGoals === " " ? 
            emptyPrediction.finalMatches["1"].awayTeam 
            : getKnockOutMatchWinner(prediction.semiFinalMatches["2"])
    }
})

export const getEuroWinner = (prediction) => 
    prediction.finalMatches["1"].homeGoals === " " || prediction.finalMatches["1"].awayGoals === " " ?
        emptyPrediction.winner
        :
        getKnockOutMatchWinner(prediction.finalMatches["1"])

export const getTopScorer = (prediction) => {
    let teamsGoalsScored = []

    teamsList().map(team => {
        let teamGoalsScored = {}
        teamGoalsScored.team = team
        teamGoalsScored.goals = geatTeamGoalsScoredAllStages(prediction, team)
        teamsGoalsScored.push(teamGoalsScored)
    })

    const maxGoals = Math.max(...teamsGoalsScored.map(team => team.goals), 0)

    const topScorerTeams = teamsGoalsScored.filter(team => team.goals === maxGoals)

    return prediction.winner === "???" ? "???" : topScorerTeams  // It won't update until Final match is played
}

export const getLeastConceded = (prediction) => {
    let teamsGoalsConceded = []

    teamsList().map(team => {
        let teamGoalsConceded = {}
        teamGoalsConceded.team = team
        teamGoalsConceded.goals = geatTeamGoalsConcededAllStages(prediction, team)
        teamsGoalsConceded.push(teamGoalsConceded)
    })

    const minGoals = Math.min(...teamsGoalsConceded.map(team => team.goals), 20)

    const leastConcededTeams = teamsGoalsConceded.filter(team => team.goals === minGoals)

    return prediction.winner === "???" ? "???" : leastConcededTeams // It won't update until Final match is played
}

export const topScorerCountriesNamesList = (prediction) => {
    let topScorersNames = []
    const topScorersFullDetails = getTopScorer(prediction)
    Object.keys(topScorersFullDetails).map(team => topScorersNames.push(topScorersFullDetails[team].team))

    return topScorersNames
}

export const leastConcededCountriesNamesList = (prediction) => {
    let leastConcededNames = []
    const leastConcededFullDetails = getLeastConceded(prediction)
    Object.keys(leastConcededFullDetails).map(team => leastConcededNames.push(leastConcededFullDetails[team].team))

    return leastConcededNames
}
    

// --------- QUALIFYING NOTES ------------
// https://www.uefa.com/uefaeuro-2020/news/0255-0d9929d9bae9-c143d7348369-1000--finals-draw-all-the-details/
// a) final position in group
// b) points
// c) goal difference
// d) goals scored
// e) away goals scored
// f) number of wins
// g) number of away wins
// h) lower disciplinary points total (3 points for red card including for second booking, 1 point for single yellow card for a player in a match)
// i) position in overall UEFA Nations League rankings



export const verifyAllMatchesFilled = prediction => 
    allMatchStages.every(stage => 
        Object.keys(prediction[stage]).every(match => 
            prediction[stage][match].homeGoals != " "
            &&
            prediction[stage][match].awayGoals != " "
        )
    )
