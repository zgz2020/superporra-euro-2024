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

        checkPageHeader('Official Results')
        checkElementVisibility(selectors.resultsContainer, 'be.visible')

        // Select Update results - It will show input form
        clickOnCTA(selectors.updateButton)
        checkInputFormHeader('Update the official results')

        updateFirstMatchScore("3")
        // Submit updates - It will show Results container
        clickOnCTA(selectors.inputForm.submitButton('top'))

        checkFirstMatchScoreGoals("3")
    })
})