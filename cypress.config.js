const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  chromeWebSecurity: false,

  e2e: {
    baseUrl: "https://www.saucedemo.com",
    
    
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      overwrite: false,
      html: true,
      json: true
    },

    video: true,
    screenshotOnRunFailure: true,
  },
});
