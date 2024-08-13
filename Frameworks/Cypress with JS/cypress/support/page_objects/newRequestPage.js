import {
  format
} from 'date-fns';

class NewRequestPage {

  locators = {
    formTitle: 'Weight Loss Eligibility Intake Form',
    genderField: '.q-field__control',
    genderOption: 'div.q-item',
    continueButton: 'span.block:contains("Continue")',
    ageField: 'input[class="q-field__native q-placeholder"]',
    heightField: '.q-field__control',
    weightField: '.q-field__control',
    conditionCheckbox: 'div.q-checkbox__label.q-anchor--skip',
    conditionOption: '.q-checkbox > .q-checkbox__inner',
    weightLossGoalsField: '.q-field__control',
    weightLossGoalsOption: 'div.q-item',
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
    dateOfBirthStep: ':nth-child(12) > .q-stepper__tab > .q-stepper__label > .q-stepper__title',
    yearSelector: ':nth-child(5) > div > .q-btn > .q-btn__content > .block',
    yearChevron: ':nth-child(3) > .q-btn > .q-btn__content > .q-icon',
    dateButton: ':nth-child(15) > .q-btn > .q-btn__content > .block',
    submitButt: '[data-testid="submit-button"]',
    submitFormDialogSubmitButton: '[data-testid="submit-form-dialog-submit-button"]',
    confirmationMessage: 'div.q-card__section.q-card__section--vert',
    closeButton: 'span.block'
  }

  // Function to select the weight loss form
  selectWeightLossForm() {
    cy.contains(this.locators.formTitle).click();
  }

  // Function to fill the form
  fillForm(data) {

    // Select gender at birth
    cy.get(this.locators.genderField).click();
    cy.contains(this.locators.genderOption, data.gender).click();
    cy.clickContinue();

    // Enter age
    cy.get(this.locators.ageField).type(data.age);
    cy.clickContinue();

    // Enter height
    cy.get(this.locators.heightField).type(data.height);
    cy.clickContinue();

    // Enter weight
    cy.get(this.locators.weightField).type(data.weight);
    cy.clickContinue();

    // Select conditions
    data.conditions.forEach(index => {
      cy.get(this.locators.conditionCheckbox).eq(index).click();
    });
    cy.clickContinue();

    // Select more conditions
    data.moreConditions.forEach(index => {
      cy.get(this.locators.conditionOption).eq(index).click();
    });
    cy.clickContinue();

    // Select weight loss goals
    cy.get(this.locators.weightLossGoalsField).click();
    cy.contains(this.locators.weightLossGoalsOption, data.weightLossGoal).click();
    cy.clickContinue();

    // Select past weight loss initiatives
    data.pastInitiatives.forEach(index => {
      cy.get(this.locators.conditionOption).eq(index).click();
    });
    cy.clickContinue();


    // cy.get(':nth-child(12) > .q-stepper__tab').click()
    cy.get('.q-date__calendar')
      .find('button')
      .contains('2024') // Adjust to match the year displayed
      .click();
    cy.get('.q-date__view > :nth-child(1) > .q-btn > .q-btn__content > .q-icon')
      .click()
    cy.get('.q-date__view > :nth-child(1) > .q-btn > .q-btn__content > .q-icon')
      .click()
    cy.get('.q-date__years-content > :nth-child(17)')
      .click();

    // Select the month August

    cy.get('.q-date__calendar')
      .click()


    //Select the day 23
    cy.get('.q-date__calendar-days-container')
      .find('button')
      .contains('21')
      .click();
    cy.clickContinue();




    // Enter email address
    cy.get(':nth-child(13) > .q-stepper__tab').click()
    cy.get(this.locators.emailField).type(data.email);
    cy.clickContinue();

    // Enter phone number
    cy.get(this.locators.phoneNumberField).type(data.phoneNumber);
    cy.clickContinue();

    // Enter shipping address
    cy.get(this.locators.addressField).type(data.address);
    cy.clickContinue();

    // Enter city
    cy.get(this.locators.cityField).type(data.city);
    cy.clickContinue();

    // Enter state
    cy.get(this.locators.stateField).type(data.state);
    cy.clickContinue();

    // Enter ZIP code
    cy.get(this.locators.zipCodeField).type(data.zipCode);
    cy.clickContinue();

    // Select translation services option
    cy.get(this.locators.translationServices).click();
    cy.get(this.locators.translationOption).click();
    cy.get(this.locators.finalContinueButton).click();

    // Upload a file
    cy.get(this.locators.fileInput).should('exist').then(input => {
      cy.wrap(input).selectFile(data.filePath, {
        force: true
      });
      cy.clickContinue();

    });


  }
  submitbuttonClickable() {
    cy.get('[data-testid="submit-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.contains(this.locators.confirmationMessage, 'Are you sure you want to submit the form?')
      .should('be.visible');

    //cy.wait(3000);

    cy.isClickable(this.locators.submitFormDialogSubmitButton);

  }


  verifySuccessMessage() {
    // Verify the success message is visible
    cy.contains(this.locators.confirmationMessage, 'Thank you for your submission. We have sent you a confirmation email for your records.')
      .should('be.visible');

    cy.contains(this.locators.closeButton, 'Close').should('be.visible');

    // Capture the current date and time
    const currentDateTime = new Date().toISOString();

    // Store the date and time in local storage
    cy.window().then((window) => {
      window.localStorage.setItem('closeButtonClickDateTime', currentDateTime);
    });

    // Click the Close button
    cy.contains(this.locators.closeButton, 'Close').click();
  }

  // Method to get the stored date and time from local storage
  getStoredDateTime() {
    return cy.window().then((window) => {
      const dateTimeString = window.localStorage.getItem('closeButtonClickDateTime');
      if (dateTimeString) {
        const date = new Date(dateTimeString);

        // Format date as 'Aug 6, 2024' without the time
        let formattedDate = format(date, "MMM d, yyyy").toLowerCase();

        // Capitalize the first letter of the month
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        return formattedDate;
      } else {
        return null;
      }
    });
  }
}
export const newRequestPage = new NewRequestPage();