import { 
    selectors,
    selectLanguage,
    checkInputFormHeader,
    checkFormIsEmpty,
    submitPredictionsNoUsername,
    nicknameTakenTest,
    typeNickname,
    randomInt10000,
    submitPredictionsInvalidEmail,
    submitPredictionsNoPassword,
    submitPredictionsIncompletePredictions,
    fillInInputForm,
    checkFormIsFilledIn,
    clickOnCTA,
    randomEmail,
    checkMyBetsTable,
    signIn
} from '../support/page-object'
import {
    viewports,
    languages,
    myAccountAssertions,
    registeredUser
} from '../support/testData'

let url = Cypress.config().baseUrl

describe('Join page - Signed Out status - Elements render and negative paths', () => {
    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Elements render and Form empty - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/join')
                selectLanguage(language)
                
                checkInputFormHeader(myAccountAssertions(language).joinInputFormHeader)
                checkFormIsEmpty()
            })

            it(`Negative paths - Nickname - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/join')
                selectLanguage(language)

                submitPredictionsNoUsername('bottom')
                submitPredictionsNoUsername('top')

                nicknameTakenTest()
            })

            it(`Negative paths - Email address - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/join')
                selectLanguage(language)

                typeNickname(`ZZ Test Participant - ${randomInt10000()}`)

                // No email
                submitPredictionsInvalidEmail('bottom', 'invalidEmailSignUp')
                submitPredictionsInvalidEmail('top', 'invalidEmailSignUp')

                // Invalid email
                cy.get(selectors.emailInput).clear().type('invalid@email')
                submitPredictionsInvalidEmail('bottom', 'invalidEmailSignUp')
                submitPredictionsInvalidEmail('top', 'invalidEmailSignUp')

                // Already registered email
                cy.get(selectors.emailInput).clear().type(registeredUser.email)
                submitPredictionsInvalidEmail('bottom', 'emailErrorSignUp')
                submitPredictionsInvalidEmail('top', 'emailErrorSignUp')
            })

            it(`Negative paths - Password - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/join')
                selectLanguage(language)

                typeNickname(`ZZ Test Participant - ${randomInt10000()}`)
                cy.get(selectors.emailInput).clear().type('valid@email.com')

                // No password
                submitPredictionsNoPassword('bottom')
                submitPredictionsNoPassword('top')
            })

            it(`Negative paths - Incomplete predictions - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/join')
                selectLanguage(language)

                cy.get(selectors.emailInput).clear().type('valid@email.com')
                cy.get(selectors.passwordInput).clear().type('test1234')
                typeNickname(`ZZ Test Participant - ${randomInt10000()}`)

                // No password
                submitPredictionsIncompletePredictions('bottom')
                submitPredictionsIncompletePredictions('top')
            })
        })
    })
})

describe('Join page - Signed Out status - New User with no predictions', () => {

    after(() => {
        // Remove all test users created by these tests
        cy.request('POST', `${url}/remove-test-users`).then(resp => {
            if (resp.status == 200) {
                cy.log('Test users remove successfully :D')
            } else {
                cy.log('Failed to remove test users :(')
            }
        })

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

            it(`Elements rendered, create new user and prediction - ${viewport} - ${language}`, () => {
                //Create a new user
                cy.viewport(viewport).visit('/join')
                selectLanguage(language)
                
                fillInInputForm()

                checkFormIsFilledIn()
        
                if (viewport == 'iphone-6') {
                    clickOnCTA(selectors.mobileNavToggleButton)
                }
                clickOnCTA(selectors.navItem(4)) // Navigate away from Join page
                clickOnCTA(selectors.navItem(2)) // Navigate back to Join page
                checkFormIsFilledIn()

                cy.get(selectors.emailInput).clear().type(randomEmail())
                cy.get(selectors.passwordInput).clear().type('test1234')
                cy.wait(500)
                
                clickOnCTA(selectors.inputForm.submitButton('top'))
                cy.wait(500)

                cy.url().should('contain', '/account')
                cy.get(selectors.competitionJoined).should('be.visible')
                    .wait(2000)
                    .get(selectors.competitionJoined).should('not.exist')
                checkMyBetsTable('ZZ Test Participant')

                cy.visit('/participants')
                cy.get(selectors.leaderboard).should('contain', 'ZZ Test Participant')
            })
        })
    })
})

describe('Join Page - Signed In status', () => {
    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Elements render - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                selectLanguage(language)
                signIn(registeredUser.email, registeredUser.password)

                cy.visit('/join')
                cy.get(selectors.accountLink).its('length').should('eq', 2)
                cy.get(selectors.accountLink).eq(0).click()
                    .wait(500)
                cy.url().should('contain', '/account')
            })
            
        })
    })
})