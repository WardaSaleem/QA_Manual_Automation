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

    public class AmazonCartPage
    {
        private  IWebDriver driver;
        private  WebDriverWait wait;

        private readonly By cartIconLocator = By.Id("nav-cart");
        private readonly By itemTitleLocator = By.CssSelector(".sc-product-title");
        private readonly By itemPriceLocator = By.CssSelector("div.sc-badge-price > div > div > span");

        public AmazonCartPage(IWebDriver driver)
        {
            this.driver = driver;
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        }

        public void NavigateToCart()
        {
            IWebElement cartIcon = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(cartIconLocator));
            cartIcon.Click();
        }

        public string GetItemTitle()
        {
            IWebElement itemTitleElement = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementIsVisible(itemTitleLocator));
            string itemTitleText = itemTitleElement.Text;

            if (itemTitleText.Length > 150)
            {
                itemTitleText = itemTitleText.Substring(0, 150);
            }

            Console.WriteLine($"Title (limited to 150 characters): {itemTitleText}");
            return itemTitleText;
        }

        public string GetItemPrice()
        {
            IWebElement itemPriceElement = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementIsVisible(itemPriceLocator));
            string itemPriceText = itemPriceElement.Text;

            
            itemPriceText = itemPriceText.Replace("$", "").Replace(",", "").Trim();

            int decimalIndex = itemPriceText.IndexOf('.');

            // If there is a decimal point, extract the part before the decimal point
            string integerPart = "";
            if (decimalIndex >= 0)
            {
                integerPart = itemPriceText.Substring(0, decimalIndex); // Extract up to the decimal point
            }
            else
            {
                integerPart = itemPriceText; // If no decimal point, use the entire string
            }

            
            return integerPart;
        }
    }



}
