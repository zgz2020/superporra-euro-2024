import { 
    selectors,
    randomChampionship,
    signIn,
    selectUsersBet,
    checkUsersBetLinks,
    checkPredictionInPrivateLeagueLeaderboard,
    verifyNoParticipantsInPrivateLeague,
    checkElementVisibility,
    clickOnCTA,
    checkInputFormHeader,
    updateInputForm,
    selectLanguage,
    visitViewportPageLanguage,
    checkMyPrivateLeaguesTableNotRenders,
    checkNoPrivateLeaguesJoinedBlockRenders,
    checkPredictionPrivateLeague,
    createNewPrivateLeague,
    joinNewPrivateLeague,
    quitNewPrivateLeague,
    verifyQuitSuccessMessage,
    selectPrivateLeaguesTab,
    selectPrivateLeague,
    verifyChampionshipNameInSelectList,
    verifyChampionshipNameNotInSelectList,
    selectPrivateLeaguesActionTab
} from '../support/page-object'
import {
    registeredUser,
    viewports,
    languages,
    myAccountAssertions
} from '../support/testData'

let url = Cypress.config().baseUrl

describe('My Account - My Bets', () => {

    beforeEach(() => {
        cy.visit('/sign-in')
        signIn(registeredUser.email, registeredUser.password)
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
            
            it(`Update existent prediction - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/account')
                selectLanguage(language)

                selectUsersBet()
                clickOnCTA(selectors.updateButton)

                checkInputFormHeader(myAccountAssertions(language).updateInputFormHeader)

                // +++++++ TODO ++++++++++++++++
                // +++++ Better test for 'Random Predictions' when updating.
                // ++++++++++++ - 'Random Predictions' is actually not working, and the test didn't flag it
                updateInputForm()
            })
        })
    })
})

describe('My Account - Private Championships', () => {

    beforeEach(() => {
        // Remove all test predictions crated by these tests
        cy.request('POST', `${url}/remove-test-user-private-leagues`).then(resp => {
            if (resp.status == 200) {
                cy.log('Test prediction was removed successfully :D')
            } else {
                cy.log('Failed to remove test prediction :(')
            }
        })
        cy.visit('/sign-in')
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
            it(`Create Championship - Enter a taken league name - ${viewport} - ${language}`, { retries: 10 }, () => {
                selectPrivateLeaguesActionTab('Create')
                cy.wait(1500)
                    .get(selectors.createLeagueInput).clear().type('AutoTest Championship').get(selectors.createLeagueInput).blur()
                    .wait(1000)
                    .get(selectors.privateLeagueErrors.create).should('be.visible')
                    .get(selectors.submitCTA('create')).should('be.disabled')
                
                cy.wait(500)
            })

            // it(`No Championships joined > Private Championship component does not render - ${viewport} - ${language}`, () => {
            //     visitViewportPageLanguage(viewport, '/account', language)
            //     checkNoPrivateLeaguesJoinedBlockRenders()
            //     checkMyPrivateLeaguesTableNotRenders()
            // })

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
                joinNewPrivateLeague('AutoTest-Championship-2')
                checkPredictionPrivateLeague('AutoTest Championship')
                verifyChampionshipNameNotInSelectList('AutoTest Championship')
                
                // Check Participants page > 'AutoTest Championship' > 'ZZ Test User - UPDATED' listed
                cy.visit('/participants')
                selectPrivateLeaguesTab('Private-leagues')
                cy.wait(1000)
                selectPrivateLeague('AutoTest Championship')
                cy.wait(1000)
                checkPredictionInPrivateLeagueLeaderboard('ZZ Test User - UPDATED')

                // Quit private leagues
                cy.visit('/account')
                quitNewPrivateLeague('AutoTest Championship')
                verifyQuitSuccessMessage()
                quitNewPrivateLeague('AutoTest-Championship-2')
                checkNoPrivateLeaguesJoinedBlockRenders()
                checkMyPrivateLeaguesTableNotRenders()
                selectPrivateLeaguesActionTab('Join')
                verifyChampionshipNameInSelectList('AutoTest Championship')

                // Check Participants page > 'AutoTest Championship' > 'ZZ Test User - UPDATED' NOT listed
                cy.visit('/participants')
                selectPrivateLeaguesTab('Private-leagues')
                cy.wait(1000)
                selectPrivateLeague('AutoTest Championship')
                cy.wait(1000)
                verifyNoParticipantsInPrivateLeague()
                cy.wait(1000)
            })

            it(`Negative paths - Join, Create and Quit - ${viewport} - ${language}`, () => {
                visitViewportPageLanguage(viewport, '/account', language)

                // JOIN - Do not select a league
                cy.get(selectors.submitCTA('join')).click()
                    .get(selectors.privateLeagueErrors.join).should('be.visible')
                
                cy.wait(1500)

                // QUIT - Do not select a league
                // -- QUIT Test set-up
                selectPrivateLeaguesActionTab('Join')
                cy.wait(1000)
                joinNewPrivateLeague('AutoTest-Championship-2')
                cy.wait(1000)

                selectPrivateLeaguesActionTab('Quit')
                cy.wait(1000)
                    .get(selectors.submitCTA('quit')).click()
                    .get(selectors.privateLeagueErrors.quit).should('be.visible')
                
                cy.wait(500)
                // -- QUIT Test clean-up
                quitNewPrivateLeague('AutoTest-Championship-2')
            })
        })
    })
})