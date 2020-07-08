import { selectors, checkNavigationItemLabel, checkNavigationItemLink } from '../support/page-object'

describe('Navigation', () => {

    it('Navigation labels', () => {
        cy.visit('')

        checkNavigationItemLabel(1, 'Inicio')
        checkNavigationItemLabel(2, 'Participantes')
        checkNavigationItemLabel(3, 'Resultados')

        checkNavigationItemLink(2, 'http://localhost:8080/participants')
        checkNavigationItemLink(3, 'http://localhost:8080/results')
        checkNavigationItemLink(1, 'http://localhost:8080/')
    })

})