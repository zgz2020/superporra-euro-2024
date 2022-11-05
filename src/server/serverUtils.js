export const updatePredictionMatches = async (collection, id, prediction, matchType) => {
    let query = {}

    let matchesLength = (matchType) => {
        switch (matchType) {
            case "leagueMatches":
                return 49
            case "r16Matches":
                return 9
            case "quarterFinalMatches":
                return 5
            case "semiFinalMatches":
                return 3
            case "finalMatches":
                return 2
            default:
                return 37
        }
    }

    for (let i=1; i < matchesLength(matchType); i++) {

        if ( prediction[matchType][i.toString()]) { 
            
            if ( prediction[matchType][i.toString()].homeGoals || prediction[matchType][i.toString()].homeGoals === 0) {

                query[`${matchType}.${i}.homeGoals`] = prediction[matchType][i.toString()].homeGoals

                await collection.updateOne( 
                    { id }, 
                    { $set: query }
                )
            }

            if ( prediction[matchType][i.toString()].awayGoals || prediction[matchType][i.toString()].awayGoals === 0) {
                query[`${matchType}.${i}.awayGoals`] = prediction[matchType][i.toString()].awayGoals

                await collection.updateOne( 
                    { id }, 
                    { $set: query }
                )
            }
        }

    }
}