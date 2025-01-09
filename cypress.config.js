const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");
const fs = require("fs");
const path = require("path");

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

      // Após cada execução de teste, excluir o screenshot anterior e manter apenas o novo
      on('after:screenshot', (details) => {
        const screenshotsDir = path.dirname(details.path); // Diretório onde o screenshot foi salvo
        const screenshotFiles = fs.readdirSync(screenshotsDir); // Lista todos os arquivos no diretório de screenshots
        
        // Filtra para pegar apenas arquivos PNG (capturas de tela)
        const screenshotImages = screenshotFiles.filter(file => file.endsWith('.png'));

        if (screenshotImages.length > 1) {
          // Ordena os arquivos de captura de tela pela data de modificação (do mais recente para o mais antigo)
          const sortedFiles = screenshotImages.sort((a, b) => {
            return fs.statSync(path.join(screenshotsDir, b)).mtime.getTime() - fs.statSync(path.join(screenshotsDir, a)).mtime.getTime();
          });

          // Exclui todos os screenshots antigos, mantendo apenas o mais recente
          sortedFiles.slice(1).forEach(file => {
            fs.unlinkSync(path.join(screenshotsDir, file)); // Exclui o screenshot antigo
          });
        }
        
        return null; // Retorna null para continuar a execução do Cypress
      });

      return config;
    },
  },
});