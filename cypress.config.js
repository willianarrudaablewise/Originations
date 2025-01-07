const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterOptions: { 
      mochaFile: 'cypress/reports/junit/results-[hash].xml'
    },
    cypressMochawesomeReporterOptions: {
      charts: true,
      reportPageTitle: 'Relatório de testes',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    }
  },
  defaultCommandTimeout: 15000, // Tempo padrão para espera de comandos (15 segundos)
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      // Implementar escutadores de eventos aqui, se necessário
    }
  },
  component: {
    setupNodeEvents(on, config) {
      // Implementar escutadores de eventos aqui, se necessário
    }
  }
});
