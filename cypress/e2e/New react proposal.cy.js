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
  cy.get('#b5-b13-ProductGroupDropdown').should('be.visible');
  cy.get('#b5-b13-ProductGroupDropdown').select('2');
  //0	Cartão, 1	Crédito, 2	Crédito Clássico, 3	Cartão, 4	CCL, 5	Multiproduto, 6	PPR
  cy.get('#b5-b13-StartNewProposalBtn').click();
  cy.get('#b5-b13-StartNewProposalBtn').should('be.visible');
      })
    })