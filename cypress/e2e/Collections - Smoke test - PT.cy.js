/// <reference types="cypress" />
describe('Testes exploratorios - Collections.', () => {
    it('SRC Submenu.', () => {
        // ****** 1 - ENTRA NO ONBOARDING E CRIA UMA NOVA ENTIDADE
        cy.visit('https://acs-dev.outsystemscloud.com/Collections_R/');
        cy.get('#Input_UsernameVal').should('be.visible');
        cy.get('#Input_UsernameVal').type('warruda@PT');
        cy.get('#Input_PasswordVal').type('Ablewise.2024!');
        cy.get('#b6-Button').click();
        cy.wait(10000);
    });
}); 