import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {
    page,
    browser,
    newRequestPage
  } from "../../hooks/hook";
  

  Given('I am on the Weight Loss Eligibility Intake Form page', async function() {
    // Navigate to the Weight Loss form page
   
    await newRequestPage.selectWeightLossForm();
  });
When('I fill in the form with the following data:', async function(dataTable) {
  const data = dataTable.rowsHash(); // Convert data table to a JS object
  const formData = {
    gender: data.gender,
    age: data.age,
    height: data.height,
    weight: data.weight,
    conditions: data.conditions.split(',').map(Number),
    moreConditions: data.moreConditions.split(',').map(Number),
    weightLossGoal: data.weightLossGoal,
    pastInitiatives: data.pastInitiatives.split(',').map(Number),
    email: data.email,
    phoneNumber: data.phoneNumber,
    address: data.address,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    translationOption: data.translationOption,
    filePath: `fixtures/${data.filePath}`
  };
  
  await newRequestPage.fillForm(formData);
});

When('I submit the form', async function() {
  await newRequestPage.submitButtonClickable();
});

Then('I should see a success message', async function() {
  await newRequestPage.verifySuccessMessage();
});

Then('the form submission date and time should be stored', async function() {
 // const storedDateTime = await newRequestPage.getStoredDateTime();
 // expect(storedDateTime).not.toBeNull();
 // console.log('Stored Date and Time from Form Submission:', storedDateTime);
});
