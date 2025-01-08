module.exports = defineConfig({
  screenshotQuality: 80,
  video: false,
  screenshotOnRunFailure: true,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    mochaJunitReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml",
    },
    cypressMochawesomeReporterOptions: {
      reportDir: "cypress/reports/html", // Diretório de relatórios (html e json)
      charts: true,
      reportPageTitle: "Relatório de testes",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      overwrite: false,
      html: true,
      json: true,
      disableScreenshots: true,
      disableVideos: true,
    },
  },
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  defaultCommandTimeout: 15000,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    video: false,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  component: {
    setupNodeEvents(on, config) {},
  },
});
