import {
  loginPage
} from '../support/page_objects/loginPage';
import {
  newRequestPage
} from '../support/page_objects/newRequestPage';
import {
  myRequestPage
} from '../support/page_objects/myRequest';


describe('Weight Loss Form Tests', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Submit a Weight Loss Eligibility Intake Form and confirm submission', () => {

    newRequestPage.selectWeightLossForm();

    const formData = {
      gender: 'Female',
      age: '23',
      height: '5',
      weight: '54',
      conditions: [1, 3],
      moreConditions: [2, 6],
      weightLossGoal: 'Lose over 50 for good',
      pastInitiatives: [0, 1],
      email: 'test@gmail.com',
      phoneNumber: '234567898',
      address: 'test address',
      city: 'test',
      state: 'test',
      zipCode: '54323',
      translationOption: 'No',
      filePath: 'cypress\\fixtures\\TestAttachment.png' 
      
    };

    newRequestPage.fillForm(formData);
    newRequestPage.submitbuttonClickable();
    newRequestPage.verifySuccessMessage();
    // Retrieve stored date and time and navigate to the next page
    let storedDateTime = null;
    newRequestPage.getStoredDateTime().then((dateTime) => {
      expect(dateTime).to.not.be.null;
      cy.log('Stored Date and Time from Form Submission:', dateTime);
      storedDateTime = dateTime; // Store it for later use
    }).then(() => {
      //cy.wait(3000);

      myRequestPage.clickOnMyRequestPage();
      cy.url().should('include', '/requests');
      cy.contains('Request').should('be.visible');

      myRequestPage.verifyFormSubmission();

      //Grid Value from My Request page
      cy.get('@storedValue').then((gridValue) => {
        cy.log('Stored Value from Grid:', gridValue);


        // Perform the comparison
        expect(gridValue).to.eq(storedDateTime);
      });
    });
    myRequestPage.verifyCaseStatusIsSubmitted();
  });
});
afterEach(() => {

  cy.log('Test completed, performing cleanup actions if necessary');
  cy.contains('span.block', 'QA employee (QA Interview)').click();
  cy.get('[data-testid="logout"]').click();


});