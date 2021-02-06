import { selectors, 
    clickOnCTA,
    checkPageHeader, 
    checkElementVisibility,
    checkInputFormHeader,
    updateFirstMatchScore,
    checkFirstMatchScoreGoals, 
    signIn
} from '../support/page-object'
import { adminUser } from '../support/testData'

describe('Results page - Signed In as Admin', () => {

    after(() => {
        // clean up oficial results update
        clickOnCTA(selectors.updateButton)
        updateFirstMatchScore("0")
        clickOnCTA(selectors.inputForm.submitButton('top'))
        checkFirstMatchScoreGoals("0")
    })

    it('Results container and Results update form', () => {
        cy.visit('/sign-in')
        signIn(adminUser.email, adminUser.password)
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