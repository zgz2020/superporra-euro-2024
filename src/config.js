export const leagueGroups = {
    "A": ["Italy", "Switzerland", "Turkey", "Wales"], 
    "B": ["Belgium", "Denmark", "Finland", "Russia"], 
    "C": ["Austria", "Netherlands", "Ukraine", "Play-off D"], 
    "D": ["Croatia", "Czech Republic", "England", "Play-off C"], 
    "E": ["Poland", "Spain", "Sweden", "Play-off B"],
    "F": ["France", "Germany", "Portugal", "Play-off A"]
} 

export const groupsList = Object.keys(leagueGroups)

export const teamsList = () => {
    let teams = []
    Object.keys(leagueGroups).map(group => {
        teams = teams.concat(leagueGroups[group])
    })
    return teams.sort()
} 

export const knockOutStages = ["r16Matches", "quarterFinalMatches", "semiFinalMatches", "finalMatches"]

export const emptyPrediction = {
    owner: " ",
    winner: " ",
    finalist: " ",
    topScorer: " ",
    leastConceded: " ",
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
            homeTeam: "Ganador R16-6",
            awayTeam: "Ganador R16-5"
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "Ganador R16-4",
            awayTeam: "Ganador R16-2"
        },
        "3": {
            id: "3",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "Ganador R16-3",
            awayTeam: "Ganador R16-1"
        },
        "4": {
            id: "4",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "Ganador R16-8",
            awayTeam: "Ganador R16-7"
        }
    },
    semiFinalMatches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "Ganador QF-2",
            awayTeam: "Ganador QF-1"
        },
        "2": {
            id: "2",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "Ganador QF-4",
            awayTeam: "Ganador QF-3"
        }
    },
    finalMatches: {
        "1": {
            id: "1",
            homeGoals: " ",
            awayGoals: " ",
            homeTeam: "Ganador SF-1",
            awayTeam: "Ganador SF-2"
        }
    }
}

export const fieldLabel = field => {
    switch(field) {
        case "winner":
            return "Ganador"
        case "finalist":
                return "Finalista"
        case "topScorer":
            return "Máximo goleador"
        case "leastConceded":
            return "Menos goleado"
        default: 
            return "Wrong field!"
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
