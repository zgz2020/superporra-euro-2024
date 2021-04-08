import { selectors, 
    clickOnCTA,
    checkPageHeader, 
    checkElementVisibility,
    checkInputFormHeader,
    updateFirstMatchScore,
    checkFirstMatchScoreGoals, 
    signIn,
    selectLanguage
} from '../support/page-object'
import { adminUser,
    viewports,
    languages,
    resultsAssertions
} from '../support/testData'

describe('Results page - Signed In as Admin', () => {

    after(() => {
        // clean up oficial results update
        clickOnCTA(selectors.updateButton)
        updateFirstMatchScore(" ")
        clickOnCTA(selectors.inputForm.submitButton('top'))
        checkFirstMatchScoreGoals(" ")
    })

    viewports.forEach(viewport => {
        languages.forEach(language => {
            it(`Results container and Results update form - ${viewport} - ${language}`, () => {
                cy.viewport(viewport).visit('/sign-in')
                selectLanguage(language)
                clickOnCTA(selectors.signInTab)
                signIn(adminUser.email, adminUser.password)
                cy.visit('/results')
        
                checkPageHeader(resultsAssertions(language).officialResults)
                checkElementVisibility(selectors.resultsContainer, 'be.visible')
        
                // Select Update results - It will show input form
                clickOnCTA(selectors.updateButton)
                checkInputFormHeader(resultsAssertions(language).updateResults)
        
                updateFirstMatchScore("3")
                // Submit updates - It will show Results container
                clickOnCTA(selectors.inputForm.submitButton('top'))
        
                checkFirstMatchScoreGoals("3")
            })
        })
    })
})