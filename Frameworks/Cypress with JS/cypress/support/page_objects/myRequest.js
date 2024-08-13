/// <reference types="cypress" />

class MyRequestPage {

  menuButtonLocator = '.q-toolbar > .q-btn--round > .q-btn__content > .q-icon';
  myRequestPageButtonLocator = '.text-dark > .q-item__section > .q-item__label';
  dateGridItemLocator = '.bg-grey-1 > :nth-child(1) > .text-weight-bold';
  gridTextLocator = ':nth-child(1) > [data-v-62a47662=""][style="min-width: 110px;"] > .row > .text-black';
  openButton = ':nth-child(1) > .text-positive'

  clickOnMyRequestPage() {
    cy.get(this.menuButtonLocator).click(); // Click on the menu button
    cy.get(this.myRequestPageButtonLocator).click(); // Click on My Request page
  }

  verifyFormSubmission() {
    // Click to the grid value for Desc
    cy.get(this.dateGridItemLocator).click();
    cy.get(this.dateGridItemLocator).click();

    // Extract and format the grid value
    cy.get(this.gridTextLocator)
      .invoke('text')
      .then((text) => {
        const gridValue = text.trim();

        // Regex to match the date format 'Aug 6, 2024'
        const dateRegex = /^(.*?\d{1,2}, \d{4})/;
        const matches = dateRegex.exec(gridValue);

        // Format date if matches found
        let formattedDate = '';
        if (matches) {
          formattedDate = matches[1];
        }

        cy.log('Formatted Date from Grid:', formattedDate);
        cy.wrap(formattedDate).as('storedValue');
      });


  }
  verifyCaseStatusIsSubmitted() {
    cy.get(this.openButton).click()
    cy.get('.q-stepper__tab--active > .q-stepper__label > .q-stepper__title').invoke('text').then((text) => {
      expect(text.trim()).to.eq('Submitted'); // Log the actual text found
    });
  }
}

export const myRequestPage = new MyRequestPage();