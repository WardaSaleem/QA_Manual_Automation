import { BeforeAll, AfterAll, Before, After, AfterStep, Status} from "@cucumber/cucumber";
import { chromium, Page, Browser, test } from "@playwright/test";

import { setDefaultTimeout } from "@cucumber/cucumber";

import Assert from "../helper/wrapper/assert";

import LoginPage from "../pages/loginPage";


import { options } from '../helper/report/report'
import NewRequestPage from "../pages/newRequestPage";




//Required Objects and Variable

let browser: Browser;

let page: Page;

let loginPage: LoginPage;

let assert: Assert;

let newRequestPage : NewRequestPage;



let exePath = '';




// Check if an environment variable or configuration exists to override the default path

if (process.env.PLAYWRIGHT_CHROMIUM_PATH) {

    exePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;

}




//manage cucumber step timeout so that steps have enough time to execute

//cucumber default step timeout is 5s which is too quick

//i.e. if page load takes more than 5s cucumber will timeout before step can finish

const DEFAULT_STEP_TIMEOUT = 90000;

setDefaultTimeout(DEFAULT_STEP_TIMEOUT);




BeforeAll(async () => {



    browser = await chromium.launch({

        executablePath: exePath,

        headless: false,

        args: ['--start-maximized']

    });




})




Before(async () => {




    try {



        page = await browser.newPage({ viewport: null });

        loginPage = new LoginPage(page);

        assert = new Assert(page);

      newRequestPage =new NewRequestPage(page)
        
        
    }

    catch (error) {

        console.log(`Before All Error: ${error}`)

        throw new Error(`Error: ${error}`);

    }

    return page

})




AfterStep(async function (testCase) {

    if (testCase.result.status === Status.FAILED) {

        // Take a screenshot of each failed step

        const screenshotPath = `./src/helper/report/screenshots/failed-step-${Date.now()}.png`;

        await page.screenshot({ path: screenshotPath });

        options.customData.screenshots.push(screenshotPath);

    }

});



After(async (testCase) => {

    if (testCase.result && testCase.result.status === Status.PASSED) {

        // Take a screenshot at the end of each scenario (for passed tests)

        const screenshotPath = `./src/helper/report/screenshots/scenario-${Date.now()}.png`;

        await page.screenshot({ path: screenshotPath });

        options.customData.screenshots.push(screenshotPath);



    }

    await page.close()




})

// AfterStep(async function name({pickle, result}) {
//  console.log(result?.status);
//     if(result?.status== Status.PASSED){
//     const img=await page.screenshot({path:'./test-results/screenshots/${pickle.name}.png',type:"png"})
//     await this.attach(img,"image/png");
  
//     }

// })


// After(async function ({pickle,result}) {
//     // if (result?.status === Status.FAILED) {
//         console.log(result?.status);
//         const page:Page=this.page;
//         // Capture the screenshot in your Playwright test scenario
//         const screenshotPath = `/path/to/screenshots/screenshot-${Date.now()}.png`;
//         await this.page.screenshot({ path: screenshotPath });
    
//         // Read the screenshot file
//         const screenshot = await fsPromises.readFile(screenshotPath, 'base64');
    
//         // Attach the screenshot to the report
//         this.attach(screenshot, 'image/png');
    
//         // Optional: Save the screenshot file with a unique name
//         const uniqueScreenshotPath = `/path/to/screenshots/screenshot-${Date.now()}.png`;
//         await writeFile(uniqueScreenshotPath, screenshot, 'base64');
//      // }
//     });
    


AfterAll(async () => {
       // await page.screenshot({ path: 'screenshot.png', fullPage: true });
        await browser.close();
        await page.close()

})






export { page, browser, loginPage, assert, newRequestPage, };