import { clickOnSignUpLink, selectLanguage } from '../support/page-object'
import { viewports, languages } from '../support/testData'

// Sign Up links removed - Skipping test
describe.skip('Homepage', () => {
    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Link to sign up - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/')
                selectLanguage(language)
                clickOnSignUpLink()
                cy.wait(500)
                    .url().should('contain', 'join')
            })
        })
    })
})