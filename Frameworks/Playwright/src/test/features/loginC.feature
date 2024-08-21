Feature: As a user I want login the Application 

    Background:
        Given User is on Care validate page

    @test 
    Scenario Outline: Valid Login attempt
        When user enters valid username "<email>" and password "<password>"
       
        Examples:
            | email | password |
            | qa+employee@carevalidate.com | bLPgk5tr7D3ZqpXvV@aNKz |
           