using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;
using System;
using System.Threading;

namespace AmazonShopping.Utils
{
    public static class SeleniumHelper
    {
        public static void HandleRecaptcha(IWebDriver driver, WebDriverWait wait, string url)
        {
            try
            {
                // Navigate to the URL
                driver.Navigate().GoToUrl(url);

                // Wait for reCAPTCHA iframe to be present
                wait.Until(ExpectedConditions.FrameToBeAvailableAndSwitchToIt("iframe[src^='https://www.google.com/recaptcha']"));

                // Wait for checkbox to be clickable and click it
                IWebElement recaptchaCheckbox = wait.Until(ExpectedConditions.ElementToBeClickable(By.CssSelector("div.recaptcha-checkbox-checkmark")));
                recaptchaCheckbox.Click();

                // Wait for some time for the checkbox to be checked
                Thread.Sleep(2000); // Adjust this delay as needed

                // Switch back to default content
                driver.SwitchTo().DefaultContent();

                
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error handling reCAPTCHA: " + ex.Message);
            }
        }
    }
}
