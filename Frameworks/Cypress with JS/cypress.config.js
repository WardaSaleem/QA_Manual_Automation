const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    baseUrl: 'https://careglp-staging.carevalidate.com/',
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "reports",
      overwrite: false,
      html: true,
      json: true
    },
  },
});
