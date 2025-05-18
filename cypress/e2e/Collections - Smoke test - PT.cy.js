/// <reference types="cypress" />

describe('Testes exploratórios - Collections.', () => {
  it('Home & SRC-Submenu.', () => {
    cy.visit('https://acs-dev.outsystemscloud.com/Collections_R/SRC');

    cy.get('#Input_UsernameVal').should('be.visible');
    cy.get('#Input_UsernameVal').type('warruda@PT');
    cy.get('#Input_PasswordVal').type('Ablewise.2024!');
    cy.get('#b6-Button').click();
    cy.wait(8000);

    // cy.get('[class*="menu-icon"]').eq(1).click();
    // cy.get('[class*="link-container"]').eq(1).click();

    // Search accounts.
    cy.get('[id*="Input_ContractNumber"]').eq(0).click().type("botãolimpar");
    cy.wait(500);
    cy.get('[class*="btn custom-btn ThemeGrid_MarginGutter"]').eq(0).click();
    cy.wait(500);

    cy.get('[id*="Input_ContractNumber"]').eq(0).click().type("003009512");
    cy.wait(500);
    cy.get('.btn-primary').eq(0).contains('Pesquisar').click();
    cy.wait(500);

    cy.get('td[data-header="Num. Contrato"]').eq(0).contains('003009512').should('be.visible');
    cy.wait(500);

    // Search customers.
    cy.get('[class*="osui-tabs__header-item"]').eq(1).click();
    cy.wait(500);

    cy.get('[id*="Input_ContractNumber"]').eq(1).click().type("botãolimpar");
    cy.wait(500);
    cy.get('[class*="btn custom-btn ThemeGrid_MarginGutter"]').eq(1).click();
    cy.wait(500);

    cy.get('[id*="Input_ContractNumber"]').eq(1).click().type("124615643");
    cy.wait(500);
    cy.get('.btn-primary').eq(1).contains('Pesquisar').click();
    cy.wait(500);

    cy.get('td[data-header="Nome Cliente"]').eq(1).contains('JORGE ALMEIDA').should('be.visible');
    cy.wait(500);

    // PARI
    cy.get('[class*="osui-tabs__header"]').eq(11).click();
    cy.wait(500);

    cy.get('[id*="Input_SearchText"]').eq(0).click().type("botãolimpar");
    cy.wait(500);
    cy.get('[id*="ClearBtn"]').eq(0).click();
    cy.wait(500);

    cy.get('[id*="Input_SearchText"]').eq(0).click().type("130532479");
    cy.wait(500);
    cy.get('[id*="SearchBtn"]').eq(0).click();
  });
});
