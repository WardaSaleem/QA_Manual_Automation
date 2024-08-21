import { Given, When, Then } from "@cucumber/cucumber";
import{ expect} from "@playwright/test";
import{ page,browser,loginPage,} from "../../hooks/hook";

Given('User is on Care validate page', async function () {
    
    await loginPage.navigateToUrl();
});

When('user enters valid email {string} and password {string}', async function (username ,password) {
    await loginPage.LoginUser(username,password);
});
