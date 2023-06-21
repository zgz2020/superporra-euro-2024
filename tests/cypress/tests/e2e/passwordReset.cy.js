import md5 from 'md5'
import { 
    viewports,
    languages,
    expiredToken,
    validToken,
    passwordResetUser,
    myAccountAssertions
} from '../../src/testData'
import { 
    selectors,
    clickOnCTA,
    checkNavBarVisible,
    verifyPasswordResetTokenExpiredBlock,
    randomPassword,
    signIn,
    selectLanguage
} from '../../src/page-object'

describe('Password Reset - Unhappy paths', () => {

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Expired Token - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/password-reset/' + expiredToken)
                selectLanguage(language)
                verifyPasswordResetTokenExpiredBlock(language)
            })
        
            it(`No Token - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/password-reset/')
                selectLanguage(language)
                checkNavBarVisible()
            })
        
            // BUG - Broken functionaliry - TO BE FIXED !!!
            it.skip(`No new password entered - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/password-reset/' + validToken)
                selectLanguage(language)
                cy.get(selectors.submitButton).click()
                    .get(selectors.passwordResetPasswordError).should('be.visible')
            })
        })
    })
})

// BUG - Broken functionaliry - TO BE FIXED !!!
describe.skip('Password Reset - Happy path', () => {

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Password Reset - New password - ${viewport} - ${language}`, () => {
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
                selectLanguage(language)
                cy.get(selectors.passwordInput).type(newPassword)
                    .get(selectors.submitButton).click()
                    .get(selectors.passwordResetSuccessMessage).should('be.visible')
        
                // Check API response
                cy.wait('@passwordResetToken').its('response.body.tokenData').should('have.property', 'userID', passwordResetUser)
        
        
                // Sign in with new password
                cy.get(selectors.signInButton).click()
                    .url().should('contain', '/sign-in')
                clickOnCTA(selectors.signInTab)
                signIn(passwordResetUser, newPassword)
                cy.get(selectors.cardHeader).should('contain', myAccountAssertions(language).myBetsHeader)
            })
        })
    })
})