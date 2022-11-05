export const leagueGroups = {
    "A": ["Ecuador", "Netherlands", "Qatar", "Senegal"], 
    "B": ["England", "Iran", "USA", "Wales"], 
    "C": ["Argentina", "Mexico", "Poland", "Saudi Arabia"], 
    "D": ["Australia", "Denmark", "France", "Tunisia"], 
    "E": ["Costa Rica", "Germany", "Japan", "Spain"],
    "F": ["Belgium", "Canada", "Croatia", "Morocco"],
    "G": ["Brazil", "Cameroon", "Serbia", "Switzerland"],
    "H": ["Ghana", "Portugal", "South Korea", "Uruguay"],
} 

export const groupsList = Object.keys(leagueGroups)

// https://en.wikipedia.org/wiki/List_of_FIFA_country_codes
export const countryShortNames = {
    [leagueGroups["A"][0]]: "ECU", 
    [leagueGroups["A"][1]]: "NED", 
    [leagueGroups["A"][2]]: "QAT", 
    [leagueGroups["A"][3]]: "SEN", 
    [leagueGroups["B"][0]]: "ENG", 
    [leagueGroups["B"][1]]: "IRN", 
    [leagueGroups["B"][2]]: "USA", 
    [leagueGroups["B"][3]]: "WAL", 
    [leagueGroups["C"][0]]: "ARG", 
    [leagueGroups["C"][1]]: "MEX", 
    [leagueGroups["C"][2]]: "POL", 
    [leagueGroups["C"][3]]: "KSA", 
    [leagueGroups["D"][0]]: "AUS", 
    [leagueGroups["D"][1]]: "DEN", 
    [leagueGroups["D"][2]]: "FRA", 
    [leagueGroups["D"][3]]: "TUN", 
    [leagueGroups["E"][0]]: "CRC", 
    [leagueGroups["E"][1]]: "GER", 
    [leagueGroups["E"][2]]: "JPN", 
    [leagueGroups["E"][3]]: "ESP",
    [leagueGroups["F"][0]]: "BEL", 
    [leagueGroups["F"][1]]: "CAN", 
    [leagueGroups["F"][2]]: "CRO", 
    [leagueGroups["F"][3]]: "MAR",
    [leagueGroups["G"][0]]: "BRA", 
    [leagueGroups["G"][1]]: "CMR", 
    [leagueGroups["G"][2]]: "SRB", 
    [leagueGroups["G"][3]]: "SUI",
    [leagueGroups["H"][0]]: "GHA", 
    [leagueGroups["H"][1]]: "POR", 
    [leagueGroups["H"][2]]: "KOR", 
    [leagueGroups["H"][3]]: "URU"
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
    },
    "G": {
        firstMatch: 37,
        lastMatch: 42
    },
    "H": {
        firstMatch: 43,
        lastMatch: 48
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
    [leagueGroups["A"][1]]: 70, 
    [leagueGroups["A"][2]]: 50, 
    [leagueGroups["A"][3]]: 125, 
    [leagueGroups["B"][0]]: 6, 
    [leagueGroups["B"][1]]: 28, 
    [leagueGroups["B"][2]]: 300, 
    [leagueGroups["B"][3]]: 80, 
    [leagueGroups["C"][0]]: 80, 
    [leagueGroups["C"][1]]: 11, 
    [leagueGroups["C"][2]]: 500, 
    [leagueGroups["C"][3]]: 75, 
    [leagueGroups["D"][0]]: 33, 
    [leagueGroups["D"][1]]: 100, 
    [leagueGroups["D"][2]]: 5, 
    [leagueGroups["D"][3]]: 200, 
    [leagueGroups["E"][0]]: 80, 
    [leagueGroups["E"][1]]: 250, 
    [leagueGroups["E"][2]]: 7, 
    [leagueGroups["E"][3]]: 80,
    [leagueGroups["F"][0]]: 5, 
    [leagueGroups["F"][1]]: 7, 
    [leagueGroups["F"][2]]:300, 
    [leagueGroups["F"][3]]: 8,
    [leagueGroups["G"][0]]: 80, 
    [leagueGroups["G"][1]]: 250, 
    [leagueGroups["G"][2]]: 7, 
    [leagueGroups["G"][3]]: 80,
    [leagueGroups["H"][0]]: 5, 
    [leagueGroups["H"][1]]: 7, 
    [leagueGroups["H"][2]]:300, 
    [leagueGroups["H"][3]]: 8
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
            homeTeam: leagueGroups["A"][1],
            awayTeam: leagueGroups["A"][0]
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
            homeTeam: leagueGroups["B"][0],
            awayTeam: leagueGroups["B"][1]
        },
        "8": {
            id: "8",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][2],
            awayTeam: leagueGroups["B"][3]
        },
        "9": {
            id: "9",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][3],
            awayTeam: leagueGroups["B"][1]
        },
        "10": {
            id: "10",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][0],
            awayTeam: leagueGroups["B"][2]
        },
        "11": {
            id: "11",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][1],
            awayTeam: leagueGroups["B"][2]
        },
        "12": {
            id: "12",
            homeGoals: " ",
            awayGoals: " ",
            group: "B",
            homeTeam: leagueGroups["B"][3],
            awayTeam: leagueGroups["B"][0]
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
            homeTeam: leagueGroups["C"][0],
            awayTeam: leagueGroups["C"][1]
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
            homeTeam: leagueGroups["D"][1],
            awayTeam: leagueGroups["D"][3]
        },
        "20": {
            id: "20",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][2],
            awayTeam: leagueGroups["D"][0]
        },
        "21": {
            id: "21",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][3],
            awayTeam: leagueGroups["D"][0]
        },
        "22": {
            id: "22",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][2],
            awayTeam: leagueGroups["D"][1]
        },
        "23": {
            id: "23",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][0],
            awayTeam: leagueGroups["D"][1]
        },
        "24": {
            id: "24",
            homeGoals: " ",
            awayGoals: " ",
            group: "D",
            homeTeam: leagueGroups["D"][3],
            awayTeam: leagueGroups["D"][2]
        },
        "25": {
            id: "25",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][1],
            awayTeam: leagueGroups["E"][2]
        },
        "26": {
            id: "26",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][3],
            awayTeam: leagueGroups["E"][0]
        },
        "27": {
            id: "27",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][2],
            awayTeam: leagueGroups["E"][0]
        },
        "28": {
            id: "28",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][3],
            awayTeam: leagueGroups["E"][1]
        },
        "29": {
            id: "29",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][0],
            awayTeam: leagueGroups["E"][1]
        },
        "30": {
            id: "30",
            homeGoals: " ",
            awayGoals: " ",
            group: "E",
            homeTeam: leagueGroups["E"][2],
            awayTeam: leagueGroups["E"][3]
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
            homeTeam: leagueGroups["F"][0],
            awayTeam: leagueGroups["F"][3]
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
        },
        "37": {
            id: "37",
            homeGoals: " ",
            awayGoals: " ",
            group: "G",
            homeTeam: leagueGroups["A"][3],
            awayTeam: leagueGroups["A"][1]
        },
        "38": {
            id: "38",
            homeGoals: " ",
            awayGoals: " ",
            group: "G",
            homeTeam: leagueGroups["A"][0],
            awayTeam: leagueGroups["A"][2]
        },
        "39": {
            id: "39",
            homeGoals: " ",
            awayGoals: " ",
            group: "G",
            homeTeam: leagueGroups["A"][1],
            awayTeam: leagueGroups["A"][2]
        },
        "40": {
            id: "40",
            homeGoals: " ",
            awayGoals: " ",
            group: "G",
            homeTeam: leagueGroups["A"][0],
            awayTeam: leagueGroups["A"][3]
        },
        "41": {
            id: "41",
            homeGoals: " ",
            awayGoals: " ",
            group: "G",
            homeTeam: leagueGroups["A"][1],
            awayTeam: leagueGroups["A"][0]
        },
        "42": {
            id: "42",
            homeGoals: " ",
            awayGoals: " ",
            group: "G",
            homeTeam: leagueGroups["A"][2],
            awayTeam: leagueGroups["A"][3]
        },
        "43": {
            id: "43",
            homeGoals: " ",
            awayGoals: " ",
            group: "H",
            homeTeam: leagueGroups["B"][3],
            awayTeam: leagueGroups["B"][2]
        },
        "44": {
            id: "44",
            homeGoals: " ",
            awayGoals: " ",
            group: "H",
            homeTeam: leagueGroups["B"][1],
            awayTeam: leagueGroups["B"][0]
        },
        "45": {
            id: "45",
            homeGoals: " ",
            awayGoals: " ",
            group: "H",
            homeTeam: leagueGroups["B"][2],
            awayTeam: leagueGroups["B"][0]
        },
        "46": {
            id: "46",
            homeGoals: " ",
            awayGoals: " ",
            group: "H",
            homeTeam: leagueGroups["B"][1],
            awayTeam: leagueGroups["B"][3]
        },
        "47": {
            id: "47",
            homeGoals: " ",
            awayGoals: " ",
            group: "H",
            homeTeam: leagueGroups["B"][0],
            awayTeam: leagueGroups["B"][3]
        },
        "48": {
            id: "48",
            homeGoals: " ",
            awayGoals: " ",
            group: "H",
            homeTeam: leagueGroups["B"][2],
            awayTeam: leagueGroups["B"][1]
        }
    },
    r16Matches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group A",
            awayTeam: "2nd in Group B"
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group C",
            awayTeam: "2nd in Group D"
        },
        "3": {
            id: "3",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group D",
            awayTeam: "2nd in Group C"
        },
        "4": {
            id: "4",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group B",
            awayTeam: "2nd in Group A"
        },
        "5": {
            id: "5",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group E",
            awayTeam: "2nd in Group F"
        },
        "6": {
            id: "6",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group G",
            awayTeam: "2nd in Group H"
        },
        "7": {
            id: "7",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group F",
            awayTeam: "2nd in Group E"
        },
        "8": {
            id: "8",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "1st in Group H",
            awayTeam: "2nd in Group G"
        }
    },
    quarterFinalMatches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-5",
            awayTeam: "R16-6"
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-1",
            awayTeam: "R16-2"
        },
        "3": {
            id: "3",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-7",
            awayTeam: "R16-8"
        },
        "4": {
            id: "4",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "R16-4",
            awayTeam: "R16-3"
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
