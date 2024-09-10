package pages;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class TradeSystemPage {
    WebDriver driver;

    // Locators
    By dataInputField = By.xpath("(//input[@value='0'])[2]");
    By dataInputField2 = By.xpath("(//input[@value='0'])[4]");
    By calculationOutputField = By.xpath("//p/span[@class='right']"); // By XPath
    By submitButton = By.xpath("(//a[@class='calcul_btn'][normalize-space()='Calculate'])[1]");

    public TradeSystemPage(WebDriver driver) {
        this.driver = driver;
    }

    // Navigate to the appropriate branch page
    public void goToBranch(String branch) {
        driver.get("https://www.qamentor.com/package-prices/qa-calculator/" + branch);
    }

    // Input data
    public void inputData(String data) {
        driver.findElement(dataInputField).clear();
        driver.findElement(dataInputField).sendKeys(data);
        driver.findElement(dataInputField2).sendKeys("23");

    }

    // Submission
    public void submitForm() {
        driver.findElement(submitButton).click();
    }


    public String getCalculatedOutput() {
        return driver.findElement(calculationOutputField).getText();
    }
}
