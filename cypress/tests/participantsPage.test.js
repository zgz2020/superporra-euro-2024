import { 
    selectors, 
    clickOnCTA, 
    checkElementVisibility,
    checkFirstRank,
    checkFirstParticipantLinks,
    checkInputFormHeader, 
    submitPredictionsNoUsername,
    checkFormIsEmpty,
    fillInInputForm,
    checkFormIsFilledIn,
    checkLeaderboardLastParticipant,
    selectLastParticipant,
    checkPageHeader,
    updateInputForm,
    signIn
} from '../support/page-object'
import { registeredUser } from '../support/testData'



describe('Participants page', () => {

    it('Leaderboard renders and links', () => {
        cy.visit('/participants')

        checkElementVisibility(selectors.leaderboard, 'be.visible') 
        checkElementVisibility(selectors.inputForm.form, 'not.to.exist') 

        checkFirstRank()
        checkFirstParticipantLinks()
    })

    it('Join CTA', () => {
        // Signed out status - [JOIN] should redirect to /sign-in
        cy.visit('/participants')
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