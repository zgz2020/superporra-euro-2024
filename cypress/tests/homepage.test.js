import { clickOnSignUpLink } from '../support/page-object'
import { viewports } from '../support/testData'

describe('Homepage', () => {
    viewports.forEach(viewport => {
        it(`Link to sign up - ${viewport}`, () => {
            cy.viewport(viewport).visit('/')
            clickOnSignUpLink()
            cy.wait(500)
                .url().should('contain', 'sign-in')
        })
    })
})