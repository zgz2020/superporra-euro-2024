import { 
    selectors,
    signUp,
    randomEmail,
    randomChampionship,
    signIn,
    checkNoBetsYet,
    checkPredictionInLeaderboard,
    checkPredictionInPrivateLeagueLeaderboard,
    checkPredictionNotInPrivateLeagueLeaderboard,
    selectUserOnlyPrediction,
    checkElementVisibility,
    checkFirstRank,
    checkFirstParticipantLinks,
    clickOnCTA,
    checkInputFormHeader,
    checkFormIsEmpty,
    submitPredictionsNoUsername,
    fillInInputForm,
    checkFormIsFilledIn,
    checkLeaderboardLastParticipant,
    selectLastParticipant,
    checkPageHeader,
    updateInputForm,
    nicknameTakenTest,
    selectLanguage,
    visitViewportPageLanguage,
    checkMyPrivateLeaguesTableNotRenders,
    checkMyPrivateLeaguesTableRenders,
    checkPredictionPrivateLeague,
    createNewPrivateLeague,
    joinNewPrivateLeague,
    quitNewPrivateLeague,
    selectPrivateLeaguesTab,
    selectPrivateLeague,
    verifyChampionshipNameInSelectList
} from '../support/page-object'
import {
    registeredUser,
    registeredUserNoPredictions,
    viewports,
    languages,
    myAccountAssertions
} from '../support/testData'

let url = Cypress.config().baseUrl

describe('My Account - New User with no predictions', () => {

    after(() => {
        // Remove all test users created by these tests
        cy.request('POST', `${url}/remove-test-users`).then(resp => {
            if (resp.status == 200) {
                cy.log('Test users remove successfully :D')
            } else {
                cy.log('Failed to remove test users :(')
            }
        })
    })

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Elements rendered, create new prediction and update existent one - ${viewport} - ${language}`, () => {
                //Create a new user
                cy.viewport(viewport).visit('/sign-in')
                selectLanguage(language)
                signUp(randomEmail(), 'testing')
        
                // Test new user's account initial content
                checkElementVisibility(selectors.leaderboard, 'not.exist') 
                cy.get(selectors.cardHeader).should('contain', myAccountAssertions(language).myBetsHeader)
                checkNoBetsYet(language)
        
                // Create new prediction and Update existent one
                clickOnCTA(selectors.updateButton) // This is actually the [JOIN] CTA
                
                checkInputFormHeader(myAccountAssertions(language).joinInputFormHeader)
                checkFormIsEmpty()
        
                submitPredictionsNoUsername('bottom', language)
                submitPredictionsNoUsername('top', language)
        
                nicknameTakenTest()
        
                fillInInputForm()
                cy.wait(500)
                checkFormIsFilledIn()
        
                if (viewport == 'iphone-6') {
                    clickOnCTA(selectors.mobileNavToggleButton)
                }
                clickOnCTA(selectors.navItem(1)) // Navigate away from My Account page
                clickOnCTA(selectors.navItem(5)) // Navigate back to My Account page
                checkFormIsFilledIn()
        
                clickOnCTA(selectors.inputForm.cancelButton)
                checkNoBetsYet(language)
        
                clickOnCTA(selectors.updateButton)
                checkFormIsEmpty()
        
                fillInInputForm()
                clickOnCTA(selectors.inputForm.submitButton('top'))
        
                checkElementVisibility(selectors.inputForm.form, 'not.exist') 
                checkPredictionInLeaderboard('ZZ Test Participant')
                
                // Check participant's predictions page
                selectUserOnlyPrediction()
                cy.wait(500)
        
                checkPageHeader(myAccountAssertions(language).predictionsHeaderWithParticipantName)
                checkElementVisibility(selectors.resultsContainer, 'be.visible')
        
                clickOnCTA(selectors.updateButton)
        
                checkInputFormHeader(myAccountAssertions(language).updateInputFormHeader)
                nicknameTakenTest()
                updateInputForm()
            })
        })
    })
})


describe('My Account - Existent user with at least one prediction', () => {

    beforeEach(() => {
        cy.visit('/sign-in')
        clickOnCTA(selectors.signInTab)
        signIn(registeredUser.email, registeredUser.password)
    })

    after(() => {
        // Remove all test predictions crated by these tests
        cy.request('POST', `${url}/remove-test-predictions`).then(resp => {
            if (resp.status == 200) {
                cy.log('Test prediction was removed successfully :D')
            } else {
                cy.log('Failed to remove test prediction :(')
            }
        })
    })

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`My Bets component rendered and links - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/account')
                selectLanguage(language)
                cy.get(selectors.cardHeader).should('contain', myAccountAssertions(language).myBetsHeader)
        
                checkElementVisibility(selectors.leaderboard, 'be.visible') 
                checkFirstRank()
                checkFirstParticipantLinks(language)
            })
        
            it(`Create new prediction and Update existent one - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/account')
                selectLanguage(language)
                clickOnCTA(selectors.updateButton) // This is actually the [JOIN] CTA
                
                checkInputFormHeader(myAccountAssertions(language).joinInputFormHeader)
                checkFormIsEmpty()
        
                submitPredictionsNoUsername('bottom', language)
                submitPredictionsNoUsername('top', language)
        
                fillInInputForm()
                cy.wait(500)
                checkFormIsFilledIn()
        
                if (viewport == 'iphone-6') {
                    clickOnCTA(selectors.mobileNavToggleButton)
                }
                clickOnCTA(selectors.navItem(1)) // Navigate away from My Account page
                clickOnCTA(selectors.navItem(5)) // Navigate back to My Account page
                checkFormIsFilledIn()
        
                clickOnCTA(selectors.inputForm.cancelButton)
                checkElementVisibility(selectors.leaderboard, 'be.visible') 
        
                clickOnCTA(selectors.updateButton)
                checkFormIsEmpty()
        
                fillInInputForm()
                clickOnCTA(selectors.inputForm.submitButton('top'))
        
                checkElementVisibility(selectors.inputForm.form, 'not.exist') 
                //checkElementVisibility(selectors.predictionsSubittedMessage, 'be.visible') 
        
                checkLeaderboardLastParticipant()
                
                // Check participant's predictions page
                selectLastParticipant()
                cy.wait(500)
        
                checkPageHeader(myAccountAssertions(language).predictionsHeaderWithParticipantName)
                checkElementVisibility(selectors.resultsContainer, 'be.visible')
        
                clickOnCTA(selectors.updateButton)
        
                checkInputFormHeader(myAccountAssertions(language).updateInputFormHeader)
                updateInputForm()
            })
        })
    })
})

describe('My Account - Private Championships - User with NO predictions', () => {

    beforeEach(() => {
        cy.visit('/sign-in')
        clickOnCTA(selectors.signInTab)
        signIn(registeredUserNoPredictions.email, registeredUserNoPredictions.password)
    })

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Championship component does NOT render - ${viewport} - ${language}`, () => {
                visitViewportPageLanguage(viewport, '/account', language)
                checkMyPrivateLeaguesTableNotRenders()
            })
        })
    })
})

