const automationSelector = name => `[data-automation="${name}"]`

export const selectors = {
    navItem: automationSelector("nav-item"),

    leaderboardRow: {
        rank: `${automationSelector("leaderboard-row")} td:nth-child(1)`,
        username: `${automationSelector("leaderboard-row")} td:nth-child(2)`,
        score: `${automationSelector("leaderboard-row")} td:nth-child(3)`
    },

    updateButton: automationSelector('update-button')
}