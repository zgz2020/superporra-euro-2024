import { myAccountAssertions, passwordResetAssertions } from "./testData"

const automationSelector = name => `[data-automation="${name}"]`

export const selectors = {
    languagePicker: automationSelector("language-picker"),

    navItem: position => `${automationSelector("nav-item")}:nth(${position-1})`,
    mobileNavToggleButton: automationSelector("mobile-nav-toggle-button"),

    pageHeader: automationSelector("page-header"),
    cardHeader: '.card-header',
    cardBody: '.card-body',

    homepageSignUpLink: automationSelector("sign-up-link"),

    leaderboard: automationSelector("leaderboard"),
    leaderboardRow: {
        rank: `${automationSelector("leaderboard-row")} td:nth-child(1)`,
        username: `${automationSelector("leaderboard-row")} td:nth-child(2) a`,
        score: `${automationSelector("leaderboard-row")} td:nth-child(3) a`
    },
    privateLeagueLeaderboard: {
        rank: `[aria-labelledby="private-leagues-tab"] ${automationSelector("leaderboard-row")} td:nth-child(1)`,
        username: `[aria-labelledby="private-leagues-tab"] ${automationSelector("leaderboard-row")} td:nth-child(2) a`,
        score: `[aria-labelledby="private-leagues-tab"] ${automationSelector("leaderboard-row")} td:nth-child(3) a`
    },
    privateLeaguesTab: (tabName) => `[aria-controls="${tabName}-panel"]`,
    privateLeaguesSelect: '[aria-labelledby="private-leagues-tab"] select',
    privateLeagueNoParticipants: automationSelector("no-participants-private-league"),

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

    myBetsTable: {
        username: `${automationSelector("my-bets-row")} td:nth-child(1) a`,
        score: `${automationSelector("my-bets-row")} td:nth-child(2) a`
    },
    noPrivateLeaguesJoinedBlock: automationSelector('no-private-leagues'),
    myPrivateLeaguesTableRow: automationSelector('my-private-leagues-row'),
    myPrivateLeaguesTableLeagueName: `${automationSelector('my-private-leagues-row')} td:nth-child(1)`,
    leagueTab: (tabName) => `[aria-controls="${tabName}-panel"]`,
    joinPredictionNameSelect: '#join-panel select:nth-child(1)', 
    joinLeagueNameSelect: '#join-panel select',
    joinLeagueNameSelectOptions: '#join-panel select option',
    createLeagueInput: automationSelector('league-name-input'),
    quitPrivateLeagueNameSelect: '#quit-panel select',
    submitCTA: (tabName) => `[aria-labelledby="${tabName}-tab"] button`,
    privateLeagueSuccess: {
        join: automationSelector('join-league-success'),
        create: automationSelector('create-league-success'),
        quit: automationSelector('quit-league-success')
    },
    privateLeagueErrors: {
        join: automationSelector('join-league-error'),
        create: automationSelector('league-name-taken'),
        quit: automationSelector('quit-league-error')
    },

    signInTab: '#sign-in-tab',
    signUpTab: '#sign-up-tab',
    forgotPasswordLink: '[aria-controls="forgot-password-form"]',
    emailInput: automationSelector("email-address-input"),
    passwordInput: automationSelector("password-input"),
    submitButton: '.btn-primary',
    signInPageErrors: {
        noEmailSignIn: automationSelector('no-email-message-signIn'),
        invalidEmailSignUp: automationSelector('invalid-email-message-signUp'),
        noEmailForgotPassword: automationSelector('no-email-message-forgotPassword'),
        emailErrorSignIn: automationSelector('email-error-signIn'),
        emailErrorSignUp: automationSelector('email-error-signUp'),
        emailErrorForgotPassword: automationSelector('email-error-forgotPassword'),
        passwordErrorSignIn: automationSelector('password-error-signIn'),
        passwordErrorSignUp: automationSelector('password-error-signUp'),
    },
    emailSent: automationSelector('password-reset-email-sent'),
    passwordResetTokenExpiredBlock: automationSelector('password-reset-token-expired-block'),
    requestNewTokenLink: automationSelector('request-new-token'),
    passwordResetPasswordError: automationSelector('password-error'),
    passwordResetSuccessMessage: automationSelector('password-reset-success'),
    signInButton: automationSelector('sign-in')
}
 
