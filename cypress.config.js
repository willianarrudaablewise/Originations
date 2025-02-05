const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  screenshotQuality: 80,
  video: true, // Desabilitar vídeos
  screenshotOnRunFailure: true, // Capturas de tela em falhas
  reporter: "cypress-mochawesome-reporter", // Usar apenas Mochawesome
  reporterOptions: {
    reportDir: "cypress/", // Diretório dos relatórios (ajustado para ser o mesmo que o YAML)
    charts: true,
    reportPageTitle: "Relatório de Testes",
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: true,
    html: true,
    json: true,
  },
  screenshotsFolder: "cypress/", // Diretório das capturas de tela
  videosFolder: "cypress/", // Diretório dos vídeos
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