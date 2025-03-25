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
describe('Criacao completa de um contrato - Particular - Crédito Pessoal.', () => {
    let nifAleatorio = gerarNIFValido();
    const firstName = faker.name.firstName(); 
          const lastName = faker.name.lastName();
          let currentPageUrl; // Para capturar e reutilizar a URL
    it('Cria uma entidade no Onboarding e uma proposal no Origination, até ter o numero do contrato.', () => {
        // ****** 1 - ENTRA NO ONBOARDING E CRIA UMA NOVA ENTIDADE
        cy.log('NIF Gerado: ' + nifAleatorio);
        cy.visit('https://acs-dev.outsystemscloud.com/OnBoarding_R/');
        cy.get('#Input_UsernameVal').should('be.visible');
        cy.get('#Input_UsernameVal').type('warruda@PT');
        cy.get('#Input_PasswordVal').type('Ablewise.2024!');
        cy.get('#b6-Button').click();
        cy.get('[class*="link-container"]').eq(1).click();
        cy.wait(2000);
        cy.get('[id*="ITIN_Input"]').click().type(nifAleatorio);
        cy.get('[id*="CreateNewEntityBtn"]').should('be.visible').click();
        cy.wait(4000);
        // ****** 2 - COMEÇA A PREENCHER TODOS OS FORMULÁRIOS
        // ****** 3 - COMEÇA A PREENCHER A PRIMEIRA SESSÃO (IDENTIFICATION)
              cy.get('select[id*="Dropdown_TitleId"]').as('dropdown');
        cy.get('@dropdown').select('PROFESSORA');
      // Valores: DOUTOR DOUTORA PROFESSOR PROFESSORA SENHOR SENHORA
      cy.get('[id*="Input_Name"]').type('Automação '+ firstName);
      cy.get('[id*="Input_LastName"]').type(lastName);
      cy.get('select[id*="Dropdown_Gender"]').select('Male');
      //  Valores: 0 Female 1 Male
      cy.get('select[id*="Dropdown_CivilStatus"]').as('dropdown');
      cy.get('@dropdown').select('Solteiro');
      //  Valores: 0 Casado 1 Solteiro
      cy.get('[id*="Input_BirthDate"]').type('1996-05-20', { force: true });
      cy.get('select[id*="Dropdown_Nationality"]').as('dropdown');
      cy.get('@dropdown').select('Portugal');
      cy.get('[id*="Input_NaturalnessLocal"]').type('Lisboa');
      cy.get('.custom-upload input[type="file"]').attachFile('imagemteste.jpg');
              cy.get('[id*="Input_IdentificationNumber"]').type(nifAleatorio);
              cy.get('[id*="Input_IdentificationValidateDate"]').type('2027-05-20', { force: true });
              cy.get('[id*="Input_ChildrenNumber"]').type('1');
              cy.get('[id*="Input_DependentsNumber"]').type('0');
              cy.get('[id*="Input_Email"]').type('Teste@gmail.com');
              cy.get('[id*="Input_PhoneNumber"]').type('914980545');
              cy.get('[id*="Input_Id_PhoneHouse"]').type('210340160');
              cy.get('[id*="Input_PhoneWork"]').type('216321456');
              // Primeiro save & continue
              cy.get('[class*="btn btn-primary custom-btn"]').eq(0).click();
              cy.wait(3000); 
              // ****** 4 - COMEÇA A PREENCHER A SEGUNDA SESSÃO (ADDRESS)
              // Checkbox Morada fiscal
              cy.get('[id*="Checkbox1"]').click();
              cy.wait(1000);
              cy.get('[id*="CodigoPostalInput"]').eq(0).type('1200');
              cy.wait(500);
              cy.get('[id*="SubCodigoPostalInput"]').eq(0).type('785');
              cy.wait(2000);
              cy.get('[id*="MoradaLinha2Input"]').eq(0).type('20');
              cy.wait(1000);
              // Verifica e reescreve se necessário
              cy.get('[id*="MoradaLinha2Input"]').eq(0).invoke('val').then((val) => {
                if (val !== '20') {
                  cy.get('[id*="MoradaLinha2Input"]').eq(0).clear().type('20');
                }
              });
              // Verifica se o checkbox está marcado, se não, clica novamente
              cy.get('[id*="Checkbox1"]').then($checkbox => {
                if (!$checkbox.is(':checked')) {
                  cy.get('[id*="Checkbox1"]').click();
                }
              });
              cy.get('.custom-upload input[type="file"]').attachFile('imagemteste.jpg');
              cy.wait(1000);
      // Segundo save & continue
      cy.get('[class*="btn btn-primary custom-btn"]').eq(2).click();
      cy.wait(1000); // Aguardar antes de passar para o próximo formulário
 // ****** 5 - COMEÇA A PREENCHER A TERCEIRA SESSÃO (FINANCIAL)
//Dados bancários
cy.get('[id*="IBAN_Input"][data-input]').click().type('PT50000714714857411858153');
cy.wait(2000);
// Verifica e reescreve o iban se necessário
cy.get('[id*="IBAN_Input"][data-input]').invoke('val').then((val) => {
  if (val !== 'PT50000714714857411858153') {
    cy.get('[id*="IBAN_Input"][data-input]').clear().type('PT50000714714857411858153');
  }
});
cy.get('[id*="BankDateInput"]').type('2020-05-01', { force: true });
cy.get('.custom-upload input[type="file"]').attachFile('imagemteste.jpg');
cy.wait(1000);
//terceiro  save
cy.get('[class*="btn btn-primary custom-btn"]').eq(4).click();
//****** 6 - QUARTA SESSÃO (EXTERNAL VALIDATIONS)
cy.get('[class*="btn custom-btn"]').eq(0).click();
cy.get('[class*="btn custom-btn"]').eq(1).click();
cy.wait(3000);
// ****** 7 - ACESSA ORIGINATIONS PARA CRIAR A PROPOSTA COM O MESMO NIF ANTERIOR.
  cy.visit('https://acs-dev.outsystemscloud.com/Origination_R/Login')
                  cy.get('#Input_UsernameVal').should('be.visible');
        cy.get('#Input_UsernameVal').type('warruda@PT');
        cy.get('#Input_PasswordVal').type('Ablewise.2024!');
        cy.get('#b6-Button').click();
         // expande e clica no menu new proposal
        cy.get('.menu-icon').should('be.visible');
        cy.get('.menu-icon').click();
  cy.get('.margin-top-m:nth-child(2)').click();
  // ****** 8 - ADICIONA O MESMO NIF UTILIZADO NA ENTIDADE E COMEÇA UMA NOVA PROPOSTA
  cy.get('[id*="ITIN_Input"][data-input]').type(nifAleatorio);
  cy.get('[id*="SelectProductBtn"]').click();
cy.get('select[class*="dropdown-display dropdown"]').as('dropdown');
cy.get('@dropdown').select('Crédito Pessoal');
// Valores: 0	Cartão Crédito, 1	Crédito Pessoal
// Cria uma new proposal
cy.get('[id*="StartNewProposalBtn"]').click();
     cy.wait(1000);
      // ****** 9 - CLICA EM NEXT NAS SESSÕES JÁ PREENCHIDAS
// general data next
     cy.get('[id*="NextStepBtn"]').click();
     cy.wait(1000);
     // financial information next
     cy.get('[id*="NextStepBtn"]').click();
cy.wait(2000);
 // ****** 10 - PREENCHE FINANCIAL INFORMATION DA PROPOSAL
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
     // ****** 11 - CLICA NO BOTÃO NEXT POIS OS FICHEIROS JA ESTÃO PREENCHIDOS
// Checklist save
cy.get('[class*="btn btn-primary custom-btn"]').eq(1).click(); 
// ****** 12 - FAZ O UPLOAD DO FICHEIRO SALARY
// Salary receipt 
cy.get('span.upload-file').eq(0).find('input[type="file"]').attachFile('imagemteste.jpg');
// AVAL
cy.get('span.upload-file').eq(1).find('input[type="file"]').attachFile('imagemteste.jpg');
cy.get('[class*="btn btn-primary custom-btn"]').eq(4).click();
cy.wait(5000);
// ****** 13 - PASSA PELO DECISION
// Decision Credito pessoal
cy.get('[id*="RadioButton1-input"]').eq(0).click();
 // Decision next button
 cy.get('[id*="NextStepBtn"]').click();
 // ****** 14 - PASSA PELO Client Deal
 //adiciona seguro 0 External 1 Internal
 cy.wait(5000);
 cy.get('select[class*="dropdown-display dropdown custom-input"]').as('dropdown');
 cy.get('@dropdown').select('External');
 cy.get('span.upload-file').find('input[type="file"]').attachFile('imagemteste.jpg');
 cy.wait(3000);
 cy.get('[class*="btn btn-primary custom-btn"]').eq(6).click();
 // ****** 15 - PASSA PELO Envio do contrato Core
 cy.wait(3000);
 cy.get('[class*="IconsAlignDisplayNone"]').click();
 cy.wait(3000);
 cy.get('[class*="btn btn-primary custom-btn"]').eq(6).click();
 // save & continue 
 // ****** 16 - verifico status finished
 cy.wait(10000);
 cy.get('span[data-expression]')
 .filter(':contains("Finished")')
 .should('have.text', 'Finished');
    });
}); 