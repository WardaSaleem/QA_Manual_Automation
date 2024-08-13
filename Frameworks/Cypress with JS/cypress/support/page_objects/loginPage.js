/// <reference types="cypress" />
class LoginPage {
  visit() {
    cy.visit('https://careglp-staging.carevalidate.com/');
  }

  enterEmail(email) {
    cy.get('input[name="email"]').type(email);
  }

  enterPassword(password) {
    cy.get('[data-testid="login-with-password"]').click();
    cy.get('input[name="password"]').type(password);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }
}

export const loginPage = new LoginPage();