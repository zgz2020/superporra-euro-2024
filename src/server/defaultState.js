import { emptyPrediction } from '../utils/config'

export const defaultState = {
    session: {
        authenticated: false
    },
    users: {
        byId: {
            "U1": {
                id: "U1",
                username: "Admin",
            }
        },
        allIds: ["U1"] 
    },
    predictions: {
        byId: {
            "U1": {
                owner: " ",
                winner: "???",
                topScorer: "???",
                leastConceded: "???",
                leagueMatches: emptyPrediction.leagueMatches,
                r16Matches: emptyPrediction.r16Matches,
                quarterFinalMatches: emptyPrediction.quarterFinalMatches,
                semiFinalMatches: emptyPrediction.semiFinalMatches,
                finalMatches: emptyPrediction.finalMatches
            }
        },
        allIds: ["U1"] 
    }
}

// - - - - - - - - - - - - - - - - - - - -

export const defaultStateDOS = {
    users: [
        {
            id: "U1",
            username: "Admin",
        },
        {
            id: "U2",
            username: "pollo",
        }
    ],
    predictions: [
        {
            ...emptyPrediction, owner: "U1"
        },
        {
            ...emptyPrediction, owner: "U2"
        }
    ]
}

export const normalizeDefaultStateMongo = (defaultStateMongo) => {
    let newStateMongoNorm = {
        session: {
            authenticated: false
        },
        users: {
            byId: {},
            allIds: []
        },
        predictions: {
            byId: {},
            allIds: []
        }
    }

    defaultStateMongo.users.forEach( user => {        
        newStateMongoNorm = {
            ...newStateMongoNorm,
            users: {
                ...newStateMongoNorm.users,
                byId: {
                    ...newStateMongoNorm.users.byId,
                    [user.id]: {
                        id: user.id,
                        username: user.username
                    }
                },
                allIds: [
                    ...newStateMongoNorm.users.allIds,
                    user.id
                ]
            }
        }
    })

    defaultStateMongo.predictions.forEach( prediction => {
        newStateMongoNorm = {
            ...newStateMongoNorm,
            predictions: {
                ...newStateMongoNorm.predictions,
                byId: {
                    ...newStateMongoNorm.predictions.byId,
                    [prediction.owner]: {
                        owner: prediction.owner,
                        winner: prediction.winner,
                        topScorer: prediction.topScorer,
                        leastConceded: prediction.leastConceded,
                        leagueMatches: prediction.leagueMatches,
                        r16Matches: prediction.r16Matches,
                        quarterFinalMatches: prediction.quarterFinalMatches,
                        semiFinalMatches: prediction.semiFinalMatches,
                        finalMatches: prediction.finalMatches
                    }
                },
                allIds: [
                    ...newStateMongoNorm.predictions.allIds,
                    prediction.owner
                ]
            }
        }
    })

    return newStateMongoNorm
}
