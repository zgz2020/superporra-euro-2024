// import md5 from 'md5';
// export const defaultState = {
//     users:[{
//         id:"U1",
//         name:"Dev",
//         passwordHash:md5("TUPLES"),
//         friends:[`U2`]
//     },{
//         id:"U2",
//         name:"C. Eeyo",
//         passwordHash:md5("PROFITING"),
//         friends:[]
//     }],
//     groups:[{
//         name:"To Do",
//         id:"G1",
//         owner:"U1"
//     },{
//         name:"Doing",
//         id:"G2",
//         owner:"U1"
//     },{
//         name:"Done",
//         id:"G3",
//         owner:"U1"
//     }
//     ],
//     tasks:[{
//         name:"Refactor tests",
//         id:"T1",
//         group:"G1",
//         owner:"U1",
//         isComplete:false,
//     },{
//         name:"Meet with CTO",
//         id:"T2",
//         group:"G1",
//         owner:"U1",
//         isComplete:true,
//     },{
//         name:"Compile ES6",
//         id:"T3",
//         group:"G2",
//         owner:"U2",
//         isComplete:false,
//     },{
//         name:"Update component snapshots",
//         id:"T4",
//         group:"G2",
//         owner:"U1",
//         isComplete:true,
//     },{
//         name:"Production optimizations",
//         id:"T5",
//         group:"G3",
//         owner:"U1",
//         isComplete:false,
//     }],
//     comments:[{
//         owner:"U1",
//         id:"C1",
//         task:"T1",
//         content:"Great work!"
//     }]
// };

// -------------------------------------------------------------
// -------------------------------------------------------------

import { emptyPrediction } from '../config'

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
                winner: " ",
                finalist: " ",
                topScorer: " ",
                leastConceded: " ",
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
                        finalist: prediction.finalist,
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
