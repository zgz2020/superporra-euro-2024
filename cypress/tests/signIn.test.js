import { 
    selectors,
    onlyThisErrorVisible,
    randomEmail
} from '../support/page-object'
import { registeredUser } from '../support/testData'

// Sign in happy path included in:
    // 'myAccount > 
    //      > My Account - Existent user with at least one prediction > 
    //          > beforeEach()'

// Sign up happy path included in:
    // 'myAccount > 
    //      > My Account - New User with no predictions > 
    //          > Elements rendered, create new prediction and update existent one'

describe('On page load', () => {
    it('No errors', () => {
        cy.visit('/sign-in')
        onlyThisErrorVisible()
    }) 
})

describe('Sign In, Sign Up & Forgot your Password - Unhappy paths', () => {

    before(() => {
        cy.visit('/sign-in')
            .wait(500) // FIXME!!! POST req aborted: /id-token & /mongo/data
    })

    it('Sign In - No email enterd', () => {
        cy.get(selectors.submitButton).eq(0).click()
        onlyThisErrorVisible('noEmailSignIn')
    })

    it('Sign In - Email not registered', () => {
        cy.get(selectors.emailInput).eq(0).clear().type('not-registered@test.com')
            .get(selectors.submitButton).eq(0).click()
        onlyThisErrorVisible('emailErrorSignIn')
    })

    it('Sign In - Wrong password', () => {
        cy.get(selectors.emailInput).eq(0).clear().type(registeredUser.email)
            // No password entered
            .get(selectors.submitButton).eq(0).click()
        onlyThisErrorVisible('passwordErrorSignIn')
        // Wrong password entered
        cy.get(selectors.passwordInput).eq(0).clear().type('WrongPassword')
            .get(selectors.submitButton).eq(0).click()
        onlyThisErrorVisible('passwordErrorSignIn')
    })

    it('Sign Up - No email enterd', () => {
        cy.get(selectors.submitButton).eq(1).click()
        onlyThisErrorVisible('noEmailSignUp')
    })

    it('Sign Up - Email already registered', () => {
        cy.get(selectors.emailInput).eq(1).clear().type(registeredUser.email)
            .get(selectors.submitButton).eq(1).click()
        onlyThisErrorVisible('emailErrorSignUp')
    })

    it('Sign Up - No password entered', () => {
        cy.get(selectors.emailInput).eq(1).clear().type(randomEmail())
            .get(selectors.submitButton).eq(1).click()
        onlyThisErrorVisible('passwordErrorSignUp')
    })

    it('Forgot your password - No email enterd', () => {
        cy.get(selectors.submitButton).eq(2).click()
        onlyThisErrorVisible('noEmailForgotPassword')
    })

    it('Forgot your password - Email not registered', () => {
        cy.get(selectors.emailInput).eq(2).clear().type('not-registered@test.com')
            .get(selectors.submitButton).eq(2).click()
        onlyThisErrorVisible('emailErrorForgotPassword')
    })

})


describe('Forgot password - Happy path', () => {
    it('Forgot your password - Email registered', () => {

        cy.intercept('/forgot-password-email', (req) => {
            // Check request sent with correct payload
            expect(req.body.email).to.include(registeredUser.email)
        }).as('forgotPasswordEmail')

        cy.visit('/sign-in')
            .get(selectors.emailInput).eq(2).clear().type(registeredUser.email)
            .get(selectors.submitButton).eq(2).click()
            // Check success message visible
            .get(selectors.emailSent).should('be.visible')
        // Check no error messages displayed
        onlyThisErrorVisible()
        
        // Check response received with server success messsage
        cy.wait('@forgotPasswordEmail')
            .its('response.body').should('include', 'Recovery email sent')
    })
})