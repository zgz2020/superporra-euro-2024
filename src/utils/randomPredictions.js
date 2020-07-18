// ------------------------------------------------
// ---- Methods to generate random predictions ----
// ------------------------------------------------

    // The formulas below will be used to generate odds for each match
    // given each team's odds to win the championship
    // http://thegameisafoot.weebly.com/sport-articles/creating-football-odds

    // Odds Groups:
    //      - When a team's coefficient is over 250 times larger than their opponent's.
    //      - When their coefficient is between 10-250 times larger than their opponent's.
    //      - When their coefficient is between 1-10 times larger than their opponent's.
    //      - When their coefficient is are smaller than their opponent's.

    // Rules to calculate the odds of a team WINNING for the above four 'Odds Groups':
    //      - 12.0
    //      - 2(x^0.2834)
    //      - 1.55(x^0.3407)
    //      - 1.65(x^0.3697)
    //    Where x is the value given when a team's coefficient is divided by their opponent's.

    // Rules to calculate the odds that a side will DRAW its match for the above four 'Odds Groups':
    //      - 4.5
    //      - 1.58(x^0.175)
    //      - 2.05(x^0.0467)
    //      - 1.87(x^(-0.131))

// ------------------------------------------------------------------

import { emptyPrediction, teamsOdds, randomSpecs } from './config'
import { getR16Teams, getQuarterFinalTeams, getSemiFinalTeams, getFinalTeams } from './predictions'

const lodashClonedeep = require("lodash.clonedeep")


//+++++++++ AQUI +++++++++
//     - ‘weightedRandomGoals’ and ‘weightedRamdonMatchWinner’ should be same method
const getRandomData = (spec) => {
    let i, sum=0, r=Math.random()
    for (i in spec) {
      sum += spec[i]
      if (r <= sum) return i
    }
}
// ++++++++++++++++++++++++++++++++++++++++++++++

// const weightedRamdonMatchWinner = (homeTeam, awayTeam) => {
//     const spec = weightedMatchOdds(homeTeam, awayTeam)

//     let i, sum=0, r=Math.random(), result
//     for (i in spec) {
//       sum += spec[i];
//       if (r <= sum) return i;
//     }
// }

// Generates weighted random number of goals
// const weightedRandomGoals = () => {
//     const spec = {0:0.3, 1:0.3, 2:0.2, 3:0.15, 4:0.03, 5:0.02}

//     let i, sum=0, r=Math.random()
//     for (i in spec) {
//       sum += spec[i]
//       if (r <= sum) return i
//     }
// }


// Generates a team's odds for winning or drawing a match depending on the oponent
const teamMatchOdds = (teamChampionshipOdss, oponentChampionshipOdss) => {
    const teamMatchRate = teamChampionshipOdss / oponentChampionshipOdss
    let teamWinningMatchOdds, teamDrawingMatchOdds

    if (teamMatchRate >= 250) {
        teamWinningMatchOdds = 12
        teamDrawingMatchOdds = 4.5
    }
    if (teamMatchRate >= 10 && teamMatchRate < 250) {
        teamWinningMatchOdds = 2 * (teamMatchRate ** 0.2834)
        teamDrawingMatchOdds = 1.58 * (teamMatchRate ** 0.175)
    }
    if (teamMatchRate >= 1 && teamMatchRate < 10) {
        teamWinningMatchOdds = 1.55 * (teamMatchRate ** 0.3407)
        teamDrawingMatchOdds = 2.05 * (teamMatchRate ** 0.0467)
    }
    if (teamMatchRate < 1) {
        teamWinningMatchOdds = 1.65 * (teamMatchRate ** 0.3697)
        teamDrawingMatchOdds = 1.87 * (teamMatchRate ** (-0.131))
    }
    
    return { teamWinningMatchOdds, teamDrawingMatchOdds }
}


// Convert and round match's home/draw/away odds so the three of them add up to 1  
//      - Math.ceil() is used to make sure that the three odds always add up to 1 or over
const convertAndRoundMatchOdds = (odds, totalOdds) => Math.ceil((totalOdds / odds) * 10)/100

