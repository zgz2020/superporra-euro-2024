const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://superporra2024-8745684a5b0f.herokuapp.com',
    fixturesFolder: 'fixtures',
    supportFile: 'support/e2e.js',
    specPattern: 'tests/**/*.cy.js',
    retries: {
      // Configure retry attempts for `cypress run`
      // Default is 0
      "runMode": 2,
      // Configure retry attempts for `cypress open`
      // Default is 0
      "openMode": 0
    },
    screenshotsFolder: 'screenshots',
    videosFolder: 'videos',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
