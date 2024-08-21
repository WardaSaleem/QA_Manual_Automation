import { expect,Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import { fixture } from "../hooks/pageFixture";
import {
  format
} from 'date-fns';   //npm install date-fns

  


export default class NewRequestPage{
    
    private base: PlaywrightWrapper;

    constructor(private page:Page){
    this.base=new PlaywrightWrapper(page)
    fixture.page=page;
    }

    private locators = {
        formTitle: '//div[contains(text(), "chris chiasson was here")]',
        genderField: '.q-field__control',
        genderOption: 'div.q-item',
        continueButton: 'span.block:has-text("Continue")',
        ageField: 'input.q-field__native.q-placeholder',
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
      };
    
      async selectWeightLossForm() {
        await this.page.click(this.locators.formTitle);
      }
    
      async fillForm(data: any) {
        // Select gender at birth
        await this.page.click(this.locators.genderField);
        await this.page.click(`${this.locators.genderOption}:has-text("${data.gender}")`);
        await this.clickContinue();
    
        // Enter age
        await this.page.fill(this.locators.ageField, data.age.toString());
        await this.clickContinue();
    
        // Enter height
        await this.page.fill(this.locators.heightField, data.height);
        await this.clickContinue();
    
        // Enter weight
        await this.page.fill(this.locators.weightField, data.weight);
        await this.clickContinue();
    
        // Select conditions
        for (const index of data.conditions) {
          await this.page.click(`${this.locators.conditionCheckbox}:nth-child(${index + 1})`);
        }
        await this.clickContinue();
    
        // Select more conditions
        for (const index of data.moreConditions) {
          await this.page.click(`${this.locators.conditionOption}:nth-child(${index + 1})`);
        }
        await this.clickContinue();
    
        // Select weight loss goals
        await this.page.click(this.locators.weightLossGoalsField);
        await this.page.click(`${this.locators.weightLossGoalsOption}:has-text("${data.weightLossGoal}")`);
        await this.clickContinue();
    
        // Select past weight loss initiatives
        for (const index of data.pastInitiatives) {
          await this.page.click(`${this.locators.conditionOption}:nth-child(${index + 1})`);
        }
        await this.clickContinue();
    
        // Date of Birth selection
        await this.page.click('.q-date__calendar button:has-text("2024")');
        await this.page.click('.q-date__view > :nth-child(1) > .q-btn > .q-btn__content > .q-icon');
        await this.page.click('.q-date__view > :nth-child(1) > .q-btn > .q-btn__content > .q-icon');
        await this.page.click('.q-date__years-content > :nth-child(17)');
        await this.page.click('.q-date__calendar button:has-text("21")');
        await this.clickContinue();
    
        // Enter email address
        await this.page.click(':nth-child(13) > .q-stepper__tab');
        await this.page.fill(this.locators.emailField, data.email);
        await this.clickContinue();
    
        // Enter phone number
        await this.page.fill(this.locators.phoneNumberField, data.phoneNumber);
        await this.clickContinue();
    
        // Enter shipping address
        await this.page.fill(this.locators.addressField, data.address);
        await this.clickContinue();
    
        // Enter city
        await this.page.fill(this.locators.cityField, data.city);
        await this.clickContinue();
    
        // Enter state
        await this.page.fill(this.locators.stateField, data.state);
        await this.clickContinue();
    
        // Enter ZIP code
        await this.page.fill(this.locators.zipCodeField, data.zipCode);
        await this.clickContinue();
    
        // Select translation services option
        await this.page.click(this.locators.translationServices);
        await this.page.click(this.locators.translationOption);
        await this.page.click(this.locators.finalContinueButton);
    
        // Upload a file
        await this.page.setInputFiles(this.locators.fileInput, data.filePath);
        await this.clickContinue();
      }
    
      async clickContinue() {
        await this.page.click(this.locators.continueButton);
      }
    
      async submitButtonClickable() {
        await this.page.waitForSelector(this.locators.submitButt, {
          state: 'visible'
        });
        await this.page.waitForSelector(this.locators.submitButt, { state: 'visible' });
//await this.page.waitForFunction(
 // (selector) => {
    //const button = document.querySelector(selector);
  //  return button && !button.hasAttribute('disabled');
//  },
 // this.locators.submitButt
//);
        await this.page.click(this.locators.submitButt);
    
        await this.page.waitForSelector(this.locators.confirmationMessage, {
          state: 'visible'
        });
        await this.page.click(this.locators.submitFormDialogSubmitButton);
      }
    
      async verifySuccessMessage() {
        // Wait for the confirmation message element to be visible
        await this.page.waitForSelector(this.locators.confirmationMessage, {
          state: 'visible',
        });
      
        // Verify the text content of the confirmation message
        const confirmationMessageText = await this.page.textContent(this.locators.confirmationMessage);
        
        if (confirmationMessageText?.includes('Thank you for your submission. We have sent you a confirmation email for your records.')) {
          console.log('Success message verified');
        } else {
          throw new Error('Success message not found or does not match expected text');
        }
      
        // Wait for the Close button to be visible
        await this.page.waitForSelector(this.locators.closeButton, { state: 'visible' });
    
        // Capture the current date and time
        const currentDateTime = new Date().toISOString();
       // await this.page.evaluate((currentDateTime) => {
         // localStorage.setItem('closeButtonClickDateTime', currentDateTime);
      //  }, currentDateTime);
    
        // Click the Close button
        //await this.page.click(`${this.locators.closeButton}:has-text("Close")`);
     // }
    
      /*async getStoredDateTime(): Promise<string | null> {
       const dateTimeString = await this.page.evaluate(() => localStorage.getItem('closeButtonClickDateTime'));
        if (dateTimeString) {
          const date = new Date(dateTimeString);
          let formattedDate = format(date, "MMM d, yyyy").toLowerCase();
          formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
          return formattedDate;
        } else {
          return null;
        }
      }
    }
    */
      }
      }
    