describe('My Account - Private Championships - User with predictions', () => {

    beforeEach(() => {
        cy.visit('/sign-in')
        clickOnCTA(selectors.signInTab)
        signIn(registeredUser.email, registeredUser.password)
    })

    after(() => {
        // Remove all test Championships created by these tests
        cy.request('POST', `${url}/private-league/remove`).then(resp => {
            if (resp.status == 200) {
                cy.log('Test championships remove successfully :D')
            } else {
                cy.log('Failed to remove test championships :(')
            }
        })
    })

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Private Championship component renders as expected - ${viewport} - ${language}`, () => {
                visitViewportPageLanguage(viewport, '/account', language)
                checkMyPrivateLeaguesTableRenders()
                checkPredictionPrivateLeague('--')
            })

            it(`Create a new Championship - ${viewport} - ${language}`, () => {
                const randomName = randomChampionship()

                visitViewportPageLanguage(viewport, '/account', language)
                createNewPrivateLeague(randomName)
                verifyChampionshipNameInSelectList(randomName)
            })

            it(`Join and Quit a Championship - ${viewport} - ${language}`, () => {
                visitViewportPageLanguage(viewport, '/account', language)

                // Join a private league
                joinNewPrivateLeague('AutoTest Championship')
                checkPredictionPrivateLeague('AutoTest Championship')
                
                // Check Participants page > 'AutoTest Championship' > 'automatedTest' listed
                cy.visit('/participants')
                selectPrivateLeaguesTab('Private-leagues')
                cy.wait(1000)
                selectPrivateLeague('AutoTest Championship')
                cy.wait(1000)
                checkPredictionInPrivateLeagueLeaderboard('automatedTest')

                // Quit private league
                cy.visit('/account')
                quitNewPrivateLeague('automatedTest')
                checkPredictionPrivateLeague('--')

                // Check Participants page > 'AutoTest Championship' > 'automatedTest' NOT listed
                cy.visit('/participants')
                selectPrivateLeaguesTab('Private-leagues')
                cy.wait(1000)
                selectPrivateLeague('AutoTest Championship')
                cy.wait(1000)
                checkPredictionNotInPrivateLeagueLeaderboard('automatedTest')
                cy.wait(3000)
            })

            it(`Negative paths - Join, Create and Quit - ${viewport} - ${language}`, () => {
                visitViewportPageLanguage(viewport, '/account', language)

                cy.get(selectors.submitCTA('join')).click()

            })
        })
    })
})