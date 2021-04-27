import { 
    selectors,
    signUp,
    randomEmail,
    randomChampionship,
    signIn,
    checkNoBetsYet,
    checkPredictionInLeaderboard,
    checkMyBetsTable,
    selectUsersBet,
    checkUsersBetLinks,
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
    verifyChampionshipNameInSelectList,
    selectPrivateLeaguesActionTab
} from '../support/page-object'
import {
    registeredUser,
    registeredUserNoPredictions,
    viewports,
    languages,
    myAccountAssertions
} from '../support/testData'

let url = Cypress.config().baseUrl

let selectName = (language) => language == 'english' ? 'Select Username' : 'Elige usuario'
let selectLeague = (language) => language == 'english' ? 'Select Championship' : 'Elige campeonato'

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
                checkMyBetsTable('ZZ Test Participant')
                
                // Check participant's predictions page
                selectUsersBet()
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
                checkUsersBetLinks(language)
            })
            
            // SKIPPING test - Only one prediction per participant now 
            it.skip(`Create new prediction and Update existent one - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/account')
                selectLanguage(language)
                selectUsersBet()
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
        
                checkMyBetsTable('ZZ Test Participant')
                
                // Check participant's predictions page
                selectUsersBet()
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

describe.only('My Account - Private Championships - User with predictions', () => {

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

                // JOIN - Do not select neither a league or a username
                cy.get(selectors.submitCTA('join')).click()
                    .get(selectors.privateLeagueErrors.join).should('be.visible')
                
                cy.wait(500)

                // JOIN - Select a username but not a league
                cy.get(selectors.joinPredictionNameSelect).select('automatedTest')
                    .get(selectors.submitCTA('join')).click()
                    .get(selectors.privateLeagueErrors.join).should('be.visible')

                cy.wait(500)

                // JOIN - Select a league but not a username
                cy.get(selectors.joinPredictionNameSelect).select(selectName(language))
                    .get(selectors.joinLeagueNameSelect).select(selectLeague(language))
                    .get(selectors.submitCTA('join')).click()
                    .get(selectors.privateLeagueErrors.join).should('be.visible')
                
                cy.wait(500)

                // CREATE - Enter a taken league name
                selectPrivateLeaguesActionTab('Create')
                cy.wait(1500)
                    .get(selectors.createLeagueInput).clear().type('AutoTest Championship')
                    .wait(1000)
                    .get(selectors.privateLeagueErrors.create).should('be.visible')
                    .get(selectors.submitCTA('create')).should('be.disabled')
                
                cy.wait(500)

                // QUIT - Do not select a league
                selectPrivateLeaguesActionTab('Quit')
                cy.wait(1000)
                    .get(selectors.submitCTA('quit')).click()
                    .get(selectors.privateLeagueErrors.quit).should('be.visible')
                
                cy.wait(500)
            })
        })
    })
})