const automationSelector = name => `[data-automation="${name}"]`

export const selectors = {
    languagePicker: automationSelector("language-picker"),

    navItem: position => `${automationSelector("nav-item")}:nth(${position-1})`,
    mobileNavToggleButton: automationSelector("mobile-nav-toggle-button"),

    pageHeader: automationSelector("page-header"),
    cardHeader: '.card-header',
    cardBody: '.card-body',

    leaderboard: automationSelector("leaderboard"),
    leaderboardRow: {
        rank: `${automationSelector("leaderboard-row")} td:nth-child(1)`,
        username: `${automationSelector("leaderboard-row")} td:nth-child(2) a`,
        score: `${automationSelector("leaderboard-row")} td:nth-child(3) a`
    },

    updateButton: `${automationSelector("update-button")}:nth(0)`,

    inputForm: {
        form: automationSelector("predictions-form"),
        submitButton: (location) => {
            let position = location === "top" ? 0 : 1
            return `${automationSelector("submit-button")}:nth(${position})`
        },
        cancelButton: automationSelector("cancel-button"),
        randomPredictionsButton: automationSelector("random-predictions-button"),
        usernameInput: automationSelector("username-input"),
        nicknameTakenError: automationSelector("username-taken"),
        euroStage: automationSelector("euro-stage"),
        euroStageFirstScore: stage => `${automationSelector("euro-stage")}:nth(${stage}) select:nth(0)`,
        finalStage: `${automationSelector("euro-stage")}:nth(4)`,
        finalStageTeams: `${automationSelector("euro-stage")}:nth(4) ${automationSelector("score-team")}`,
        generalPredictions: automationSelector("general-prediction")
    },

    predictionsSubittedMessage: automationSelector("prediction-submitted-success"),

    resultsContainer: automationSelector("results-container"),
    firstScoreGoals: `${automationSelector("score-goals")}:nth(0)`,

    emailInput: automationSelector("email-address-input"),
    passwordInput: automationSelector("password-input"),
    submitButton: '.btn-primary',
    errors: {
        noEmailSignIn: automationSelector('no-email-message-signIn'),
        noEmailSignUp: automationSelector('no-email-message-signUp'),
        noEmailForgotPassword: automationSelector('no-email-message-forgotPassword'),
        emailErrorSignIn: automationSelector('email-error-signIn'),
        emailErrorSignUp: automationSelector('email-error-signUp'),
        emailErrorForgotPassword: automationSelector('email-error-forgotPassword'),
        passwordErrorSignIn: automationSelector('password-error-signIn'),
        passwordErrorSignUp: automationSelector('password-error-signUp'),
    },
    emailSent: automationSelector('reset-password-email-sent')
}
 
const elementVisibilityAssertion = (status) => {
    if (status == 'visible') return 'be.visible'
    if (status == 'hidden') return 'not.to.exist'
}

export const clickOnCTA = (cta) => cy.get(cta).click()



// --------------------------------------------------------------
// LANGUAGE PICKER
// --------------------------------------------------------------

export const selectLanguage = (language) =>
    cy.get(selectors.languagePicker).select(language)



// --------------------------------------------------------------
// NAVIGATION
// --------------------------------------------------------------

export const checkNavigationItemLabel = (position, label) => 
    cy.get(selectors.navItem(position)).should('contain', label)

export const checkNavigationItemLink = (viewport, position, slug) => {
    if (viewport === "mobile") clickOnCTA(selectors.mobileNavToggleButton)

    clickOnCTA(selectors.navItem(position))
    cy.wait(500)
    cy.url().should('eq', `${Cypress.config().baseUrl}${slug}`)
}



// --------------------------------------------------------------
// LEADERBOARD 
// --------------------------------------------------------------

export const checkFirstRank = () => cy.get(selectors.leaderboardRow.rank).eq(0).should('contain', '1')

export const checkFirstParticipantLinks = () => {
    cy.get(selectors.leaderboardRow.username).eq(0).click()
        .wait(500)
        .get(selectors.pageHeader).should('contain', 'Predictions:')
    cy.go('back')
    cy.get(selectors.leaderboardRow.score).eq(0).click()
        .get(selectors.pageHeader).should('contain', 'Scores:')

}

export const checkLeaderboardLastParticipant = () => cy.get(selectors.leaderboardRow.username).last().should('contain', 'ZZ Test Participant')
    // Checks that the leaderboard's last participant is the TEST participant just added

export const selectLastParticipant = () => cy.get(selectors.leaderboardRow.username).last().click()

export const checkUserOnlyPrediction = () => cy.get(selectors.leaderboardRow.username).should('contain', 'ZZ Test Participant')

export const selectUserOnlyPrediction = () => cy.get(selectors.leaderboardRow.username).click()



// --------------------------------------------------------------
// PREDICTIONS FORM
// --------------------------------------------------------------

export const checkElementVisibility = (selector, visible) => cy.get(selector).should(visible) 
    // 'visible' values: 'not.be.visible', 'be.visible'

export const checkInputFormHeader = (header) => 
    cy.get(selectors.inputForm.form).should('contain', header)

export const submitPredictionsNoUsername = (ctaLocation) => { 
    // Check that Alert is triggered (note that cypress closes alerts automatically)
    const stub = cy.stub()
    cy.on('window:alert', stub)

    clickOnCTA(selectors.inputForm.submitButton(ctaLocation)).then(() => {
        expect(stub).to.be.calledWith("Fill in the 'Username' field")
    })
}

