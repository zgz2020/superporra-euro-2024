export const leagueGroups = {
    "A": ["Italy", "Switzerland", "Turkey", "Wales"], 
    "B": ["Belgium", "Denmark", "Finland", "Russia"], 
    "C": ["Austria", "Netherlands", "Ukraine", "Play-off D"], 
    "D": ["Croatia", "Czech Republic", "England", "Play-off C"], 
    "E": ["Poland", "Spain", "Sweden", "Play-off B"],
    "F": ["France", "Germany", "Portugal", "Play-off A"]
} 

export const groupsList = Object.keys(leagueGroups)

// https://en.wikipedia.org/wiki/List_of_FIFA_country_codes
export const countryShortNames = {
    [leagueGroups["A"][0]]: "ITA", 
    [leagueGroups["A"][1]]: "SUI", 
    [leagueGroups["A"][2]]: "TUR", 
    [leagueGroups["A"][3]]: "WAL", 
    [leagueGroups["B"][0]]: "BEL", 
    [leagueGroups["B"][1]]: "DEN", 
    [leagueGroups["B"][2]]: "FIN", 
    [leagueGroups["B"][3]]: "RUS", 
    [leagueGroups["C"][0]]: "AUT", 
    [leagueGroups["C"][1]]: "NED", 
    [leagueGroups["C"][2]]: "UKR", 
    [leagueGroups["C"][3]]: "POD", 
    [leagueGroups["D"][0]]: "CRO", 
    [leagueGroups["D"][1]]: "CZE", 
    [leagueGroups["D"][2]]: "ENG", 
    [leagueGroups["D"][3]]: "POC", 
    [leagueGroups["E"][0]]: "POL", 
    [leagueGroups["E"][1]]: "ESP", 
    [leagueGroups["E"][2]]: "SWE", 
    [leagueGroups["E"][3]]: "POB",
    [leagueGroups["F"][0]]: "FRA", 
    [leagueGroups["F"][1]]: "GER", 
    [leagueGroups["F"][2]]:"POR", 
    [leagueGroups["F"][3]]: "POA"
}

const leagueGroupFirstAndLastMatches = {
    "A": {
        firstMatch: 1,
        lastMatch: 6
    },
    "B": {
        firstMatch: 7,
        lastMatch: 12
    },
    "C": {
        firstMatch: 13,
        lastMatch: 18
    },
    "D": {
        firstMatch: 19,
        lastMatch: 24
    },
    "E": {
        firstMatch: 25,
        lastMatch: 30
    },
    "F": {
        firstMatch: 31,
        lastMatch: 36
    }
}

export const groupMatches = (group, predictions) => {
    const groupMatchesList = {}

    for(let i = leagueGroupFirstAndLastMatches[group].firstMatch; i < leagueGroupFirstAndLastMatches[group].lastMatch+1; i++){
        groupMatchesList[i] = predictions.leagueMatches[i]
    }
    
    return groupMatchesList
}

export const teamsList = () => {
    let teams = []
    Object.keys(leagueGroups).map(group => {
        teams = teams.concat(leagueGroups[group])
    })
    return teams.sort()
} 

export const teamsOdds = {
    [leagueGroups["A"][0]]: 11, 
    [leagueGroups["A"][1]]: 80, 
    [leagueGroups["A"][2]]: 100, 
    [leagueGroups["A"][3]]: 100, 
    [leagueGroups["B"][0]]: 5, 
    [leagueGroups["B"][1]]: 80, 
    [leagueGroups["B"][2]]: 250, 
    [leagueGroups["B"][3]]: 100, 
    [leagueGroups["C"][0]]: 100, 
    [leagueGroups["C"][1]]: 7, 
    [leagueGroups["C"][2]]: 66, 
    [leagueGroups["C"][3]]: 500, 
    [leagueGroups["D"][0]]: 25, 
    [leagueGroups["D"][1]]: 150, 
    [leagueGroups["D"][2]]: 5, 
    [leagueGroups["D"][3]]: 125, 
    [leagueGroups["E"][0]]: 100, 
    [leagueGroups["E"][1]]: 8, 
    [leagueGroups["E"][2]]: 125, 
    [leagueGroups["E"][3]]: 200,
    [leagueGroups["F"][0]]: 5.5, 
    [leagueGroups["F"][1]]: 7, 
    [leagueGroups["F"][2]]:16, 
    [leagueGroups["F"][3]]: 150
}

