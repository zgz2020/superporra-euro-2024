export const TEAMS_UPDATED = 'TEAMS_UPDATED'

export const teamsUpdated = (predictionType, stage, predictionID) => ({
    type: TEAMS_UPDATED,
    predictionType,
    stage,
    predictionID
})