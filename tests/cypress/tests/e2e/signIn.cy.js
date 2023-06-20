import { 
    selectors,
    onlyThisErrorVisible,
    clickOnCTA,
    selectLanguage
} from '../../src/page-object'
import { registeredUser,
    viewports,
    languages,
    signInAssertions
} from '../../src/testData'

/*
Sign in happy path included in:
    myAccount > 
        > My Account - Existent user with at least one prediction > 
            > beforeEach()
*/


describe('On page load', () => {
    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`No errors - ${viewport} - ${language}`, () => {
                cy.visit('/sign-in')
                selectLanguage(language)
                onlyThisErrorVisible()
            }) 
        })
    })
})

describe('Sign In & Forgot your Password - Unhappy paths', () => {
    viewports.forEach(viewport => {    
        languages.forEach(language => {
            it(`Sign In - No email enterd - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                    .wait(500) // FIXME!!! POST req aborted: /id-token & /mongo/data
                selectLanguage(language)
                clickOnCTA(selectors.signInTab)
                cy.get(selectors.submitButton).eq(0).click()
                onlyThisErrorVisible('noEmailSignIn')
            })
        
            it(`Sign In - Email not registered - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                    .wait(500) // FIXME!!! POST req aborted: /id-token & /mongo/data
                selectLanguage(language)
                clickOnCTA(selectors.signInTab)
                cy.get(selectors.emailInput).eq(0).clear().type('not-registered@test.com')
                    .get(selectors.submitButton).eq(0).click()
                onlyThisErrorVisible('emailErrorSignIn')
            })
        
            it(`Sign In - Wrong password - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                    .wait(500) // FIXME!!! POST req aborted: /id-token & /mongo/data
                selectLanguage(language)
                clickOnCTA(selectors.signInTab)
                cy.get(selectors.emailInput).eq(0).clear().type(registeredUser.email)
                    // No password entered
                    .get(selectors.submitButton).eq(0).click()
                onlyThisErrorVisible('passwordErrorSignIn')
                // Wrong password entered
                cy.get(selectors.passwordInput).eq(0).clear().type('WrongPassword')
                    .get(selectors.submitButton).eq(0).click()
                onlyThisErrorVisible('passwordErrorSignIn')
            })
        
            it(`Forgot your password - No email enterd - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                    .wait(500) // FIXME!!! POST req aborted: /id-token & /mongo/data
                selectLanguage(language)
                clickOnCTA(selectors.forgotPasswordLink)
                cy.get(selectors.submitButton).eq(1).click()
                onlyThisErrorVisible('noEmailForgotPassword')
            })
        
            it(`Forgot your password - Email not registered - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                    .wait(500) // FIXME!!! POST req aborted: /id-token & /mongo/data
                selectLanguage(language)
                clickOnCTA(selectors.forgotPasswordLink)
                cy.get(selectors.emailInput).eq(1).clear().type('not-registered@test.com')
                    .get(selectors.submitButton).eq(1).click()
                onlyThisErrorVisible('emailErrorForgotPassword')
            })
        })
    })
})

describe('Join Panel', () => {
    viewports.forEach(viewport => {
        languages.forEach(language => {
            it('Elements render and link', () => {
                cy.viewport(viewport).visit('/sign-in')
                selectLanguage(language)

                clickOnCTA(selectors.joinTab)
                cy.get(selectors.joinLink).click()
                    .wait(500)
                    .url().should('contain', '/join')
            })
        })
    })
})

describe('Forgot password - Happy path', () => {
    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Sign In selected by default - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                selectLanguage(language)
                cy.get(selectors.submitButton).should('contain', signInAssertions(language).signIn)
            })
        
            it(`Forgot your password - Email registered - ${viewport} - ${language}`, () => {
        
                cy.intercept('/forgot-password-email', (req) => {
                    // Check request sent with correct payload
                    expect(req.body.email).to.include(registeredUser.email)
                }).as('forgotPasswordEmail')
        
                cy.viewport(viewport).visit('/sign-in')
                selectLanguage(language)
                clickOnCTA(selectors.forgotPasswordLink)
                cy.get(selectors.emailInput).eq(1).clear().type(registeredUser.email)
                    .get(selectors.submitButton).eq(1).click()
                    // Check success message visible
                    .get(selectors.emailSent).should('be.visible')
                // Check no error messages displayed
                onlyThisErrorVisible()
                
                // Check response received with server success messsage
                cy.wait('@forgotPasswordEmail')
                    .its('response.body').should('include', 'Recovery email sent')
            })
        })
    })
})