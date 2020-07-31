import { checkNavigationItemLabel,
    checkNavigationItemLink,
    selectLanguage
} from '../support/page-object'

describe('Navigation', () => {

    it('Navigation labels and Language Picker', () => {
        cy.visit('')

        checkNavigationItemLabel(1, 'Home')
        checkNavigationItemLabel(2, 'Participants')
        checkNavigationItemLabel(3, 'Results')
        checkNavigationItemLabel(4, 'Scoring Rules')

        checkNavigationItemLink(2, 'participants')
        checkNavigationItemLink(3, 'results')
        checkNavigationItemLink(4, 'scoring-rules')
        checkNavigationItemLink(1, '')

        selectLanguage('spanish')

        checkNavigationItemLabel(1, 'Inicio')
        checkNavigationItemLabel(2, 'Participantes')
        checkNavigationItemLabel(3, 'Resultados')
        checkNavigationItemLabel(4, 'Normas puntuación')
    })

})