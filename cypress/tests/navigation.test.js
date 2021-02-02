import { checkNavigationItemLabel,
    checkNavigationItemLink,
    selectLanguage,
    signIn
} from '../support/page-object'
import { registeredUser } from '../support/testData'

describe('Navigation - Desktop', () => {

    it('Navigation labels and Language Picker - Signed out', () => {
        cy.visit('/')

        checkNavigationItemLabel(1, 'Home')
        checkNavigationItemLabel(2, 'Participants')
        checkNavigationItemLabel(3, 'Results')
        checkNavigationItemLabel(4, 'Scoring Rules')
        checkNavigationItemLabel(5, 'Sign In')

        checkNavigationItemLink('desktop', 2, '/participants')
        checkNavigationItemLink('desktop', 3, '/results')
        checkNavigationItemLink('desktop', 4, '/scoring-rules')
        checkNavigationItemLink('desktop', 5, '/sign-in')
        checkNavigationItemLink('desktop', 1, '/')

        selectLanguage('spanish')

        checkNavigationItemLabel(1, 'Inicio')
        checkNavigationItemLabel(2, 'Participantes')
        checkNavigationItemLabel(3, 'Resultados')
        checkNavigationItemLabel(4, 'Normas puntuación')
        checkNavigationItemLabel(5, 'Mi cuenta')
    })

    it('Navigation labels and Language Picker - Signed in', () => {
        cy.visit('/sign-in')
        signIn(registeredUser.email, registeredUser.password)

        checkNavigationItemLabel(1, 'Home')
        checkNavigationItemLabel(2, 'Participants')
        checkNavigationItemLabel(3, 'Results')
        checkNavigationItemLabel(4, 'Scoring Rules')
        checkNavigationItemLabel(5, 'Account')
        checkNavigationItemLabel(6, 'Sign Out')

        checkNavigationItemLink('desktop', 1, '/')
        checkNavigationItemLink('desktop', 2, '/participants')
        checkNavigationItemLink('desktop', 3, '/results')
        checkNavigationItemLink('desktop', 4, '/scoring-rules')
        checkNavigationItemLink('desktop', 5, '/account')
        
        selectLanguage('spanish')

        checkNavigationItemLabel(1, 'Inicio')
        checkNavigationItemLabel(2, 'Participantes')
        checkNavigationItemLabel(3, 'Resultados')
        checkNavigationItemLabel(4, 'Normas puntuación')
        checkNavigationItemLabel(5, 'Cuenta')
        checkNavigationItemLabel(6, 'Cerrar')

        // Signing out should redirect to homepage
        checkNavigationItemLink('desktop', 6, '/')
    })

})

describe('Navigation - Mobile', () => {
    
    it('Navigation labels and Language Picker - Signed out', () => {
        cy.viewport('iphone-6').visit('')

        checkNavigationItemLink('mobile', 2, '/participants')
        checkNavigationItemLink('mobile', 3, '/results')
        checkNavigationItemLink('mobile', 4, '/scoring-rules')
        checkNavigationItemLink('mobile', 5, '/sign-in')
        checkNavigationItemLink('mobile', 1, '/')
    })

    it('Navigation labels and Language Picker - Signed in', () => {
        cy.viewport('iphone-6').visit('/sign-in')
        signIn(registeredUser.email, registeredUser.password)

        checkNavigationItemLink('mobile', 1, '/')
        checkNavigationItemLink('mobile', 2, '/participants')
        checkNavigationItemLink('mobile', 3, '/results')
        checkNavigationItemLink('mobile', 4, '/scoring-rules')
        checkNavigationItemLink('mobile', 5, '/account')
        checkNavigationItemLink('mobile', 6, '/')
        
    })

})