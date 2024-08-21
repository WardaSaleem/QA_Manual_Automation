import { Locator, Page, expect } from "@playwright/test";

export default class PlaywrightWrapper {
    base: any;
    Export: any;


    constructor(private page: Page) {

    }
    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }
}