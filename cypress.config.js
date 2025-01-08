const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotQuality: 80,
  video: false, // Desabilitar vídeos
  screenshotOnRunFailure: true, // Ativar capturas de tela em falhas
  reporter: "cypress-multi-reporters", // Usar múltiplos reportes
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter", // Definir Mochawesome e JUnit
    mochaJunitReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml", // Relatório JUnit
    },
    cypressMochawesomeReporterOptions: {
      reportDir: "cypress/reports/html", // Diretório para relatórios html e json
      charts: true, // Incluir gráficos no relatório
      reportPageTitle: "Relatório de testes",
      embeddedScreenshots: true, // Incluir capturas de tela no relatório
      inlineAssets: true, // Incluir assets inline
      saveAllAttempts: false, // Salvar apenas o último teste
      overwrite: false, // Não sobrescrever relatórios anteriores
      html: true, // Gerar relatório HTML
      json: true, // Gerar relatório JSON
      disableScreenshots: false, // Garantir que as capturas de tela sejam incluídas
      disableVideos: true, // Desabilitar vídeos
    },
  },
  screenshotsFolder: "cypress/screenshots", // Diretório para capturas de tela
  videosFolder: "cypress/videos", // Diretório para vídeos (se habilitado)
  defaultCommandTimeout: 15000,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    video: false, // Desabilitar vídeo para os testes
    setupNodeEvents(on, config) {
      // Configurar o plugin Mochawesome
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // Configuração para testes de componentes (se houver)
    },
  },
});