export const emptyPrediction = {
    id: " ",
    owner: " ",
    username: " ",
    winner: "???",
    topScorer: "???",
    leastConceded: "???",
    leagueMatches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            group: "A",
            homeTeam: leagueGroups["A"][2],
            awayTeam: leagueGroups["A"][0]
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            group: "A",
            homeTeam: leagueGroups["A"][3],
            awayTeam: leagueGroups["A"][1]
        },
        "3": {
            id: "3",
            homeGoals: " ",
            awayGoals: " ",
            group: "A",
            homeTeam: leagueGroups["A"][2],
            awayTeam: leagueGroups["A"][3]
        },
        "4": {
            id: "4",
            homeGoals: " ",
            awayGoals: " ",
            group: "A",
            homeTeam: leagueGroups["A"][0],
            awayTeam: leagueGroups["A"][1]
        },
        "5": {
            id: "5",
            homeGoals: " ",
            awayGoals: " ",
            group: "A",
            homeTeam: leagueGroups["A"][0],
            awayTeam: leagueGroups["A"][3]
        },
        "6": {
            id: "6",
            homeGoals: " ",
            awayGoals: " ",
            group: "A",
            homeTeam: leagueGroups["A"][1],
            awayTeam: leagueGroups["A"][2]
        },
        "7": {
            id: "7",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][1],
            awayTeam: leagueGroups["B"][2]
        },
        "8": {
            id: "8",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][0],
            awayTeam: leagueGroups["B"][3]
        },
        "9": {
            id: "9",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][2],
            awayTeam: leagueGroups["B"][3]
        },
        "10": {
            id: "10",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][1],
            awayTeam: leagueGroups["B"][0]
        },
        "11": {
            id: "11",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][2],
            awayTeam: leagueGroups["B"][0]
        },
        "12": {
            id: "12",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][3],
            awayTeam: leagueGroups["B"][1]
        },
        "13": {
            id: "13",
            homeGoals: " ",
            awayGoals: " ",
            group: "C",
            homeTeam: leagueGroups["C"][0],
            awayTeam: leagueGroups["C"][3]
        },
        "14": {
            id: "14",
            homeGoals: " ",
            awayGoals: " ",
            group: "C",
            homeTeam: leagueGroups["C"][1],
            awayTeam: leagueGroups["C"][2]
        },
        "15": {
            id: "15",
            homeGoals: " ",
            awayGoals: " ",
            group: "C",
            homeTeam: leagueGroups["C"][2],
            awayTeam: leagueGroups["C"][3]
        },
        "16": {
            id: "16",
            homeGoals: " ",
            awayGoals: " ",
            group: "C",
            homeTeam: leagueGroups["C"][1],
            awayTeam: leagueGroups["C"][0]
        },
        "17": {
            id: "17",
            homeGoals: " ",
            awayGoals: " ",
            group: "C",
            homeTeam: leagueGroups["C"][2],
            awayTeam: leagueGroups["C"][0]
        },
        "18": {
            id: "18",
            homeGoals: " ",
            awayGoals: " ",
            group: "C",
            homeTeam: leagueGroups["C"][3],
            awayTeam: leagueGroups["C"][1]
        },
        "19": {
            id: "19",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][2],
            awayTeam: leagueGroups["D"][0]
        },
        "20": {
            id: "20",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][3],
            awayTeam: leagueGroups["D"][1]
        },
        "21": {
            id: "21",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][0],
            awayTeam: leagueGroups["D"][1]
        },
        "22": {
            id: "22",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][2],
            awayTeam: leagueGroups["D"][3]
        },
        "23": {
            id: "23",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][1],
            awayTeam: leagueGroups["D"][2]
        },
        "24": {
            id: "24",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][0],
            awayTeam: leagueGroups["D"][3]
        },
        "25": {
            id: "25",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][0],
            awayTeam: leagueGroups["E"][3]
        },
        "26": {
            id: "26",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][1],
            awayTeam: leagueGroups["E"][2]
        },
        "27": {
            id: "27",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][2],
            awayTeam: leagueGroups["E"][3]
        },
        "28": {
            id: "28",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][1],
            awayTeam: leagueGroups["E"][0]
        },
        "29": {
            id: "29",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][2],
            awayTeam: leagueGroups["E"][0]
        },
        "30": {
            id: "30",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][3],
            awayTeam: leagueGroups["E"][1]
        },
        "31": {
            id: "31",
            homeGoals: " ",
            awayGoals: " ",
            group: "F",
            homeTeam: leagueGroups["F"][3],
            awayTeam: leagueGroups["F"][2]
        },
        "32": {
            id: "32",
            homeGoals: " ",
            awayGoals: " ",
            group: "F",
            homeTeam: leagueGroups["F"][0],
            awayTeam: leagueGroups["F"][1]
        },
        "33": {
            id: "33",
            homeGoals: " ",
            awayGoals: " ",
            group: "F",
            homeTeam: leagueGroups["F"][3],
            awayTeam: leagueGroups["F"][0]
        },
        "34": {
            id: "34",
            homeGoals: " ",
            awayGoals: " ",
            group: "F",
            homeTeam: leagueGroups["F"][2],
            awayTeam: leagueGroups["F"][1]
        },
        "35": {
            id: "35",
            homeGoals: " ",
            awayGoals: " ",
            group: "F",
            homeTeam: leagueGroups["F"][1],
            awayTeam: leagueGroups["F"][3]
        },
        "36": {
            id: "36",
            homeGoals: " ",
            awayGoals: " ",
            group: "F",
            homeTeam: leagueGroups["F"][2],
            awayTeam: leagueGroups["F"][0]
        }
    },
    r16Matches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "2o Grupo A",
            awayTeam: "2o Grupo B"
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1o Grupo A",
            awayTeam: "2o Grupo C"
        },
        "3": {
            id: "3",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1o Grupo C",
            awayTeam: "3o D, E o F"
        },
        "4": {
            id: "4",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1o Grupo B",
            awayTeam: "3o A, D, E o F"
        },
        "5": {
            id: "5",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "2o Grupo D",
            awayTeam: "2o Grupo E"
        },
        "6": {
            id: "6",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1o Grupo F",
            awayTeam: "3o A, B o C"
        },
        "7": {
            id: "7",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1o Grupo D",
            awayTeam: "2o Grupo F"
        },
        "8": {
            id: "8",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1o Grupo E",
            awayTeam: "3o A, B, C o D"
        }
    },
    quarterFinalMatches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-6",
            awayTeam: "R16-5"
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-4",
            awayTeam: "R16-2"
        },
        "3": {
            id: "3",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-3",
            awayTeam: "R16-1"
        },
        "4": {
            id: "4",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-8",
            awayTeam: "R16-7"
        }
    },
    semiFinalMatches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "QF-2",
            awayTeam: "QF-1"
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "QF-4",
            awayTeam: "QF-3"
        }
    },
    finalMatches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "SF-1",
            awayTeam: "SF-2"
        }
    }
}

export const allMatchStages = Object.keys(emptyPrediction).filter(stage => stage.includes('Match'))

export const knockOutStages = allMatchStages.slice(1)

export const matchStagesTitles = (translations) => {
    return {
        [allMatchStages[0]]: translations.stages.groupStage,
        [allMatchStages[1]]: translations.stages.r16,
        [allMatchStages[2]]: translations.stages.quarterFinals,
        [allMatchStages[3]]: translations.stages.semiFinals,
        [allMatchStages[4]]: translations.stages.final
    }
}

export const goalsDropDown = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export const pointsPerQualifiedTeam = (stage) => {
    switch (stage) {
        case knockOutStages[0]:
            return 10
        case knockOutStages[1]:
            return 15
        case knockOutStages[2]:
            return 20
        case knockOutStages[3]:
            return 25
        default:
            return 0
    }
}

export const randomSpecs = {
    goals: {
        0: 0.3,
        1: 0.3,
        2: 0.2,
        3: 0.15,
        4: 0.03,
        5: 0.02
    }
}
