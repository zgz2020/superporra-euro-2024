import { selectors, 
    clickOnCTA,
    checkPageHeader, 
    checkElementVisibility,
    checkInputFormHeader,
    updateFirstMatchScore,
    checkFirstMatchScoreGoals 
} from '../support/page-object'

describe('Results page', () => {

    it('Results container and Results update form', () => {
        cy.visit('/results')

        checkPageHeader('Resultados oficiales')
        checkElementVisibility(selectors.resultsContainer, 'be.visible')

        // Select Update results - It will show input form
        clickOnCTA(selectors.updateButton)
        checkInputFormHeader('Actualiza los resultados oficiales')

        updateFirstMatchScore("3")
        // Submit updates - It will show Results container
        clickOnCTA(selectors.inputForm.submitButton('top'))

        checkFirstMatchScoreGoals("3")
    })
})