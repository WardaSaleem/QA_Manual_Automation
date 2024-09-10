//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package runner;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import io.cucumber.testng.AbstractTestNGCucumberTests;
import org.junit.AfterClass;
import org.junit.runner.RunWith;
import org.testng.annotations.DataProvider;

@RunWith(Cucumber.class)
@CucumberOptions(
    features = {"src/test/java/feature/tradeSystem.feature"},
    glue = {"src/test/java/stepDefinitions/TradeSytemSteps.java"},
    plugin = {"pretty", "html:target/cucumber-reports"},
    monochrome = true
)
public class TestRunner extends AbstractTestNGCucumberTests {

    @Override
    @DataProvider(parallel = true) // Enables parallel execution
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
