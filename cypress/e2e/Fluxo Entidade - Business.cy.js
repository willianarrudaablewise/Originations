/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');
function gerarNIFEmpresa() {
  let primeiros8 = '5'; 
  for (let i = 0; i < 7; i++) {
      primeiros8 += Math.floor(Math.random() * 10);  
  }
  let soma = 0;
  let pesos = [9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 8; i++) {
      soma += parseInt(primeiros8[i]) * pesos[i];
  }
  let resto = soma % 11;
  let digitoControle = resto < 2 ? 0 : 11 - resto;
  return primeiros8 + digitoControle;
}
function gerarNIFParticular() {
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
describe('Cria uma entidade valida - Business.', () => {
    let nifAleatorioEmpresa = gerarNIFEmpresa();
    let nifAleatorioParticular = gerarNIFParticular();
    const companyName = faker.company.name(); 
    const firstName = faker.name.firstName(); 
    const lastName = faker.name.lastName();
          let currentPageUrl; // Para capturar e reutilizar a URL
    it('Faz o fluxo de uma entidade particular como representante, depois inicia a criação de uma entidade com NIF empresarial.', () => {
        // ****** 1 - ENTRA NO ONBOARDING E CRIA UMA NOVA ENTIDADE
        cy.log('NIF Empresa: ' + nifAleatorioEmpresa);
        cy.log('NIF Particular: ' + nifAleatorioParticular);
        cy.visit('https://acs-dev.outsystemscloud.com/OnBoarding_R/');
        cy.get('#Input_UsernameVal').should('be.visible');
        cy.get('#Input_UsernameVal').type('warruda@PT');
        cy.get('#Input_PasswordVal').type('Ablewise.2024!');
        cy.get('#b6-Button').click();
        //cria cadastro particular
        cy.get('[class*="link-container"]').eq(1).click();
        cy.wait(2000);
        cy.get('[id*="ITIN_Input"]').click().type(nifAleatorioParticular);
        cy.get('[id*="CreateNewEntityBtn"]').should('be.visible').click();
        cy.wait(4000);
        // ****** 2 - COMEÇA A PREENCHER TODOS OS FORMULÁRIOS
        // ****** 3 - COMEÇA A PREENCHER A PRIMEIRA SESSÃO (IDENTIFICATION)
              cy.get('select[id*="Dropdown_TitleId"]').as('dropdown');
        cy.get('@dropdown').select('Professor(a)');
      cy.get('[id*="Input_Name"]').type('Automação '+ firstName);
      cy.get('[id*="Input_LastName"]').type(lastName);
      cy.get('select[id*="Dropdown_Gender"]').select('Masculino');
      cy.get('select[id*="Dropdown_CivilStatus"]').as('dropdown');
      cy.get('@dropdown').select('Solteiro');
      cy.get('[id*="Input_BirthDate"]').type('1996-05-20', { force: true });
      cy.get('select[id*="Dropdown_Nationality"]').as('dropdown');
      cy.get('@dropdown').select('Portuguesa');
      cy.get('[id*="Input_NaturalnessLocal"]').type('Lisboa');
      cy.get('.custom-upload input[type="file"]').attachFile('imagemteste.jpg');
              cy.get('[id*="Input_IdentificationNumber"]').type(nifAleatorioParticular);
              cy.get('[id*="Input_IdentificationValidateDate"]').type('2027-05-20', { force: true });
              cy.get('[id*="Input_ChildrenNumber"]').type('1');
              cy.get('[id*="Input_DependentsNumber"]').type('0');
              cy.get('[id*="Input_Email"]').type('Teste@gmail.com');
              cy.get('[id*="Input_PhoneNumber"]').type('914980545');
              cy.get('[id*="Input_Id_PhoneHouse"]').type('210340160');
              cy.get('[id*="Input_PhoneWork"]').type('216321456');
              // Primeiro save & continue
              cy.get('[class*="btn btn-primary custom-btn"]').eq(0).click();
              cy.wait(4000); 
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
// agora inicia uma proposta business
        cy.get('[class*="link-container"]').eq(1).click();
        cy.wait(2000);
        cy.get('[id*="ITIN_Input"]').click().type(nifAleatorioEmpresa);
        cy.get('[id*="CreateNewEntityBtn"]').should('be.visible').click();
        cy.wait(4000);
        // ****** 2 - COMEÇA A PREENCHER TODOS OS FORMULÁRIOS
        cy.get('[id*="Input_Name"]').type('Automação '+ companyName);
        cy.get('[id*="CodigoPostalInput"]').eq(0).type('1200');
              cy.wait(500);
              cy.get('[id*="SubCodigoPostalInput"]').eq(0).type('785');
              cy.wait(2000);
              cy.get('[class*="btn btn-primary custom-btn"]').click();
              cy.get('[id*="Input_CPC_ExpirationDate"]').type("2026-05-01", { force: true });
              cy.get('span.upload-file').eq(0).find('input[type="file"]').attachFile('imagemteste.jpg');
              cy.get('[id*="Input_RCBE_ExpirationDate"]').type("2026-05-01", { force: true });
              cy.get('span.upload-file').eq(1).find('input[type="file"]').attachFile('imagemteste.jpg');
              cy.get('[class*="btn btn-primary custom-btn"]').eq(1).click();
              cy.get('[class*="btn custom-btn"]').eq(0).click();
cy.get('[class*="btn custom-btn"]').eq(1).click();
cy.wait(5000);
//Representatives - Adicionar representantes.
cy.get('[class*="btn btn-primary custom-btn"]').eq(4).click();
cy.wait(3000);
cy.get('[id*="Input_ITIN"]').type(nifAleatorioParticular);
cy.get('[id*="AddBtn"]').click();
cy.wait(3000);
    });
}); 