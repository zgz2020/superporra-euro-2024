import { selectors } from '../support/page-object'

describe('Participants', () => {

    it('Leaderboard renders', () => {
        cy.visit('/participants')
        // TO DO: Mock API calls needed for mongo data
            // .get(selectors.leaderboardRow.rank).eq(0).should('eq', '1')
            // .get(selectors.leaderboardRow.username).eq(0).should('eq', 'pollo')
            // .get(selectors.leaderboardRow.score).eq(0).should($score => 
            //     expect($score).to.satisfy((num) => { return num >= 0 }))
    })

    it('Participate', () => {
        cy.visit('/participants')
            .get(selectors.updateButton).click()
    })
})