const getConvertedMatchOdds = (homeOdds, drawOdds, awayOdds) => {
    const oddsSum = homeOdds + drawOdds + awayOdds

    const convertedHomeOdds = convertAndRoundMatchOdds(homeOdds, oddsSum)
    const convertedDrawOdds = convertAndRoundMatchOdds(drawOdds, oddsSum)
    const convertedAwayOdds = convertAndRoundMatchOdds(awayOdds, oddsSum)

    return { convertedHomeOdds, convertedDrawOdds, convertedAwayOdds }
}


// Generates match result odds given each team's odds to win the tournament
const weightedMatchOdds = (homeTeam, awayTeam) => {
    const homeChampionshipOdds = teamsOdds[homeTeam]
    const awayChampionshipOdds = teamsOdds[awayTeam]

    const homeWinningOdds = teamMatchOdds(homeChampionshipOdds, awayChampionshipOdds).teamWinningMatchOdds
    const awayWinningOdds = teamMatchOdds(awayChampionshipOdds, homeChampionshipOdds).teamWinningMatchOdds
    const drawingOdds = (teamMatchOdds(homeChampionshipOdds, awayChampionshipOdds).teamDrawingMatchOdds
        + teamMatchOdds(awayChampionshipOdds, homeChampionshipOdds).teamDrawingMatchOdds) / 2

    return { 
        "1": getConvertedMatchOdds(homeWinningOdds, drawingOdds, awayWinningOdds).convertedHomeOdds, 
        "0": getConvertedMatchOdds(homeWinningOdds, drawingOdds, awayWinningOdds).convertedDrawOdds, 
        "-1": getConvertedMatchOdds(homeWinningOdds, drawingOdds, awayWinningOdds).convertedAwayOdds 
    }
}


// Generates a random match winner given each team's odds to win the tournament
// const weightedRamdonMatchWinner = (homeTeam, awayTeam) => {
//     const spec = weightedMatchOdds(homeTeam, awayTeam)

//     let i, sum=0, r=Math.random(), result
//     for (i in spec) {
//       sum += spec[i];
//       if (r <= sum) return i;
//     }
// }


// Generates a random score matching a given winner (or draw)
const randomMatchScore = (homeTeam, awayTeam) => {
    //const winner = weightedRamdonMatchWinner(homeTeam, awayTeam)
    const winner = getRandomData( weightedMatchOdds(homeTeam, awayTeam) )

    let homeGoals=getRandomData(randomSpecs.goals)
    let awayGoals=getRandomData(randomSpecs.goals)

    // Time condition to try to avoid random crashes +++++ 
    let startTime = Date.now();
    while(
        (Math.sign(homeGoals - awayGoals) != winner)
        && (Date.now() - startTime < 500)
    ) {
        homeGoals=getRandomData(randomSpecs.goals)
        awayGoals=getRandomData(randomSpecs.goals)
    }

    return {homeGoals, awayGoals}
}


// Generates random predictions for all the matches of a given stage
const generateRandomPredictionsStage = (prediction, stage) => {
    let matchResult

    Object.keys(prediction[stage]).map(stageMatch => {
        matchResult = randomMatchScore(
            prediction[stage][stageMatch].homeTeam,
            prediction[stage][stageMatch].awayTeam
        )
        prediction[stage][stageMatch].homeGoals = matchResult.homeGoals
        prediction[stage][stageMatch].awayGoals = matchResult.awayGoals
    })

    return prediction
}

// Generates random predictions for all the matches 
// and also gets the teams qualifiying for all knock-out stages
//      - NOTE: Teams qualifying for a knock-put stage need to be got before 
//        generating the random results for those stage, since team's odds are needed
export const generateRandomPredictions = () => {
    const randomPrediction = lodashClonedeep(emptyPrediction)
    
    generateRandomPredictionsStage(randomPrediction, "leagueMatches")
    
    randomPrediction.r16Matches = getR16Teams(randomPrediction)
    generateRandomPredictionsStage(randomPrediction, "r16Matches")

    randomPrediction.quarterFinalMatches = getQuarterFinalTeams(randomPrediction)
    generateRandomPredictionsStage(randomPrediction, "quarterFinalMatches")

    randomPrediction.semiFinalMatches = getSemiFinalTeams(randomPrediction)
    generateRandomPredictionsStage(randomPrediction, "semiFinalMatches")

    randomPrediction.finalMatches = getFinalTeams(randomPrediction)
    generateRandomPredictionsStage(randomPrediction, "finalMatches")
    
    return randomPrediction
}