const elementVisibilityAssertion = (status) => {
    if (status == 'visible') return 'be.visible'
    if (status == 'hidden') return 'not.exist'
}

export const clickOnCTA = (cta) => cy.get(cta).click()

export const visitViewportPageLanguage = (viewport, page, language) => {
    cy.viewport(viewport).visit(page)
    selectLanguage(language)
}


// --------------------------------------------------------------
// NAVIGATION BAR
// --------------------------------------------------------------

export const checkNavBarVisible = () => cy.get('.navbar').should('be.visible')


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
    if (viewport === "iphone-6") clickOnCTA(selectors.mobileNavToggleButton)

    clickOnCTA(selectors.navItem(position))
    cy.wait(500)
    cy.url().should('eq', `${Cypress.config().baseUrl}${slug}`)
}



// --------------------------------------------------------------
// HOMEPAGE
// --------------------------------------------------------------

export const clickOnSignUpLink = () => clickOnCTA(selectors.homepageSignUpLink)


// --------------------------------------------------------------
// LEADERBOARD 
// --------------------------------------------------------------

export const checkFirstRank = () => cy.get(selectors.leaderboardRow.rank).eq(0).should('contain', '1')

export const checkFirstParticipantLinks = (language) => {
    cy.get(selectors.leaderboardRow.username).eq(0).click()
        .wait(500)
        .get(selectors.pageHeader).should('contain', myAccountAssertions(language).predictionsHeader)
    cy.go('back')
    cy.get(selectors.leaderboardRow.score).eq(0).click()
        .get(selectors.pageHeader).should('contain', myAccountAssertions(language).scoresHeader)

}

export const checkLeaderboardLastParticipant = () => cy.get(selectors.leaderboardRow.username).last().should('contain', 'ZZ Test Participant')
    // Checks that the leaderboard's last participant is the TEST participant just added

export const selectLastParticipant = () => cy.get(selectors.leaderboardRow.username).last().click()

export const checkPredictionInLeaderboard = (username) => cy.get(selectors.leaderboardRow.username).should('contain', username)

export const checkPredictionInPrivateLeagueLeaderboard = (username) => cy.get(selectors.privateLeagueLeaderboard.username).should('contain', username)
export const checkPredictionNotInPrivateLeagueLeaderboard = (username) => cy.get(selectors.privateLeagueLeaderboard.username).should('not.exist')
export const verifyNoParticipantsInPrivateLeague = () => cy.get(selectors.privateLeagueNoParticipants).should('be.visible')

export const selectUserOnlyPrediction = () => cy.get(selectors.leaderboardRow.username).click()

export const selectPrivateLeaguesTab = (tabName) => cy.get(selectors.privateLeaguesTab(tabName)).click()

export const selectPrivateLeague = (leagueName) => cy.get(selectors.privateLeaguesSelect).select(leagueName)


// --------------------------------------------------------------
// PREDICTIONS FORM
// --------------------------------------------------------------

export const checkElementVisibility = (selector, visible) => cy.get(selector).should(visible) 
    // 'visible' values: 'not.be.visible', 'be.visible'

export const checkInputFormHeader = (header) => 
    cy.get(selectors.inputForm.form).should('contain', header)

