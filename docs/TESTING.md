# Superporra App - Testing

## Cypress.io

Cypress.io is used for integration testing.


### Running tests

- DEV
    - Go to `./tests/cypress/cypress.config` and set `baseUrl` to `http://localhost:8080`
    - First open the app by running `npm run start-dev`
    - Then:
        - To run tests with cypress UI:
            - Open cypress UI by running `npm run cy:open`
            - Click on specific tests on cypress UI
        - To run all the tests on the terminal:
            - Run `npm run cy:test`
- PROD
    - Go to `./tests/cypress/cypress.config` and set `baseUrl` to `https://superporra2024-8745684a5b0f.herokuapp.com/`
        - Note that prod url will probably change in the future
    - Then follow instructions above to run the tests with either cypress UI or on the terminal.

### Tests location

- The tests can be found in `./tests/cypress/tests`
- New tests should be added to `./tests/cypress/tests`, adding `.cy.js` to the file name.
- Selectors and methods can be found in `./tests/cypress/src/page-object`
- Configuration values can be found in `./tests/cypress/cypress.config`


### Current test suite

- Navigation
    - Labels
    - Links
- Participants page
    - Leaderboards render
        - With no participants
        - With participants recently added
    - Participants page states
        - Leaderboard and NO predictions form
        - Predictions form and NO leaderboard
    - Predictions form
        - Renders as expected
        - Submitting with no username
        - Generating random predictions
        - Form's data persistency when navigating away and back
        - Canceling form
        - Submitting form
    - API / Database integration
        - <span style="color:red">TO DO</span>
- Participant page:
    - <span style="color:red">TO DO</span>
- Results page:
    - <span style="color:red">TO DO</span>


