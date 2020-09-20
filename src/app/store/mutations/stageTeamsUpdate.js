export const TEAMS_UPDATED = 'TEAMS_UPDATED'

export const teamsUpdated = (predictionType, stage) => ({
    type: TEAMS_UPDATED,
    predictionType,
    stage
})