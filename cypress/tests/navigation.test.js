import { selectors, checkNavigationItemLabel, checkNavigationItemLink } from '../support/page-object'

describe('Navigation', () => {

    it('Navigation labels', () => {
        cy.visit('')

        checkNavigationItemLabel(1, 'Inicio')
        checkNavigationItemLabel(2, 'Participantes')
        checkNavigationItemLabel(3, 'Resultados')
        checkNavigationItemLabel(4, 'Scoring Rules')

        checkNavigationItemLink(2, 'participants')
        checkNavigationItemLink(3, 'results')
        checkNavigationItemLink(4, 'scoring-rules')
        checkNavigationItemLink(1, '')
    })

})