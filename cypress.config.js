const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotQuality: 80,
  video: false, // Configurado como false para não gravar vídeos dos testes
  screenshotOnRunFailure: false,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    mochaJunitReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml", // Relatório em formato JUnit
    },
    cypressMochawesomeReporterOptions: {
      reportDir: "cypress/reports/html", // Diretório de relatórios HTML e JSON
      charts: true,
      reportPageTitle: "Relatório de testes",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      overwrite: false, // Não sobrescrever os relatórios existentes
      html: true, // Gerar relatório HTML
      json: true, // Gerar relatório JSON
      disableScreenshots: true, // Desabilitar captura de tela no Mochawesome (usando as capturas de tela do Cypress)
      disableVideos: true, // Desabilitar vídeos no Mochawesome (usando a configuração do Cypress)
    },
  },
  screenshotsFolder: "cypress/screenshots", // Diretório das capturas de tela
  videosFolder: "cypress/videos", // Diretório dos vídeos (não será utilizado já que video está como false)
  defaultCommandTimeout: 15000, // Timeout padrão para comandos
  viewportWidth: 1280, // Largura da tela do navegador para os testes
  viewportHeight: 720, // Altura da tela do navegador para os testes
  e2e: {
    video: false, // Desabilitar gravação de vídeo para os testes de e2e
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on); // Configuração do plugin do Mochawesome
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // Configuração de eventos para testes de componentes
    },
  },
});
