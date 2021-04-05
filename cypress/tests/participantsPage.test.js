import { 
    selectors, 
    clickOnCTA, 
    checkElementVisibility,
    checkFirstRank,
    checkFirstParticipantLinks,
    signIn
} from '../support/page-object'
import { registeredUser, viewports } from '../support/testData'



describe('Participants page', () => {
    viewports.forEach(viewport => {
        it(`Leaderboard renders and links - ${viewport}`, () => {
            cy.viewport(viewport).visit('/participants')
    
            checkElementVisibility(selectors.leaderboard, 'be.visible') 
            checkElementVisibility(selectors.inputForm.form, 'not.to.exist') 
    
            checkFirstRank()
            checkFirstParticipantLinks()
        })
    
        it(`Join CTA - ${viewport}`, () => {
            // Signed out status - [JOIN] should redirect to /sign-in
            cy.viewport(viewport).visit('/participants')
            clickOnCTA(selectors.updateButton)
            cy.url().should('contain', '/sign-in')
    
            // Signed in status - [JOIN] should redirect to /account
            clickOnCTA(selectors.signInTab)
            signIn(registeredUser.email, registeredUser.password)
            cy.visit('/participants')
            clickOnCTA(selectors.updateButton)
            cy.url().should('contain', '/account')
    
        })  
    })
      

})