import { expect,Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrapper";
import { fixture } from "../hooks/pageFixture";



export default class LoginPage{
    
    private base: PlaywrightWrapper;

    constructor(private page:Page){
    this.base=new PlaywrightWrapper(page)
    fixture.page=page;
    }

    private Elements={
        LoginUrl:"https://qa.corcentric.io/",
        email:"input[name='email']",
        Passwordlink : "[data-testid='login-with-password']",
        Password:"input[name='password']",
        LoginBtn:"button[data-testid='continue']",
        ModalTitle:"h2[class='modal-title']"
    }

    async navigateToUrl(){
        await this.base.goto("https://careglp-staging.carevalidate.com/");

    }

    async LoginUser(email : string, password :string){
        

      
            await this.page.fill(this.Elements.email,email);
            await this.page.click(this.Elements.Passwordlink);
            await this.page.fill(this.Elements.Password,password);
            const LoginBtn= this.page.locator(this.Elements.LoginBtn);
            LoginBtn.click();
        
    }
    async GetLoginErrorTitle(){
        const modalTitle = await this.page.locator(this.Elements.ModalTitle);
        const txtVal = await modalTitle.innerText();
        return txtVal;
    }
}