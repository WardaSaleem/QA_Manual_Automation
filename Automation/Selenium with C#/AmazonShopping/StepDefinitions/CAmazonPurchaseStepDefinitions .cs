using AmazonShopping.Pages;
using AmazonShopping.Utils;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace AmazonShopping.StepDefinitions
{
    [Binding]
    public class AmazonPurchaseSteps
    {
        private readonly IWebDriver driver;
        private readonly WebDriverWait wait;
        private readonly AmazonHomePage homePage;
        private readonly AmazonCartPage cartPage;
        private string searchedItemName;
        private string _itemTitle;
        private string _itemPrice;

        public AmazonPurchaseSteps(IWebDriver driver)
        {
            this.driver = driver;
            homePage = new AmazonHomePage(driver);
            cartPage = new AmazonCartPage(driver);
        }

        [Given(@"I navigate to the Amazon website as unregistered user")]
        public void GivenINavigateToTheAmazonWebsiteAsUnregisteredUser()
        {
            string amazonUrl = "https://www.amazon.com/";
            SeleniumHelper.HandleRecaptcha(driver, wait, amazonUrl);

            // Navigate to the Amazon website after reCAPTCHA handling
            homePage.NavigateToHomePage();
        }

        [When(@"I search for ""(.*)""")]
        public void WhenISearchFor(string itemName)
        {
         
            searchedItemName = itemName;
            homePage.SearchForItem(itemName);
        }

        [When(@"I add the relevant item to the cart")]
        public void WhenIAddTheRelevantItemToTheCart()
        {
            (_itemTitle, _itemPrice) = homePage.AddItemToCart();
           
        }

        [Then(@"I should see the relevant item in the cart")]
        public void ThenIShouldSeeTheRelevantItemInTheCart()
        {
            cartPage.NavigateToCart();
        }

        [Then(@"I should see the correct amount for the relevant item in the cart")]
        public void ThenIShouldSeeTheCorrectAmountForTheRelevantItemInTheCart()
        {
            string actualTitle = cartPage.GetItemTitle();
            Console.WriteLine($"actualTitle: {actualTitle}");
            Assert.AreEqual(_itemTitle, actualTitle, "Correct item title in cart.");

            string actualPrice = cartPage.GetItemPrice();
            Console.WriteLine($"actualPrice: {actualPrice}");
            Assert.AreEqual(_itemPrice, actualPrice, "Correct item price in cart.");
        }
    }
}
