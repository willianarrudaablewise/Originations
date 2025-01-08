const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotQuality: 80,
  video: false, // Configurado como false pelo cypress.json
  screenshotOnRunFailure: false,
  videoUploadOnPasses: false,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    mochaJunitReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml",
    },
    cypressMochawesomeReporterOptions: {
      reportDir: "cypress/reports/mochawesome", // Diretório do relatório
      charts: true,
      reportPageTitle: "Relatório de testes",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      overwrite: false, // Adicionado do cypress.json
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
    video: false, // Configuração de vídeo ajustada do cypress.json
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // Configuração de eventos para testes de componentes
    },
  },
});
