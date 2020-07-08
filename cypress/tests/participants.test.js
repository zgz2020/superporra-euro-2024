import { 
    selectors, 
    clickOnCTA, 
    checkElementVisibility,
    checkPredictionsFormHeader, 
    submitPredictionsNoUsername,
    checkFormIsEmpty,
    fillInPredictionsForm,
    checkFormIsFilledIn,
    checkLeaderboardLastParticipant,
    selectLastParticipant
} from '../support/page-object'

describe('Participants page', () => {

    it('Leaderboard renders', () => {
        cy.visit('/participants')
        checkElementVisibility(selectors.leaderboard, 'be.visible') 
        checkElementVisibility(selectors.predictionsForm.form, 'not.be.visible') 

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

    it('New redictions form renders', () => {
        cy.visit('/participants')
        
        clickOnCTA(selectors.updateButton)

        checkElementVisibility(selectors.leaderboard, 'not.be.visible') 
        checkPredictionsFormHeader('Participa en la superporra')
        checkFormIsEmpty()

        submitPredictionsNoUsername('bottom')
        submitPredictionsNoUsername('top')

        fillInPredictionsForm()
        checkFormIsFilledIn()

        clickOnCTA(selectors.navItem(1))
        clickOnCTA(selectors.navItem(2))
        checkFormIsFilledIn()

        clickOnCTA(selectors.predictionsForm.cancelButton)
        checkElementVisibility(selectors.leaderboard, 'be.visible') 

        clickOnCTA(selectors.updateButton)
        checkFormIsEmpty()

        fillInPredictionsForm()
        clickOnCTA(selectors.predictionsForm.submitButton('top'))

        checkElementVisibility(selectors.predictionsForm.form, 'not.be.visible') 
        checkElementVisibility(selectors.predictionsSubittedMessage, 'be.visible') 

        checkLeaderboardLastParticipant()
        selectLastParticipant()
        cy.wait(2000)
    })

})