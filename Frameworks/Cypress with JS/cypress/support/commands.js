///<reference types ="cypress"/>
///<reference types ="cypress-xpath"/>

import 'cypress-file-upload';


// cypress/support/commands.js

// cypress/support/commands.js

import { locators } from '../support/locators';
import {fixture} from '../fixtures/loginCredentials.json';


/// Command for login
Cypress.Commands.add('login', () => {
  cy.fixture('loginCredentials').then((credentials) => {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new Error('Invalid or missing login credentials');
    }
    cy.visit('https://careglp-staging.carevalidate.com/');
    cy.get('input[name="email"]').type(credentials.email);
    cy.get('[data-testid="login-with-password"]').click();
    cy.get('input[name="password"]').type(credentials.password);
    cy.get('button[type="submit"]').click();
  });
});


/// Command for FillForm
Cypress.Commands.add('fillWeightLossForm', (data) => {
  if (!data) {
    throw new Error('No data provided for fillWeightLossForm');
  }

  // Select gender at birth
  cy.get(locators.genderField).click();
  cy.contains(locators.genderOption, data.gender).click();
  cy.contains('span.block', 'Continue').click(); 

  // Enter age
  cy.get(locators.ageField).type(data.age);
  cy.contains('span.block', 'Continue').click(); 

  // Enter height
  cy.get(locators.heightField).type(data.height);
  cy.contains('span.block', 'Continue').click(); 

  // Enter weight
  cy.get(locators.weightField).type(data.weight);
  cy.contains('span.block', 'Continue').click(); 

  // Select conditions
  data.conditions.forEach(index => {
    cy.get(locators.conditionCheckbox).eq(index).click();
  });
  cy.contains('span.block', 'Continue').click(); 

  // Select more conditions
  data.moreConditions.forEach(index => {
    cy.get(locators.conditionOption).eq(index).click();
  });
  cy.contains('span.block', 'Continue').click(); 

  // Select weight loss goals
  cy.get(locators.weightLossGoalsField).click();
  cy.contains(locators.weightLossGoalsOption, data.weightLossGoal).click();
  cy.contains('span.block', 'Continue').click(); 

  // Select past weight loss initiatives
  data.pastInitiatives.forEach(index => {
    cy.get(locators.pastInitiativesOption).eq(index).click();
  });
  cy.contains('span.block', 'Continue').click(); 

  // Enter email address
  cy.get(locators.emailField).type(data.Email);
  cy.contains('span.block', 'Continue').click(); 

  // Enter phone number
  cy.get(locators.phoneNumberField).type(data.phoneNumber);
  cy.contains('span.block', 'Continue').click(); 

  // Enter shipping address
  cy.get(locators.addressField).type(data.address);
  cy.contains('span.block', 'Continue').click(); 

  // Enter city
  cy.get(locators.cityField).type(data.city);
  cy.contains('span.block', 'Continue').click(); 

  // Enter state
  cy.get(locators.stateField).type(data.state);
  cy.contains('span.block', 'Continue').click(); 

  // Enter ZIP code
  cy.get(locators.zipCodeField).type(data.zipCode);
  cy.contains('span.block', 'Continue').click(); 

  // Select translation services option
  cy.get(locators.translationServices).click();
  cy.contains('[aria-label="' + data.translationOption + '"] > .q-radio__inner').click();
  cy.get(locators.finalContinueButton).click();

  // Upload a file
  cy.get(locators.fileInput).should('exist').then(input => {
    cy.wrap(input).selectFile(data.filePath, { force: true });
  });
});
 // This is for the calling the FillForm Comaand
    /*
    cy.fixture('weightLossFormData').then((data) => {
     if (!data) {
      throw new Error('Invalid or missing form data');
    
    cy.fillWeightLossForm(data);
    });
    */

Cypress.Commands.add('clickContinue', () => {
  cy.contains('span.block', 'Continue')
    .should('be.visible')
    .and('not.be.disabled')
    .click();
});
    //Button is Clickable 
    Cypress.Commands.add('isClickable', (selector) => {
      cy.get(selector)
        .should('be.visible')
        .should('not.be.disabled')
        .then($el => {
          if ($el.is(':enabled')) {
            cy.wrap($el).click();
            cy.log('Element is clickable and clicked');
          } else {
            cy.log('Element is not clickable');
            throw new Error('Element is not clickable');
          }
        });
    });