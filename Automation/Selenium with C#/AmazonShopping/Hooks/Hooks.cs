using AmazonShopping.Utils;
using BoDi;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using TechTalk.SpecFlow;

namespace AmazonShopping.Hooks
{
    [Binding]
    public sealed class Hooks
    {
        private readonly IObjectContainer _container;

        public Hooks(IObjectContainer container)
        {
            _container = container;
        }

        [BeforeScenario(Order = 1)]
        public void HandleRecaptchaBeforeScenario()
        {
            ChromeOptions options = new ChromeOptions();
            options.AddArgument("--start-maximized");

            IWebDriver driver = new ChromeDriver(options);
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));

            try
            {
                // Handle reCAPTCHA
                string amazonUrl = "https://www.amazon.com/";
                SeleniumHelper.HandleRecaptcha(driver, wait, amazonUrl);

                // Register WebDriver instance
                _container.RegisterInstanceAs<IWebDriver>(driver);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error handling reCAPTCHA: " + ex.Message);
                driver.Quit();
            }
        }

        [AfterScenario]
        public void CleanupWebDriver()
        {
            var driver = _container.Resolve<IWebDriver>();
            if (driver != null)
            {
                driver.Quit();
            }
        }
    }
}
