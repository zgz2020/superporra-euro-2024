import md5 from 'md5'
import { 
    viewports,
    expiredToken,
    validToken,
    passwordResetUser
} from '../support/testData'
import { 
    selectors,
    clickOnCTA,
    checkNavBarVisible,
    verifyPasswordResetTokenExpiredBlock,
    randomPassword,
    signIn
} from '../support/page-object'

describe('Password Reset - Unhappy paths', () => {

    viewports.forEach(viewport => {
        it(`Expired Token - ${viewport}`, () => {
            cy.viewport(viewport).visit('/password-reset/' + expiredToken)
            verifyPasswordResetTokenExpiredBlock()
        })
    
        it(`No Token - ${viewport}`, () => {
            cy.viewport(viewport).visit('/password-reset/')
            checkNavBarVisible()
        })
    
        it(`No new password entered - ${viewport}`, () => {
            cy.viewport(viewport).visit('/password-reset/' + validToken)
                .get(selectors.submitButton).click()
                .get(selectors.passwordResetPasswordError).should('be.visible')
        })
    })
})

describe('Password Reset - Happy path', () => {

    viewports.forEach(viewport => {
        it(`Password Reset - New password - ${viewport}`, () => {
            const newPassword = randomPassword()
            const newPasswordHash = md5(newPassword)
    
            // Intercept and assert API requests
            cy.intercept('POST', '/password-reset-token', (req) => {
                expect(req.body.token).to.include(validToken)
            }).as('passwordResetToken')
            cy.intercept('POST', '/password-reset-request', (req) => {
                expect(req.body.userID).to.include(passwordResetUser)
                expect(req.body.newPassword).to.include(newPasswordHash)
            }).as('passwordResetRequest')
    
    
            cy.viewport(viewport).visit('/password-reset/' + validToken)
                .get(selectors.passwordInput).type(newPassword)
                .get(selectors.submitButton).click()
                .get(selectors.passwordResetSuccessMessage).should('be.visible')
    
            // Check API response
            cy.wait('@passwordResetToken').its('response.body.tokenData').should('have.property', 'userID', passwordResetUser)
    
    
            // Sign in with new password
            cy.get(selectors.signInButton).click()
                .url().should('contain', '/sign-in')
            clickOnCTA(selectors.signInTab)
            signIn(passwordResetUser, newPassword)
            cy.get(selectors.cardHeader).should('contain', 'My Bets')
        })
    })
})