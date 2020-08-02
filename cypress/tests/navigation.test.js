import { checkNavigationItemLabel,
    checkNavigationItemLink,
    selectLanguage
} from '../support/page-object'

describe('Navigation - Desktop', () => {

    it('Navigation labels and Language Picker', () => {
        cy.visit('')

        checkNavigationItemLabel(1, 'Home')
        checkNavigationItemLabel(2, 'Participants')
        checkNavigationItemLabel(3, 'Results')
        checkNavigationItemLabel(4, 'Scoring Rules')

        checkNavigationItemLink('desktop', 2, 'participants')
        checkNavigationItemLink('desktop', 3, 'results')
        checkNavigationItemLink('desktop', 4, 'scoring-rules')
        checkNavigationItemLink('desktop', 1, '')

        selectLanguage('spanish')

        checkNavigationItemLabel(1, 'Inicio')
        checkNavigationItemLabel(2, 'Participantes')
        checkNavigationItemLabel(3, 'Resultados')
        checkNavigationItemLabel(4, 'Normas puntuación')
    })

})

describe('Navigation - Mobile', () => {
    
    it('Navigation labels and Language Picker', () => {
        cy.viewport('iphone-6').visit('')

        checkNavigationItemLink('mobile', 2, 'participants')
        checkNavigationItemLink('mobile', 3, 'results')
        checkNavigationItemLink('mobile', 4, 'scoring-rules')
        checkNavigationItemLink('mobile', 1, '')
    })

})