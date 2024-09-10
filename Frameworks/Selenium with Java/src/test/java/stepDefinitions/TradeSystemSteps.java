package stepDefinitions;

import Utils.RestAPIClient;
import Utils.driverManager;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.WebDriver;
import pages.TradeSystemPage;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TradeSystemSteps {

    WebDriver driver = driverManager.getDriver();
    TradeSystemPage tradePage;

    @Given("the user navigates to the {string} page")
    public void theUserNavigatesToTheBranchPage(String branch) {
        tradePage = new TradeSystemPage(driver);
        tradePage.goToBranch(branch);
    }

    @When("the user inputs {string} into the system")
    public void theUserInputsDataIntoTheSystem(String data) {
        tradePage.inputData(data);
        tradePage.submitForm();
    }

    @Then("the system calculates {string}")
    public void theSystemCalculatesExpectedOutput(String expectedOutput) {
        String actualOutput = tradePage.getCalculatedOutput();
        assertEquals(expectedOutput, actualOutput, "The calculation output is incorrect!");
    }

    @Then("the calculated data is sent to the downstream system successfully")
    public void theCalculatedDataIsSentToTheDownstreamSystemSuccessfully() {
        boolean isSent = RestAPIClient.validateDataTransmission();
        assertEquals(true, isSent, "Data was not sent to the downstream system!");
    }
}
