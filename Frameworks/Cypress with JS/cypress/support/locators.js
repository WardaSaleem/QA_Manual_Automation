// cypress/support/locators.js

export const locators = {
  genderField: '.q-field__control',
  genderOption: 'div.q-item',
  ageField: 'input[class="q-field__native q-placeholder"]',
  heightField: '.q-field__control',
  weightField: '.q-field__control',
  conditionCheckbox: 'div.q-checkbox__label.q-anchor--skip',
  conditionOption: ':nth-child(3) > .q-checkbox > .q-checkbox__inner',
  weightLossGoalsField: '.q-field__control',
  weightLossGoalsOption: 'div.q-item',
  pastInitiativesOption: ':nth-child(1) > .q-checkbox > .q-checkbox__inner',
  emailField: '.q-field__control',
  phoneNumberField: '.q-field__control',
  addressField: '.q-field__control',
  cityField: '.q-field__control',
  stateField: '.q-field__control',
  zipCodeField: '.q-field__control',
  translationServices: ':nth-child(19) > .q-stepper__tab',
  translationOption: '[aria-label="No"] > .q-radio__inner',
  finalContinueButton: '.q-stepper__nav > .q-btn--unelevated > .q-btn__content > .block',
  fileInput: 'input[type="file"]',
};
