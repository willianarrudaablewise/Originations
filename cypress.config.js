const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  screenshotQuality: 80,
  video: false, // Desabilitar vídeos
  screenshotOnRunFailure: true, // Capturas de tela em falhas
  reporter: "cypress-mochawesome-reporter", // Usar apenas Mochawesome
  reporterOptions: {
    reportDir: "cypress/reports", // Diretório dos relatórios (ajustado para ser o mesmo que o YAML)
    charts: true,
    reportPageTitle: "Relatório de Testes",
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    html: true,
    json: true,
  },
  screenshotsFolder: "cypress/screenshots", // Diretório das capturas de tela
  videosFolder: "cypress/videos", // Diretório dos vídeos
  defaultCommandTimeout: 15000,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on); // Configurar o Mochawesome
      return config;
    },
  },
});
