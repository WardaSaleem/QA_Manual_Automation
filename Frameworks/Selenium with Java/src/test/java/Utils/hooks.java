package Utils;

import com.aventstack.extentreports.ExtentTest;
import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.java.Scenario;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.text.SimpleDateFormat;
import java.util.Date;


public class hooks {

    WebDriver driver;

    @Before
    public void setUp() {
        // Initialize the WebDriver before each scenario
        driver = driverManager.getDriver();

    }
    @Before
    public void beforeScenario(Scenario scenario) {
        ExtentTest test = ExtentReportManager.getExtentReports().createTest(scenario.getName());
        ExtentReportManager.setTest(test);
    }
    @After
    public void takeScreenshot(Scenario scenario) {
        if (scenario.isFailed()) {
            // Take screenshot
            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);

            // Format timestamp for file name
            String timestamp = new SimpleDateFormat("yyyy_MM_dd__hh_mm_ss").format(new Date());

            try {
                // Define screenshot path
                String screenshotPath = "D://Cucumber7.xTestNGLatestPOC-master//Task1//src//test//java//screenshots" + scenario.getName() + "_" + timestamp + ".png";
                Files.copy(screenshot.toPath(), Paths.get(screenshotPath));
                System.out.println("Screenshot saved at: " + screenshotPath);

                // Attach screenshot to Cucumber report
                byte[] fileContent = Files.readAllBytes(screenshot.toPath());
                scenario.attach(fileContent, "image/png", "Screenshot");

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    @After
    public void tearDown() {
        // Close the WebDriver after each scenario
        driverManager.closeDriver();

    }

    @After
    public void afterScenario(Scenario scenario) throws IOException {
        if (scenario.isFailed()) {
            // Capture screenshot on failure
            byte[] screenshot = ((TakesScreenshot) driverManager.getDriver()).getScreenshotAs(OutputType.BYTES);
            scenario.attach(screenshot, "image/png", "Screenshot");

            // Add screenshot to  Report
            ExtentReportManager.getTest().fail(scenario.getName() + " failed")
                    .addScreenCaptureFromPath("D://Cucumber7.xTestNGLatestPOC-master//Task1//src//test//java//screenshots"); // Update this if needed
        } else {
            ExtentReportManager.getTest().pass(scenario.getName() + " passed");
        }
        ExtentReportManager.flush();
    }

}
