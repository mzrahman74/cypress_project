const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1536,
  viewportWidth: 960,
  defaultCommandTimeout: 6000,
  video: true,
  projectId: "ukx291",
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json"
  },
  retries: {
    openMode: 1,
    runMode: 1
  },

  e2e: {
    baseUrl: "https://rahulshettyacademy.com/AutomationPractice/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
    experimentalWebKitSupport: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
