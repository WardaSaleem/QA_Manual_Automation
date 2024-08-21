
Feature: Weight Loss Eligibility Intake Form Submission

Background:
		   Given User is on Care validate page
		And user enters valid email "qa+employee@carevalidate.com" and password "bLPgk5tr7D3ZqpXvV@aNKz"
 
@test
Scenario: Submit a Weight Loss Eligibility Intake Form and confirm submission
    Given I am on the Weight Loss Eligibility Intake Form page
    When I fill in the form with the following data:
      | gender          | Female                        |
      | age             | 23                            |
      | height          | 5                             |
      | weight          | 54                            |
      | conditions      | 1,3                           |
      | moreConditions  | 2,6                           |
      | weightLossGoal  | Lose over 50 for good         |
      | pastInitiatives | 0,1                           |
      | email           | test@gmail.com                |
      | phoneNumber     | 234567898                     |
      | address         | test address                  |
      | city            | test                          |
      | state           | test                          |
      | zipCode         | 54323                         |
      | translationOption | No                          |
      | filePath        | TestAttachment.png            |
    When I submit the form
    Then I should see a success message
    And the form submission date and time should be stored