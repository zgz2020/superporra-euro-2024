const automationSelector = name => `[data-automation="${name}"]`

export const selectors = {
    navItem: position => `${automationSelector("nav-item")}:nth(${position-1})`,

    pageHeader: automationSelector("page-header"),

    leaderboard: automationSelector("leaderboard"),
    leaderboardRow: {
        rank: `${automationSelector("leaderboard-row")} td:nth-child(1)`,
        username: `${automationSelector("leaderboard-row")} td:nth-child(2)`,
        score: `${automationSelector("leaderboard-row")} td:nth-child(3)`
    },

    updateButton: `${automationSelector("update-button")}:nth(0)`,

    predictionsForm: {
        form: automationSelector("predictions-form"),
        submitButton: (location) => {
            let position = location === "top" ? 0 : 1
            return `${automationSelector("submit-button")}:nth(${position})`
        },
        cancelButton: automationSelector("cancel-button"),
        randomPredictionsButton: automationSelector("random-predictions-button"),
        usernameInput: automationSelector("username-input"),
        euroStage: automationSelector("euro-stage"),
        euroStageFirstScore: stage => `${automationSelector("euro-stage")}:nth(${stage}) select:nth(0)`,
        finalStage: `${automationSelector("euro-stage")}:nth(4)`,
        finalStageTeams: `${automationSelector("euro-stage")}:nth(4) ${automationSelector("score-team")}`,
        finalStageGoals: `${automationSelector("euro-stage")}:nth(4) ${automationSelector("score-goals")} select`
    },

    predictionsSubittedMessage: automationSelector("prediction-submitted-success"),

    resultsContainer: automationSelector("results-container")

}

export const clickOnCTA = (cta) => cy.get(cta).click()


// NAVIGATION
export const checkNavigationItemLabel = (position, label) => 
    cy.get(selectors.navItem(position)).should('contain', label)

export const checkNavigationItemLink = (position, slug) => {
    clickOnCTA(selectors.navItem(position))
    cy.url().should('eq', `${Cypress.config().baseUrl}${slug}`)
}


// LEADERBOARD 
export const checkLeaderboardLastParticipant = () => cy.get(selectors.leaderboardRow.username).last().should('contain', 'ZZ Test Participant')
    // Checks that the leaderboard's last participant is the TEST participant just added

export const selectLastParticipant = () => cy.get(`${selectors.leaderboardRow.username} a`).last().click()


// PREDICTIONS FORM
export const checkElementVisibility = (selector, visible) => cy.get(selector).should(visible) 
    // 'visible' values: 'not.be.visible', 'be.visible'

export const checkPredictionsFormHeader = (header) => 
    cy.get(selectors.predictionsForm.form).should('contain', header)

export const submitPredictionsNoUsername = (ctaLocation) => { 
    // Check that Alert is triggered (note that cypress closes alerts automatically)
    const stub = cy.stub()
    cy.on('window:alert', stub)

    clickOnCTA(selectors.predictionsForm.submitButton(ctaLocation)).then(() => {
        expect(stub).to.be.calledWith('Introduce un nombre de usuario')
    })
}

const checkInputElementValue = (selector, have, value) => cy.get(selector).should(`${have}.value`, `${value}`)

export const checkFormIsEmpty = () => {
    // Username
    checkInputElementValue(selectors.predictionsForm.usernameInput, 'have', '')

    // Home-team score of each stage's first match
    cy.get(selectors.predictionsForm.euroStage).then($stages => {
        for(let i =0; i < $stages.length; i++) {
            checkInputElementValue(selectors.predictionsForm.euroStageFirstScore(i), 'have', ' ')
        }
    })

    cy.get(selectors.predictionsForm.finalStage).should('contain', 'Ganador')
}

export const fillInPredictionsForm = () => {
    cy.get(selectors.predictionsForm.usernameInput).type('ZZ Test Participant')
    clickOnCTA(selectors.predictionsForm.randomPredictionsButton)
}

export const checkFormIsFilledIn = () => {
    // Username
    checkInputElementValue(selectors.predictionsForm.usernameInput, 'not.have', '')

    // Home-team's score of each stage's first match
    cy.get(selectors.predictionsForm.euroStage).then($stages => {
        for(let i =0; i < $stages.length; i++) {
            checkInputElementValue(selectors.predictionsForm.euroStageFirstScore(i), 'not.have', ' ')
        }
    })

    // Final teams
    cy.get(selectors.predictionsForm.finalStage).should('not.contain', 'Ganador')
}


export const checkPageHeader = (header) => cy.get(selectors.pageHeader).should('contain', header)


const checkFinalMatchTeam = (team, predictionData) => // 'team' values: 0 / 1
    cy.get(selectors.predictionsForm.finalStageTeams).eq(team).invoke('text').then($resutlsFinalTeam => {
        expect(predictionData).to.contain($resutlsFinalTeam)
    })

export const updatePredictionsForm = () => {
    // Update username
    cy.get(selectors.predictionsForm.usernameInput).clear().type('ZZ Test Participant - UPDATED')
    // Update predictions
    clickOnCTA(selectors.predictionsForm.randomPredictionsButton)

    // Get teams that play final match
    cy.get(selectors.predictionsForm.finalStage).eq(0).invoke('text').then($finalMatchData => {
        // Asign final match data to a variable
        let predictionsFinalMatchData = $finalMatchData
        cy.log('FINAL - HOME TEAM: ', predictionsFinalMatchData)

        // Submit predictions - it will redirect to Participant's predictions page
        clickOnCTA(selectors.predictionsForm.submitButton('bottom'))

        // Check that username has been update in Participant's predictions page
        checkPageHeader('ZZ Test Participant - UPDATED')
        // Check Final match teams have been update in Participant's predictions page
        checkFinalMatchTeam(0, predictionsFinalMatchData)
        checkFinalMatchTeam(1, predictionsFinalMatchData)
    })
        
}

