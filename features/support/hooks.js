const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { PoManager } = require("../../tests/PoManager");
const playwright = require("@playwright/test");
const path = require("node:path");

Before(async function () {
    this.browser = await playwright.chromium.launch({
        headless: true
    });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.poManager = new PoManager(this.page);
});

BeforeStep({ tags: "@WEB" }, function name(params) {
    // This hook will be executed before all the steps in scenario with tag @foo 

});

AfterStep(async function ({ result }) {
    // This hook will be executed after all the Steps , and take a screenshot
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: "screenshot001.png" })
    }
});

After(function () {
    this.browser.close();
    console.log("Last Test Case Executed. Check Results Now!!!")
});