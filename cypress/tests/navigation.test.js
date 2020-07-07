import { selectors } from '../support/page-object'

describe('Navigation', () => {

    it('Navigation labels', () => {
        cy.visit('')
            .get(selectors.navItem).eq(0).should('contain', 'Inicio')
            .get(selectors.navItem).eq(1).should('contain', 'Participantes')
            .get(selectors.navItem).eq(2).should('contain', 'Resultados')
    })

    it('Navigation links work as expected', () => {
        cy.visit('')
            .get(selectors.navItem).eq(1).click()
                .url().should('contain', 'participants')
            .get(selectors.navItem).eq(2).click()
                .url().should('contain', 'results')
            .get(selectors.navItem).eq(0).click()
                .url().should('eq', 'http://localhost:8080/')
    })
})