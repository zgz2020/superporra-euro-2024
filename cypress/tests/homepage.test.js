import { clickOnSignUpLink } from '../support/page-object'

const viewports = ['macbook-15', 'iphone-6']

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