import { 
    selectors, 
    clickOnCTA, 
    checkElementVisibility,
    checkFirstRank,
    checkFirstParticipantLinks,
    signIn,
    selectLanguage
} from '../support/page-object'
import { registeredUser, viewports, languages } from '../support/testData'

// Tests for Private Leagues Leaderboards in 'myAccount.test.js'

describe('Participants page', () => {
    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Leaderboard renders and links - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/participants')
                selectLanguage(language)
        
                checkElementVisibility(selectors.leaderboard, 'be.visible') 
                checkElementVisibility(selectors.inputForm.form, 'not.to.exist') 
        
                checkFirstRank()
                checkFirstParticipantLinks(language)
            })
        
            // Sign Up links and /join page removed - Skipping test
            it.skip(`Join CTA - ${viewport} - ${language}`, () => {
                // Signed out status - [JOIN] should redirect to /sign-in
                cy.viewport(viewport).visit('/participants')
                selectLanguage(language)
                clickOnCTA(selectors.joinLink)
                cy.url().should('contain', '/join')
        
                // Signed in status - [JOIN] should redirect to /account
                cy.visit('/sign-in')
                signIn(registeredUser.email, registeredUser.password)

                cy.visit('/participants')
                clickOnCTA(selectors.joinLink)
                cy.url().should('contain', '/join')
                    .get(selectors.accountLink).its('length').should('eq', 2)
            })  
        })
    })
})