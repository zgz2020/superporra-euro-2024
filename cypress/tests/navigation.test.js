import { checkNavigationItemLabel,
    checkNavigationItemLink,
    clickOnCTA,
    selectLanguage,
    selectors,
    signIn
} from '../support/page-object'
import { registeredUser, viewports, languages, navigationAssertions } from '../support/testData'

describe('Navigation - Desktop', () => {

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Navigation labels and Language Picker - Signed out - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/')
                selectLanguage(language)
        
                checkNavigationItemLabel(1, navigationAssertions(language).navItem1)
                // checkNavigationItemLabel(2, navigationAssertions(language).navItem2)
                checkNavigationItemLabel(2, navigationAssertions(language).navItem3)
                checkNavigationItemLabel(3, navigationAssertions(language).navItem4)
                checkNavigationItemLabel(4, navigationAssertions(language).navItem5)
                checkNavigationItemLabel(5, navigationAssertions(language).navItem6)
                checkNavigationItemLabel(6, navigationAssertions(language).navItem7A)
        
                // checkNavigationItemLink(viewport, 2, '/join')
                checkNavigationItemLink(viewport, 2, '/participants')
                checkNavigationItemLink(viewport, 3, '/results')
                checkNavigationItemLink(viewport, 4, '/prizes')
                checkNavigationItemLink(viewport, 5, '/rules')
                checkNavigationItemLink(viewport, 6, '/sign-in')
                checkNavigationItemLink(viewport, 1, '/')
            })

            it(`Navigation labels and Language Picker - Signed in - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                selectLanguage(language)
                clickOnCTA(selectors.signInTab)
                signIn(registeredUser.email, registeredUser.password)
        
                checkNavigationItemLabel(1, navigationAssertions(language).navItem1)
                // checkNavigationItemLabel(2, navigationAssertions(language).navItem2)
                checkNavigationItemLabel(2, navigationAssertions(language).navItem3)
                checkNavigationItemLabel(3, navigationAssertions(language).navItem4)
                checkNavigationItemLabel(4, navigationAssertions(language).navItem5)
                checkNavigationItemLabel(5, navigationAssertions(language).navItem6)
                checkNavigationItemLabel(6, navigationAssertions(language).navItem7B)
                checkNavigationItemLabel(7, navigationAssertions(language).navItem8)
        
                checkNavigationItemLink(viewport, 1, '/')
                // checkNavigationItemLink(viewport, 2, '/join')
                checkNavigationItemLink(viewport, 2, '/participants')
                checkNavigationItemLink(viewport, 3, '/results')
                checkNavigationItemLink(viewport, 4, '/prizes')
                checkNavigationItemLink(viewport, 5, '/rules')
                checkNavigationItemLink(viewport, 6, '/account')
                checkNavigationItemLink(viewport, 7, '/')
            })
        })
    })
})