const checkInputElementValue = (selector, have, value) => cy.get(selector).should(`${have}.value`, `${value}`)

const checkMatchStagesValues = (have) => {
    cy.get(selectors.inputForm.euroStage).then($stages => {
        for(let i = 0; i < $stages.length; i++) {
            checkInputElementValue(selectors.inputForm.euroStageFirstScore(i), have, ' ')
        }
    })
}

const checkGeneralPredictionsValue = (contain) => {
    cy.get(selectors.inputForm.generalPredictions).then($generalPredictions => {
        for(let i = 0; i < $generalPredictions.length; i++) {
            cy.get(selectors.inputForm.generalPredictions).eq(i).should(contain, '???')
        }
    })
}


export const checkFormIsEmpty = () => {
    // Username
    checkInputElementValue(selectors.inputForm.usernameInput, 'have', '')

    // Home-team score of each stage's first match
    checkMatchStagesValues('have')

    // Final teams
    cy.get(selectors.inputForm.finalStage).should('contain', 'SF-1')

    // General predictions (Euro Winner, Top Scorer...)
    checkGeneralPredictionsValue('contain')
}

export const fillInInputForm = () => {
    typeNickname(`ZZ Test Participant - ${randomInt10000()}`)
    clickOnCTA(selectors.inputForm.randomPredictionsButton)
    cy.wait(1000)
}

export const checkFormIsFilledIn = () => {
    // Username
    checkInputElementValue(selectors.inputForm.usernameInput, 'not.have', '')

    // Home-team's score of each stage's first match
    checkMatchStagesValues('not.have')

    // Final teams
    cy.get(selectors.inputForm.finalStage).should('not.contain', 'Ganador')

    // General predictions (Euro Winner, Top Scorer...)
    checkGeneralPredictionsValue('not.contain')
}


export const checkPageHeader = (header) => cy.get(selectors.pageHeader).should('contain', header)


const checkFinalMatchTeam = (team, predictionData) => // 'team' values: 0 / 1
    cy.get(selectors.inputForm.finalStageTeams).eq(team).invoke('text').then($resutlsFinalTeam => {
        expect(predictionData).to.contain($resutlsFinalTeam)
    })

export const updateInputForm = () => {
    // Update username
    typeNickname(`ZZ Test Participant - UPDATED - ${randomInt10000()}`)
    // Update predictions
    clickOnCTA(selectors.inputForm.randomPredictionsButton)

    // Wait for 2 seconds to make sure that the new random predictions have fully loaded
    cy.wait(2000)

    // Get teams that play final match
    cy.get(selectors.inputForm.finalStage).eq(0).invoke('text').then($finalMatchData => {
        // Asign final match data to a variable
        let predictionsFinalMatchData = $finalMatchData

        // Submit predictions - it will redirect to Participant's predictions page
        clickOnCTA(selectors.inputForm.submitButton('bottom'))

        // Check that username has been update in Participant's predictions page
        checkPageHeader('ZZ Test Participant - UPDATED')
        // Check Final match teams have been update in Participant's predictions page
        checkFinalMatchTeam(0, predictionsFinalMatchData)
        checkFinalMatchTeam(1, predictionsFinalMatchData)
    })
        
}


export const updateFirstMatchScore = (goals) => 
    cy.get(selectors.inputForm.euroStageFirstScore(0)).select(goals)

export const checkFirstMatchScoreGoals = (goals) => 
    cy.get(selectors.firstScoreGoals).invoke('text').should('eq', goals)


const verifyNicknameTakenError = (status) => {
    cy.get(selectors.inputForm.nicknameTakenError).should(elementVisibilityAssertion(status))
}

const typeNickname = (nickname) => cy.get(selectors.inputForm.usernameInput).clear().type(nickname)

const verifySubmitButtonDisabled = (location) => {
    cy.get(selectors.inputForm.submitButton(location)).should('have.attr', 'disabled')
}

export const nicknameTakenTest = () => {
    verifyNicknameTakenError('hidden')
    typeNickname('juanjo')
    verifyNicknameTakenError('visible')
    verifySubmitButtonDisabled('top')
    verifySubmitButtonDisabled('bottom')
}

// --------------------------------------------------------------
// My Account 
// --------------------------------------------------------------

export const checkNoBetsYet = () => cy.get(selectors.cardBody).should('contain', "You don't have any bets yet")



// --------------------------------------------------------------
// Sign In / Up
// --------------------------------------------------------------

export const signIn = (email, password) => {
    cy.get(selectors.emailInput).eq(0).type(email)
        .get(selectors.passwordInput).eq(0).type(password)
        .get(selectors.submitButton).eq(0).click()
        .wait(1000)
}

export const signUp = (email, password) => {
    cy.get(selectors.emailInput).eq(1).type(email)
        .get(selectors.passwordInput).eq(1).type(password)
        .get(selectors.submitButton).eq(1).click()
        .wait(1000)
}

const randomInt10000 = () => Math.floor(Math.random() * 1000)

export const randomEmail = () => `automated-${randomInt10000()}@test.com`

export const onlyThisErrorVisible = (error) => {
    Object.keys(selectors.errors).forEach($error => {
        if ($error == error) {
            cy.get(selectors.errors[$error]).should('be.visible')
        } else {
            cy.get(selectors.errors[$error]).should('not.to.exist')
        }
    })
}