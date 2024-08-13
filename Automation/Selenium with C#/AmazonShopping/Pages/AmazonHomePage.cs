using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestPlatform.ObjectModel;
using NUnit.Framework;

namespace AmazonShopping.Pages
{
    public class AmazonHomePage
    {
        private IWebDriver driver;
        private WebDriverWait wait;

        private string searchInputXPath = "//*[@id='twotabsearchtextbox']";
        private string firstResultXPath = "//div[@class='a-section a-spacing-none puis-padding-right-small s-title-instructions-style']//h2/a/span[1]";
        private string priceElementXPath = "//span[@class='a-price']//span[@class='a-price-whole']";
        private string addToCartButtonName = "submit.add-to-cart";
        private string itemAddedPopupXPath = "//h1[contains(text(), 'Added to Cart')]";

        public AmazonHomePage(IWebDriver driver)
        {
            this.driver = driver;
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        }

        public void NavigateToHomePage()
        {
            driver.Navigate().GoToUrl("https://www.amazon.com/");
        }

        public void SearchForItem(string itemName)
        {
            IWebElement searchInput = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementIsVisible(By.XPath(searchInputXPath)));
            searchInput.SendKeys(itemName);
            searchInput.SendKeys(Keys.Enter);
        }

        public (string title, string price) AddItemToCart()
        {
            IWebElement firstResult = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(By.XPath(firstResultXPath)));
            string title = firstResult.Text;

  
            if (title.Length > 150)
            {
                title = title.Substring(0, 150);
            }

            IWebElement priceElement = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementIsVisible(By.XPath(priceElementXPath)));
            string price = priceElement.Text;        
            price = price.Replace("$", "").Replace(",", "").Trim();
            
            firstResult.Click();

            IWebElement addToCartButton = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(By.Name(addToCartButtonName)));
            addToCartButton.Click();
            IWebElement itemAddedPopup = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementIsVisible(By.XPath(itemAddedPopupXPath)));
            string actualText = itemAddedPopup.Text;
            Assert.AreEqual(actualText, "Added to Cart");

            return (title, price);
        }
    }
}

