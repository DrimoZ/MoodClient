/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable<Subject = any> {
    clearInputsPassword():Chainable<void>;

    connect(login: string): Cypress.Chainable<void>;
    disconnect(): Chainable<void>;
    parameters(): Chainable<void>;
    Password(password:string): Chainable<void>;
    deleteMyAccount(): Chainable<void>;
    modifyPassword(oldPassword:string, newPassword:string): Chainable<void>;
  }
}

Cypress.Commands.add(`connect`, (login, password = "Strong#1") => {
  cy.fixture('infos').then((infos) => {
    cy.visit("http://localhost:4200/")
    cy.get('#Login').type(login)
    cy.get('#Password').type(password +'{enter}')
  });
});

Cypress.Commands.add(`disconnect`, () => {
  cy.get('#Parameters').click()
  cy.contains('Disconnect').click()
  cy.wait(1000)
});

Cypress.Commands.add(`parameters`, () => {
  cy.get('#Parameters').click()
  cy.get('#GoToParameters').click()
});

Cypress.Commands.add(`Password`, (password) => {
  cy.get('#Password').clear()
  cy.get('#Password').type(password)
});

Cypress.Commands.add(`deleteMyAccount`, () => {
  cy.parameters()
  cy.get('#BtnDeleteAccount').click()
  cy.contains('Submit').click()
});

Cypress.Commands.add(`modifyPassword`, (oldPassword, newPassword) => {
  cy.get('#OldPassword').type(oldPassword)
  cy.get('#NewPassword').type(newPassword)
  cy.get('#PasswordConfirmation').type(newPassword+'{enter}')
});

Cypress.Commands.add(`clearInputsPassword`, () => {
  cy.get('#OldPassword').clear()
  cy.get('#NewPassword').clear()
  cy.get('#PasswordConfirmation').clear()
});


