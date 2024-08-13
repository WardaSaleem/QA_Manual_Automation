# Cypress Testing Project

This project is set up to use Cypress for end-to-end testing of the 'EuroWings' application. Follow the steps below to set up the environment and run tests locally.

## Project Structure
Cypress/
├── Downloads/
├── e2e/
│ └── flightsStatus.cy.js
├── fixtures/
│ └── flight.json
  
     
├── support/
│ ├── page_objects
    |__flightStatusPage.js
│ ├── commands.js
│ ├── e2e.js
│ │ 
├── videos/ # Video recordings of the test case
    |__flightsStatus.cy.js.mp4
└── cypress.config.js # Cypress configuration file


## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm comes with Node.js. Ensure you have the latest version by running `npm install -g npm`.

## Setup Instructions

1. **Initialize the Project**:
    ```sh
    npm init -y
    ```

2. **Install Dependencies**:
    ```sh
    npm install cypress --save-dev
    ```

4. **Open Cypress**:
    ```sh
    npx cypress open
    ```
    This command will open the Cypress Test Runner and automatically create the `cypress` folder and `cypress.json` configuration file if they don't already exist.


## Writing Tests

### Test Files

- **End-to-End Tests**: Located in `Cypress/e2e/flightsStatus.cy.js`
- **Fixtures**: Located in `Cypress/fixtures/flights.json`
- **Support Files**: Custom commands and page objects are located in `Cypress/support/`.


###Running Tests Locally


1. **Run Cypress in Interactive Mode**:
   
   npx cypress open
    

2. **Run Cypress in Headless Mode:**:
    
    npx cypress run
    


## Troubleshooting
If you encounter issues:

- Check the video recordings in the cypress/videos folder.

For further assistance, consult the Cypress documentation.

