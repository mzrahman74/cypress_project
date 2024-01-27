const { defineConfig } = require("cypress");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

module.exports = defineConfig({
  viewportHeight: 1536,
  viewportWidth: 960,
  defaultCommandTimeout: 6000,
  video: false,
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
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
    experimentalWebKitSupport: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        setHref: val => {
          return (href = val);
        },
        getHref: () => {
          return href;
        }
      });

      on("task", {
        excelToJsonConverter(filePath) {
          const result = excelToJson({
            source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
          });
          return result;
        }
      });
    }
  }
});
