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
function gerarBBAN(digitos) {
  let bban = '';
  for (let i = 0; i < digitos; i++) {
    bban += Math.floor(Math.random() * 10); // Gera dígitos aleatórios de 0 a 9
  }
  return bban;
}
function gerarIBANPortugal() {
  const codigoPais = 'PT'; // Código do país para Portugal
  const bban = gerarBBAN(21); // Gera 21 dígitos aleatórios para o BBAN
  // Adicionar a conversão de 'PT' para números no final do BBAN
  const bbanCompleto = bban + '252100'; // 'PT' convertido em números e '00' (para calcular)
  // Calcular os dígitos de controle usando o algoritmo MOD 97
  const resto = BigInt(bbanCompleto) % 97n;
  const digitosControle = (98n - resto).toString().padStart(2, '0'); // Garantir que tenha 2 dígitos
  // Montar o IBAN completo
  const iban = `${codigoPais}${digitosControle}${bban}`;
  // Retornar o IBAN
  return iban;
}
describe('Criacao completa de uma nova proposta', () => {
    let nifAleatorio = gerarNIFValido();
    const firstName = faker.name.firstName(); 
          const lastName = faker.name.lastName();
    it('Criacao completa de uma nova proposta', () => {
        // ****** 1 - ENTRA NO ONBOARDING E CRIA UMA  NOVA ENTIDADE
        cy.log('NIF Gerado: ' + nifAleatorio);
        cy.visit('https://acs-dev.outsystemscloud.com/OnBoarding_R_KYC_KYB/');
        cy.get('#Input_UsernameVal').should('be.visible');
        cy.get('#Input_UsernameVal').type('warruda@PT');
        cy.get('#Input_PasswordVal').type('Ablewise.2024!');
        cy.get('#b6-Button').click();
        cy.get('[class*="link-container"]').eq(1).click();
        cy.wait(2000);
        cy.get('[id*="ITIN_Input"]').type(nifAleatorio);
        cy.get('[id*="CreateNewEntityBtn"]').click();
        cy.wait(4000);
        // ****** 2- COMEÇA A PREENCHER TODOS OS FORMULÁRIOS
              cy.get('[id*="EntityIsValidCB"]').click();  // Clica no checkbox
                cy.get('[id*="EntityIsValidCB"]').should('be.checked');// Verifica se o checkbox está marcado
        // ****** 3 - começa a preencher a primeira sessão (Identification)
              cy.get('select[id*="Dropdown_TitleId"]').as('dropdown');
        cy.get('@dropdown').select('PROFESSORA');
      // Valores: DOUTOR DOUTORA PROFESSOR PROFESSORA SENHOR SENHORA
      cy.get('[id*="Input_Name"]').type('Cypress'+ firstName);
      cy.get('[id*="Input_LastName"]').type(lastName);
      cy.get('select[id*="Dropdown_Gender"]').select('Male');
      //  Valores: 0 Female 1 Male
      cy.get('select[id*="Dropdown_EstadoCivil"]').as('dropdown');
      cy.get('@dropdown').select('Solteiro');
      //  Valores: 0 Casado 1 Solteiro
      cy.get('[id*="Input_BirthDate"]').type('1996-05-20');
      cy.get('select[id*="Dropdown_Nationality"]').as('dropdown');
      cy.get('@dropdown').select('Portugal');
      cy.get('[id*="Input_NaturalnessLocal"]').type('Lisboa');
              cy.get('[id*="Input_IdentificationNumber"]').type(nifAleatorio);
              cy.get('[id*="Input_IdentificationValidateDate"]').type('2027-05-20');
              cy.get('[id*="Input_ChildrenNumber"]').type('1');
              cy.get('[id*="Input_DependentsNumber"]').type('0');
              cy.get('[id*="Input_Email"]').type('Teste@gmail.com');
              cy.get('[id*="Input_Telemovel"]').type('914980545');
              cy.get('[id*="Input_Id_TelefoneCasa"]').type('210340160');
              cy.get('[id*="Input_TelefoneEmprego"]').type('216321456');
              // Primeiro save & continue
              cy.get('[class*="btn btn-primary custom-btn ThemeGrid_MarginGutter"]').eq(0).click();
              cy.wait(1000); 
              // ****** 3 - começa a preencher a Segunda sessão (Address)

        // Checkbox Morada fiscal
        cy.get('[id*="Checkbox1"]').click();
      cy.get('[id*="MoradaLinha1Input"]').type('avenida boa cruz');
      cy.get('[id*="MoradaLinha2Input"]').type('20');
      cy.get('[id*="CodigoPostalInput"]').eq(0).type('1250');
      cy.get('[id*="SubCodigoPostalInput"]').eq(0).type('728');
      cy.get('[id*="LocalidadeInput"]').type('barreiro');
      // Segundo save & continue
      cy.get('[class*="btn btn-primary custom-btn ThemeGrid_MarginGutter"]').eq(1).click();
      cy.wait(1000); // Aguardar antes de passar para o próximo formulário
      const iban = gerarIBANPortugal();
      cy.log('IBAN Gerado: ' + iban);
 // ****** 4 - começa a preencher a terceira sessão (Financial)
//Habitação
cy.get('select[id*="HouseStatusDropdown"]').as('dropdown');
cy.get('@dropdown').select('PROPRIA COM ENCARGOS');
// Valores: 0 ARRENDADA, 1 EMPRESA, 2 Neutro, 3 Outro, 4 PROPRIA COM ENCARGOS, 5 Propria sem encargos, 6 Sem resposta, 7 VIVE COM FAMILIARES
cy.get('[id*="AddressDateInput"]').type('2010-05-10');
//Dados profissinais
cy.get('select[id*="ProfessionDropdown"]').as('dropdown');
cy.get('@dropdown').select('Advogado');
// Valores: 0 Advogado, 1 AGENTE PSP / GNR, 2 Agricultor proprietario, 3 AGRICULTOR RENDEIRO, 4 ARQUITETO / CONSULTOR, 5 Artista, 6 Assistente Social, 7 AUXILIAR DE AÇÃO MÉDICA. ETC...
cy.get('select[id*="ContractTypeDropdown"]').as('dropdown');
cy.get('@dropdown').select('EFECTIVO');
// Valores: 0 A COMISSAO, 1 A PRAZO, 2 CONTA PROPRIA, 3 EFECTIVO, 4 REFORMADO/DOMESTICA, 5 TEMPORARIO EVENTUAL
cy.get('[id*="CompanyNameInput"]').type("Google");
cy.get('[id*="CompanyAddressInput"]').type("Google");
cy.get('[id*="DateActualBusinessInput"]').type("2024-05-01");
cy.get('[id*="TelefoneEmpregoInput"]').type("210340502");
cy.get('[id*="TelemovelEmpregoInput"]').type("910420850");
//Rendimentos
cy.get('[id*="MonthlyLiquidSalaryInput"]').type("1850");
cy.get('[id*="IncomeNotProvenInput"]').type("1000");
cy.get('[id*="PensionInput"]').type("300");
//Encargos
cy.get('[id*="HouseRentExpensesInput"]').type("700");
cy.get('[id*="CarExpensesInput"]').type("150");
cy.get('[id*="OtherExpensesInput"]').type("400");
//Dados bancários
cy.get('[id*="IBAN_Input"]').type(iban);
cy.get('[id*="BankSwiftInput"]').type("CGDIPTPL");
cy.get('select[id*="BankDropdown"]').as('dropdown');
cy.get('@dropdown').select('BANCO CAIXA GERAL, S.A.');
// Valores: 0 AHORRO CORPORACION FINANCIERA, S.A., SOCIEDAD DE VALORES, 1 ARESBANK, S.A., 2 BANCA MARCH, S.A., 3 BANCA PUEYO, S.A., 4 BANCO ALCALA, S.A., 5 BANCO BILBAO VIZCAYA ARGENTARIA, S.A., 6 BANCO BPI, S.A., SUCURSAL EN ESPAÑA., 7 BANCO CAIXA GERAL, S.A. Etc...
cy.get('[id*="BankDateInput"]').type("2020-05-01");
//terceiro  save
cy.get('[class*="btn btn-primary custom-btn ThemeGrid_MarginGutter"]').eq(2).click();
//quarto e ultimo save da pagina que aparece
cy.get('[class*="btn btn-primary custom-btn ThemeGrid_MarginGutter"]').eq(3).click();
cy.wait(5000);
// ****** 5 - Acessa originations para criar a proposta com o mesmo NIF anterior.
cy.visit('https://acs-dev.outsystemscloud.com/Originations_R/Login')
                  cy.get('#Input_UsernameVal').should('be.visible');
        cy.get('#Input_UsernameVal').type('warruda@PT');
        cy.get('#Input_PasswordVal').type('Ablewise.2024!');
        cy.get('#b6-Button').click();
         // expande e clica no menu new proposal
        cy.get('.menu-icon').should('be.visible');
        cy.get('.menu-icon').click();
  cy.get('.margin-top-m:nth-child(2)').click();
  // seleciona a opçao desejada do product group e clica no botao start new proposal
cy.get('[id*="ProductGroupDropdown-container"]').should('be.visible');
cy.get('select[id*="ProductGroupDropdown"]').as('dropdown');
cy.get('@dropdown').select('Crédito Clássico');
// Valores: 0	Cartão, 1	Crédito, 2	Crédito Clássico, 3	Cartão, 4	CCL, 5	Multiproduto, 6	PPR
// cria uma new proposal
cy.get('[id*="StartNewProposalBtn"]').click();
cy.wait(3000);
//adiciona o mesmo nif de todo processo anterior
cy.get('[id*="AddHolderLink"]').click();
     cy.get('[id*="ITIN_Input"]').click().type(nifAleatorio);
     cy.get('[id*="AddBtn"]').click();
     cy.wait(3000);
     //dados já preenchidos, agora só clicar em save
     cy.get('[class*="btn btn-primary custom-btn ThemeGrid_MarginGutter"]').click();
     
    });
});