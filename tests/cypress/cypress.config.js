const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://superporra2024-8745684a5b0f.herokuapp.com/',
    fixturesFolder: 'fixtures',
    supportFile: 'support/e2e.js',
    specPattern: 'tests/**/*.cy.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
