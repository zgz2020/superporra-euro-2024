import md5 from 'md5'
import { 
    expiredToken,
    validToken,
    passwordResetUser
} from '../support/testData'
import { 
    selectors,
    checkNavBarVisible,
    verifyPasswordResetTokenExpiredBlock,
    randomPassword,
    signIn
} from '../support/page-object'

describe('Password Reset - Unhappy paths', () => {

    it('Expired Token', () => {
        cy.visit('/password-reset/' + expiredToken)
        verifyPasswordResetTokenExpiredBlock()
    })

    it('No Token', () => {
        cy.visit('/password-reset/')
        checkNavBarVisible()
    })

    it('No new password entered', () => {
        cy.visit('/password-reset/' + validToken)
            .get(selectors.submitButton).click()
            .get(selectors.passwordResetPasswordError).should('be.visible')
    })
})

describe.only('Password Reset - Happy path', () => {

    it('Password Reset - New password', () => {
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


        cy.visit('/password-reset/' + validToken)
            .get(selectors.passwordInput).type(newPassword)
            .get(selectors.submitButton).click()
            .get(selectors.passwordResetSuccessMessage).should('be.visible')

        // Check API response
        cy.wait('@passwordResetToken').its('response.body.tokenData').should('have.property', 'userID', passwordResetUser)


        // Sign in with new password
        cy.get(selectors.signInButton).click()
            .url().should('contain', '/sign-in')
        signIn(passwordResetUser, newPassword)
        cy.get(selectors.cardHeader).should('contain', 'My Bets')
    })
})