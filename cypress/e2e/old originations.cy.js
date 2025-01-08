/*/// <reference types="cypress" />
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
            cy.visit('https://acs-dev.outsystemscloud.com/Origination_TH/Default.aspx');
            cy.contains('Email Address').should('be.visible');
            cy.contains('Email Address').type('warruda@PT');
            cy.contains('Password').type('Ablewise.2024!');
            cy.contains('Log In').click();
            cy.contains('span', 'New proposal').should('be.visible');
            cy.visit('https://acs-dev.outsystemscloud.com/Origination/Proposal_New.aspx?Code=NEW');
            cy.get('select[aria-required="true"]').select('2')
      cy.get('.Bold').click();
      cy.url().should('contains', 'https://acs-dev.outsystemscloud.com/Origination/Crk_P1.aspx');
      cy.get('a[title="Inserir Titular"] span').click();
      cy.url().should('contains', 'https://acs-dev.outsystemscloud.com/Origination/CrkP1_PreValidation.aspx');
      cy.get('input.input.Mandatory').type(nifAleatorio);
      cy.get('#Origination_TH_wt67_block_OutSystemsUIWeb_wt8_block_wtContent_wtActions_wt38_OutSystemsUIWeb_wtModal_block_wtContent_OutSystemsUIWeb_wt76_block_wtContent_wtLink_AddNIF').click();
            cy.get('#Origination_TH_wt67_block_OutSystemsUIWeb_wt8_block_wtContent_OutSystemsUIWeb_wt10_block_wtContent_wtMainContent_wt62_wtLR_Entities_ctl00_OutSystemsUIWeb_wt109_block_wtColumn1_OutSystemsUIWeb_wt208_block_wtContent_wtLR_NIFProposal_Name').type(firstName);    
      cy.get('#Origination_TH_wt67_block_OutSystemsUIWeb_wt8_block_wtContent_OutSystemsUIWeb_wt10_block_wtContent_wtMainContent_wt62_wtLR_Entities_ctl00_OutSystemsUIWeb_wt109_block_wtColumn1_OutSystemsUIWeb_wt208_block_wtContent_wtLR_NIFProposal_LastName').click();
            cy.get('#Origination_TH_wt67_block_OutSystemsUIWeb_wt8_block_wtContent_OutSystemsUIWeb_wt10_block_wtContent_wtMainContent_wt62_wtLR_Entities_ctl00_OutSystemsUIWeb_wt109_block_wtColumn1_OutSystemsUIWeb_wt208_block_wtContent_wtLR_NIFProposal_LastName').type(lastName);        
            cy.xpath("//select[contains(@id, 'UserRequesteProposal_Title')]").select('1773');
            cy.xpath("//input[contains(@id, 'LR_NIFProposal_BirthDate')]").type('1996-10-02');
            cy.xpath("//input[contains(@id, 'Requested_Amount')]").type('3000');
            cy.xpath("//input[@tabindex='83']").type('229876543');
            cy.xpath("//input[@tabindex='84']").type('219987654');
            cy.xpath("//input[@tabindex='86']").type('1250');
            cy.get('input.input.ThemeGrid_Width2').click();
            cy.get('input.input.ThemeGrid_Width2').type('123');     
            cy.xpath("//span[contains(text(),'Validate')]").click();
            cy.get('[tabindex="5"]').click();
            cy.get('[tabindex="18"]').type(nifAleatorio);
            cy.xpath("//input[@id='Origination_TH_wt10_block_OutSystemsUIWeb_wt17_block_wtContent_wtMainContent_OutSystemsUIWeb_wt7_block_wtContent_wt2_OutSystemsUIWeb_wt199_block_wtContent_wt57']").click()
            cy.wait(3000);
            cy.get('[tabindex="35"]').click();
            cy.wait(3000);
            cy.get('[tabindex="118"]').click();
        })
      })*/