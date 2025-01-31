/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
function gerarNIFValido() {
  let primeiros8 = '2';  // Fixando o primeiro dígito como 2
  for (let i = 0; i < 7; i++) {
      primeiros8 += Math.floor(Math.random() * 10);  // Adicionando números aleatórios
  }
  let soma = 0;
  let pesos = [9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 8; i++) {
      soma += parseInt(primeiros8[i]) * pesos[i];
  }
  let resto = soma % 11;
  let digitoControle = resto < 2 ? 0 : 11 - resto;  // Condicional otimizada
  return primeiros8 + digitoControle;
}
describe('Criacao completa de uma nova proposta', () => {
    it('Criacao completa de uma nova proposta', () => {
        // ****** 8 - ENTRA NO ORIGINATIONS E CRIA UMA NOVA PROPOSTA
cy.visit('https://acs-dev.outsystemscloud.com/Originations_R/Login')
                  cy.get('#Input_UsernameVal').should('be.visible');
        cy.get('#Input_UsernameVal').type('warruda@PT');
        cy.get('#Input_PasswordVal').type('Ablewise.2024!');
        cy.get('#b6-Button').click();
         // expande e clica no menu new proposal
        cy.get('.menu-icon').should('be.visible');
        cy.get('.menu-icon').click();
  cy.get('.margin-top-m:nth-child(2)').click();
  // ****** 9 - ADICIONA O MESMO NIF UTILIZADO NA ENTIDADE E COMEÇA UMA NOVA PROPOSTA
  cy.get('[id*="ITIN_Input"][data-input]').type('247244961');
  cy.get('[id*="SelectProductBtn"]').click();
cy.get('select[class*="dropdown-display dropdown"]').as('dropdown');
cy.get('@dropdown').select('Crédito Pessoal');
// Valores: 0	Cartão Crédito, 1	Crédito Pessoal
// Cria uma new proposal
cy.get('[id*="StartNewProposalBtn"]').click();
     cy.wait(1000);
      // ****** 10 - CLICA EM NEXT NAS SESSÕES JÁ PREENCHIDAS
// general data next
     cy.get('[id*="NextStepBtn"]').click();
     cy.wait(1000);
     // financial information next
     cy.get('[id*="NextStepBtn"]').click();
cy.wait(2000);
 // ****** 11 - PREENCHE FINANCIAL INFORMATION DA PROPOSAL
cy.get('select[id*="HouseStatusDropdown"]').as('dropdown');
cy.get('@dropdown').select('PROPRIA COM ENCARGOS');
// Valores: 0 ARRENDADA, 1 EMPRESA, 2 Neutro, 3 Outro, 4 PROPRIA COM ENCARGOS, 5 Propria sem encargos, 6 Sem resposta, 7 VIVE COM FAMILIARES
cy.get('[id*="AddressDateInput"]').type('2010-05-10', { force: true });
//Dados profissinais
cy.get('select[id*="ProfessionDropdown"]').as('dropdown');
cy.get('@dropdown').select('Advogado');
// Valores: 0 Advogado, 1 AGENTE PSP / GNR, 2 Agricultor proprietario, 3 AGRICULTOR RENDEIRO, 4 ARQUITETO / CONSULTOR, 5 Artista, 6 Assistente Social, 7 AUXILIAR DE AÇÃO MÉDICA. ETC...
cy.get('select[id*="ContractTypeDropdown"]').as('dropdown');
cy.get('@dropdown').select('EFECTIVO');
// Valores: 0 A COMISSAO, 1 A PRAZO, 2 CONTA PROPRIA, 3 EFECTIVO, 4 REFORMADO/DOMESTICA, 5 TEMPORARIO EVENTUAL
cy.get('[id*="CompanyNameInput"]').type("Google");
cy.get('[id*="CompanyAddressInput"]').type("Google");
cy.get('[id*="DateActualBusinessInput"]').type("2024-05-01", { force: true });
cy.get('[id*="TelemovelEmpregoInput"]').type("910420850");
//Rendimentos
cy.get('[id*="MonthlyLiquidSalaryInput"]').clear().type("1850");
cy.get('[id*="IncomeNotProvenInput"]').clear().type("1000");
cy.get('[id*="PensionInput"]').clear().type("300");
//Encargos
cy.get('[id*="HouseRentExpensesInput"]').clear().type("700");
cy.get('[id*="CarExpensesInput"]').clear().type("150");
cy.get('[id*="OtherExpensesInput"]').clear().type("400");
     // Save & continue financial information
     cy.get('[class*="btn btn-primary custom-btn"]').eq(1).click();
     // ****** 12 - CLICA NO BOTÃO NEXT POIS OS FICHEIROS JA ESTÃO PREENCHIDOS
// Checklist save
cy.get('[class*="btn btn-primary custom-btn"]').eq(3).click(); 
// ****** 13 - FAZ O UPLOAD DO FICHEIRO SALARY
// Salary receipt 
cy.get('span.upload-file').find('input[type="file"]').attachFile('imagemteste.jpg');
cy.get('[class*="btn btn-primary custom-btn"]').eq(4).click();
cy.wait(7000);
// ****** 14 - PASSA PELO DECISION
// Decision Credito pessoal
cy.get('[id*="RadioButton1-input"]').eq(0).click();
// Não aceito receber novidades
cy.get('[id*="Checkbox1"]').click();
 // Decision next button
 cy.get('[id*="NextStepBtn"]').click();
});
}); 