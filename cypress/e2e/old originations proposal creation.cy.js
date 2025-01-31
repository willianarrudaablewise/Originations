/// <reference types="cypress" />
function gerarNIFValido() {
  let primeiroDigito = Math.floor(Math.random() * 2) + 2;
  let primeiros8 = primeiroDigito.toString();
  for (let i = 0; i < 7; i++) {
      primeiros8 += Math.floor(Math.random() * 10);
  }
  let soma = 0;
  let pesos = [9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 8; i++) {
      soma += parseInt(primeiros8[i]) * pesos[i];
  }
  let resto = soma % 11;
  let digitoControle = resto === 0 || resto === 1 ? 0 : 11 - resto;
  return primeiros8 + digitoControle;
}

const { faker } = require('@faker-js/faker');
let nifAleatorio; // Compartilhado entre os testes
let currentPageUrl; // Para capturar e reutilizar a URL

describe('Criar uma proposta inteira no old originations', () => {
  beforeEach(() => {
      if (!nifAleatorio) {
          nifAleatorio = gerarNIFValido();
          cy.log('NIF Gerado: ' + nifAleatorio);
      }

      cy.session('Efetua o login no originations old', () => {
          cy.visit('https://acs-dev.outsystemscloud.com/Origination_TH/Default.aspx');
          cy.contains('Email Address').type('warruda@PT');
          cy.contains('Password').type('Ablewise.2024!');
          cy.contains('Log In').click();
      });
  });

  it('Inicia uma criação de uma nova proposta com um NIF gerado automaticamente', () => {
      cy.visit('https://acs-dev.outsystemscloud.com/Origination/Proposal_New.aspx?Code=NEW');
      cy.get('select[aria-required="true"]').select('2');
      cy.get('.Bold').click();
      cy.url().should('contain', 'Crk_P1.aspx');
      cy.get('a[title="Inserir Titular"] span').click();
      cy.url().should('contain', 'CrkP1_PreValidation.aspx');
      cy.get('input.input.Mandatory').type(nifAleatorio);
      cy.get('#Origination_TH_wt67_block_OutSystemsUIWeb_wt8_block_wtContent_wtActions_wt38_OutSystemsUIWeb_wtModal_block_wtContent_OutSystemsUIWeb_wt76_block_wtContent_wtLink_AddNIF').click();
      cy.wait(5000);

      // Captura a URL atual para reutilizar no próximo teste
      cy.url().then((url) => {
          currentPageUrl = url;
          cy.log('URL Capturada: ' + currentPageUrl);
      });
  });

  it('Preenche todos os dados da proposta e clica no botão validar', () => {
      cy.visit(currentPageUrl);
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      cy.get('#Origination_TH_wt67_block_OutSystemsUIWeb_wt8_block_wtContent_OutSystemsUIWeb_wt10_block_wtContent_wtMainContent_wt62_wtLR_Entities_ctl00_OutSystemsUIWeb_wt109_block_wtColumn1_OutSystemsUIWeb_wt208_block_wtContent_wtLR_NIFProposal_Name').type(firstName);
      cy.get('#Origination_TH_wt67_block_OutSystemsUIWeb_wt8_block_wtContent_OutSystemsUIWeb_wt10_block_wtContent_wtMainContent_wt62_wtLR_Entities_ctl00_OutSystemsUIWeb_wt109_block_wtColumn1_OutSystemsUIWeb_wt208_block_wtContent_wtLR_NIFProposal_LastName').type(lastName);
      cy.xpath("//select[contains(@id, 'UserRequesteProposal_Title')]").select('1773');
      cy.xpath("//input[contains(@id, 'LR_NIFProposal_BirthDate')]").type('1996-10-02');
      cy.xpath("//input[contains(@id, 'Requested_Amount')]").type('3000');
      cy.xpath("//input[@tabindex='83']").type('229876543');
      cy.xpath("//input[@tabindex='84']").type('219987654');
      cy.xpath("//input[@tabindex='86']").type('1250');
      cy.get('input.input.ThemeGrid_Width2').type('123');
      cy.xpath("//span[contains(text(),'Validate')]").click();
  });

  it('Verifica se a proposta foi criada, buscando pelo NIF na lista de propostas', () => {
    cy.visit(currentPageUrl);
    cy.get('[tabindex="5"]').click();
    cy.get('[tabindex="18"]').type(nifAleatorio);
    cy.xpath("//input[@id='Origination_TH_wt10_block_OutSystemsUIWeb_wt17_block_wtContent_wtMainContent_OutSystemsUIWeb_wt7_block_wtContent_wt2_OutSystemsUIWeb_wt199_block_wtContent_wt57']").click()
    cy.wait(3000);
    cy.get('[tabindex="35"]').click();
    cy.wait(3000);
    cy.get('[tabindex="118"]').click();
  });
});
