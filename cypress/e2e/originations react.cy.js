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
  let digitoControle = 0;
  if (resto === 0 || resto === 1) {
    digitoControle = 0;
  } else {
    digitoControle = 11 - resto;
  }
  return primeiros8 + digitoControle;
}
const { faker } = require('@faker-js/faker');
describe('To create a new proposal and verify its existance on proposal list', () => {
    it('should create a new proposal and validate it existance', () => {
         const firstName = faker.name.firstName(); 
                const lastName = faker.name.lastName();
                let nifAleatorio = gerarNIFValido();
                cy.log('NIF Gerado: ' + nifAleatorio);
                cy.visit('https://acs-dev.outsystemscloud.com/Originations_R/Login')
      cy.get('#Input_UsernameVal').should('be.visible');
      cy.get('#Input_UsernameVal').type('warruda@PT');
      cy.get('#Input_PasswordVal').type('Ablewise.2024!');
      cy.get('#b6-Button').click();
      cy.get('.menu-icon').should('be.visible');
      cy.get('.menu-icon').click();
cy.get('.margin-top-m:nth-child(2)').click();
cy.get('#b3-b14-ProductGroupDropdown').should('be.visible');
cy.get('#b3-b14-ProductGroupDropdown').select('2');
//0	Cartão, 1	Crédito, 2	Crédito Clássico, 3	Cartão, 4	CCL, 5	Multiproduto, 6	PPR
cy.get('#b3-b14-StartNewProposalBtn').click();
cy.url().should('contains', 'https://acs-dev.outsystemscloud.com/Originations_R/Proposal');
cy.get('.margin-right-s').click();
cy.get('[data-input]').should('be.visible');
cy.get('[data-input]').type(nifAleatorio);
cy.contains('button', 'Add').click();
      cy.wait(7000);
      cy.get('input[data-input][id*="Input_Name"]').eq(0).type(firstName); // Digita no campo
      cy.get('input[data-input][id*="Input_LastName"]').eq(0).type(lastName);
      cy.get('select[id*="Dropdown1"]').eq(0).select('4');
      //0	DOUTOR, 1	DOUTORA, 2	PROFESSOR, 3 PROFESSORA, 4	SENHOR, 5	SENHORA
      cy.get('select[id*="Dropdown2"]').eq(0).select('1');
      //0 Female, 1 Male
cy.get('input[data-input][type="date"]').eq(0).type('1996-05-20');
cy.get('input[data-input][id*="Input_Email"]').eq(0).type('test@example.com');
cy.get('input[data-input][id*="Input_Telemovel"]').eq(0).type('910650450');
cy.get('input[data-input][id*="Input_Id_TelefoneCasa"]').eq(0).type('210362145');
cy.get('input[data-input][id*="Input_TelefoneEmprego"]').eq(0).type('210147852');
cy.get('input[data-input][id*="Input_PostCode"]').eq(0).type('1250');
cy.get('input[data-input][id*="Input_SubPostCode"]').eq(0).type('271');
cy.contains('span', 'Finalizar').click();
cy.wait(2000);
cy.get('.menu-icon').click();
cy.xpath('//span[@class="heading6 expanded-text"][contains(text(),"List of Proposals")]').click()
cy.wait(5000);
cy.get('#SearchTermInput').type(nifAleatorio);
cy.get('#b7-Icon').click();
cy.wait(2000);

    })
  })