export const submitPredictionsNoUsername = (ctaLocation, language) => { 
    // Check that Alert is triggered (note that cypress closes alerts automatically)
    const stub = cy.stub()
    cy.on('window:alert', stub)

    clickOnCTA(selectors.inputForm.submitButton(ctaLocation)).then(() => {
        expect(stub).to.be.calledWith(myAccountAssertions(language).noUsernameAlert)
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

export const checkNoBetsYet = (language) => cy.get(selectors.cardBody).should('contain', myAccountAssertions(language).noBetsYetText)

export const checkMyBetsTable = (username) => cy.get(selectors.myBetsTable.username).should('contain', username)
export const selectUsersBet= () => cy.get(selectors.myBetsTable.username).click()
export const checkUsersBetLinks = (language) => {
    cy.get(selectors.myBetsTable.username).click()
        .wait(500)
        .get(selectors.pageHeader).should('contain', myAccountAssertions(language).predictionsHeader)
    cy.go('back')
    cy.get(selectors.myBetsTable.score).click()
        .get(selectors.pageHeader).should('contain', myAccountAssertions(language).scoresHeader)

}

export const checkNoPrivateLeaguesJoinedBlockRenders = () => cy.get(selectors.noPrivateLeaguesJoinedBlock).should('be.visible')
export const checkMyPrivateLeaguesTableNotRenders = () => cy.get(selectors.myPrivateLeaguesTableRow).should('not.exist')
export const checkMyPrivateLeaguesTableRenders = () => cy.get(selectors.myPrivateLeaguesTableRow).should('contain', 'automatedTest')

export const checkPredictionPrivateLeague = (leagueName) => cy.get(selectors.myPrivateLeaguesTableLeagueName).should('contain', leagueName)

export const selectPrivateLeaguesActionTab = (tabName) => cy.get(selectors.leagueTab(tabName)).click()

export const createNewPrivateLeague = (leagueName) => { 
    selectPrivateLeaguesActionTab('Create')
    cy.wait(800)
        .get(selectors.createLeagueInput).clear().type(leagueName)
        .wait(800)
        .get(selectors.submitCTA('create')).click()
        .get(selectors.privateLeagueSuccess.create).should('be.visible')
        .wait(2100)
        .get(selectors.privateLeagueSuccess.create).should('not.exist')
}

export const joinNewPrivateLeague = (leagueName) => { 
    selectPrivateLeaguesActionTab('Join')
    cy.get(selectors.joinLeagueNameSelect).select(leagueName)
        .get(selectors.submitCTA('join')).click()
        .get(selectors.privateLeagueSuccess.join).should('be.visible')
        .wait(2100)
        .get(selectors.privateLeagueSuccess.join).should('not.exist')
}

export const quitNewPrivateLeague = (leagueName) => { 
    selectPrivateLeaguesActionTab('Quit')
    cy.wait(800)
        .get(selectors.quitPrivateLeagueNameSelect).select(leagueName)
        .wait(1000)
        .get(selectors.submitCTA('quit')).click()
}
export const verifyQuitSuccessMessage = () => {
    cy.get(selectors.privateLeagueSuccess.quit).should('be.visible')
        .wait(2100)
        .get(selectors.privateLeagueSuccess.quit).should('not.exist')
}

export const verifyChampionshipNameNotInSelectList = (name) => {
    selectPrivateLeaguesActionTab('Join')
    cy.get(selectors.joinLeagueNameSelectOptions).then($options => {
        expect($options).not.to.contain(name)
    })
}

export const verifyChampionshipNameInSelectList = (name) => {
    selectPrivateLeaguesActionTab('Join')
    cy.get(selectors.joinLeagueNameSelectOptions).then($options => {
        expect($options).to.contain(name)
    })
}


// --------------------------------------------------------------
// Sign In, Sign Up and Forgot Password
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

export const randomPassword = () => `testing${randomInt10000()}`

export const randomChampionship = () => `Automated-Championship-${randomInt10000()}`

export const onlyThisErrorVisible = (error) => {
    Object.keys(selectors.signInPageErrors).forEach($error => {
        if ($error == error) {
            cy.get(selectors.signInPageErrors[$error]).should('be.visible')
        } else {
            cy.get(selectors.signInPageErrors[$error]).should('not.exist')
        }
    })
}


// --------------------------------------------------------------
// Password Reset
// --------------------------------------------------------------

export const verifyPasswordResetTokenExpiredBlock = (language) => {
    cy.get(selectors.passwordResetTokenExpiredBlock)
        // Check block text 
        .should('contain', passwordResetAssertions(language).tokenExpired)
        // Check block link
        .get(selectors.requestNewTokenLink).click()
        // Check rediect to Sign In page
        .url().should('contain', '/sign-in')
}
