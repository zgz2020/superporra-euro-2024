import { 
    selectors,
    signUp,
    randomEmail,
    signIn,
    checkNoBetsYet,
    checkUserOnlyPrediction,
    selectUserOnlyPrediction,
    checkElementVisibility,
    checkFirstRank,
    checkFirstParticipantLinks,
    clickOnCTA,
    checkInputFormHeader,
    checkFormIsEmpty,
    submitPredictionsNoUsername,
    fillInInputForm,
    checkFormIsFilledIn,
    checkLeaderboardLastParticipant,
    selectLastParticipant,
    checkPageHeader,
    updateInputForm
} from '../support/page-object'
import { registeredUser } from '../support/testData'


describe('Elements rendered and links - NEW User with no predictions', () => {

    // TODO !!!
    // after(() => {
    //     // Remove prediction and user created by these tests
    //     // ...
    //     // ...
    //     // ...
    // })

    it('Elements rendered, create new prediction and update existent one', () => {
        //Create a new user
        cy.visit('/sign-in')
        signUp(randomEmail(), 'testing')

        // Test new user's account initial content
        checkElementVisibility(selectors.leaderboard, 'not.to.exist') 
        cy.get(selectors.cardHeader).should('contain', 'My Bets')
        checkNoBetsYet()

        // Create new prediction and Update existent one
        clickOnCTA(selectors.updateButton) // This is actually the [JOIN] CTA
        
        checkInputFormHeader('Join the Superporra')
        checkFormIsEmpty()

        submitPredictionsNoUsername('bottom')
        submitPredictionsNoUsername('top')

        fillInInputForm()
        cy.wait(500)
        checkFormIsFilledIn()

        clickOnCTA(selectors.navItem(1)) // Navigate away from My Account page
        clickOnCTA(selectors.navItem(5)) // Navigate back to My Account page
        checkFormIsFilledIn()

        clickOnCTA(selectors.inputForm.cancelButton)
        checkNoBetsYet()

        clickOnCTA(selectors.updateButton)
        checkFormIsEmpty()

        fillInInputForm()
        clickOnCTA(selectors.inputForm.submitButton('top'))

        checkElementVisibility(selectors.inputForm.form, 'not.to.exist') 
        checkUserOnlyPrediction()
        
        // Check participant's predictions page
        selectUserOnlyPrediction()
        cy.wait(500)

        checkPageHeader('Predictions: ZZ Test Participant')
        checkElementVisibility(selectors.resultsContainer, 'be.visible')

        clickOnCTA(selectors.updateButton)

        checkInputFormHeader('Update your predictions')
        updateInputForm()
    })
    
})


describe('My Account - Existent user with at least one prediction', () => {

    beforeEach(() => {
        cy.visit('/sign-in')
        signIn(registeredUser.email, registeredUser.password)
    })

    // TODO !!!
    // after(() => {
    //     // Remove prediction created by these tests
    //     // ...
    //     // ...
    //     // ...
    // })


    it('Elements rendered and links', () => {
        cy.visit('/account')
            .get(selectors.cardHeader).should('contain', 'My Bets')

        checkElementVisibility(selectors.leaderboard, 'be.visible') 
        checkFirstRank()
        checkFirstParticipantLinks()
    })

    it('Create new prediction and Update existent one', () => {
        // cy.visit('/participants')
        cy.visit('/account')
        clickOnCTA(selectors.updateButton) // This is actually the [JOIN] CTA
        
        checkInputFormHeader('Join the Superporra')
        checkFormIsEmpty()

        submitPredictionsNoUsername('bottom')
        submitPredictionsNoUsername('top')

        fillInInputForm()
        cy.wait(500)
        checkFormIsFilledIn()

        clickOnCTA(selectors.navItem(1)) // Navigate away from My Account page
        clickOnCTA(selectors.navItem(5)) // Navigate back to My Account page
        checkFormIsFilledIn()

        clickOnCTA(selectors.inputForm.cancelButton)
        checkElementVisibility(selectors.leaderboard, 'be.visible') 

        clickOnCTA(selectors.updateButton)
        checkFormIsEmpty()

        fillInInputForm()
        clickOnCTA(selectors.inputForm.submitButton('top'))

        checkElementVisibility(selectors.inputForm.form, 'not.to.exist') 
        //checkElementVisibility(selectors.predictionsSubittedMessage, 'be.visible') 

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

