import { 
    selectors, 
    clickOnCTA, 
    checkElementVisibility,
    checkInputFormHeader, 
    submitPredictionsNoUsername,
    checkFormIsEmpty,
    fillInInputForm,
    checkFormIsFilledIn,
    checkLeaderboardLastParticipant,
    selectLastParticipant,
    checkPageHeader,
    updateInputForm
} from '../support/page-object'

describe('Participants page', () => {

    it('Leaderboard renders', () => {
        cy.visit('/participants')
        checkElementVisibility(selectors.leaderboard, 'be.visible') 
        checkElementVisibility(selectors.inputForm.form, 'not.be.visible') 

        cy.url().then($url => {

            if($url.includes('heroku')) {
                // TO DO - Integration tests using production link
                // mock requests/data NO needed


            } 
            
            else {
                // TO DO: Mock API calls needed for mongo data - DEV ENV only (localhost)
                // .get(selectors.leaderboardRow.rank).eq(0).should('eq', '1')
                // .get(selectors.leaderboardRow.username).eq(0).should('eq', 'pollo')
                // .get(selectors.leaderboardRow.score).eq(0).should($score => 
                //     expect($score).to.satisfy((num) => { return num >= 0 }))


            }
        
        }) 
    })

    it('New predictions form renders', () => {
        cy.visit('/participants')
        
        clickOnCTA(selectors.updateButton)

        checkElementVisibility(selectors.leaderboard, 'not.be.visible') 
        checkInputFormHeader('Join the Superporra')
        checkFormIsEmpty()

        submitPredictionsNoUsername('bottom')
        submitPredictionsNoUsername('top')

        fillInInputForm()
        cy.wait(500)
        checkFormIsFilledIn()

        clickOnCTA(selectors.navItem(1))
        clickOnCTA(selectors.navItem(2))
        checkFormIsFilledIn()

        clickOnCTA(selectors.inputForm.cancelButton)
        checkElementVisibility(selectors.leaderboard, 'be.visible') 

        clickOnCTA(selectors.updateButton)
        checkFormIsEmpty()

        fillInInputForm()
        clickOnCTA(selectors.inputForm.submitButton('top'))

        checkElementVisibility(selectors.inputForm.form, 'not.be.visible') 
        checkElementVisibility(selectors.predictionsSubittedMessage, 'be.visible') 

        checkLeaderboardLastParticipant()
        

        // Check participant's predictions page
        selectLastParticipant()
        cy.wait(500)

        checkPageHeader('Predictions: ZZ Test Participant')
        checkElementVisibility(selectors.resultsContainer, 'be.visible')

        clickOnCTA(selectors.updateButton)

        checkInputFormHeader('Update your predictions')
        updateInputForm()
    })

})