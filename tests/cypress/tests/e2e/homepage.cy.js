import { clickOnSignUpLink, selectLanguage } from '../../src/page-object'
import { viewports, languages } from '../../src/testData'

describe('Homepage', () => {
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