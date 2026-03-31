const { test, expect } = require('@playwright/test');


test("test Should take ScreenShots", async ({ page }) => {
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   // How to check if the Locator/ Option is hidden or visible
   await expect(page.locator(".displayed-class")).toBeVisible();
   // Click on Hide 
   await page.locator("#hide-textbox").click();
   // Take Screenshot on the page Level : Full page Screenshot
   await page.screenshot({ path: "screenshot.png" });
   // Check if the Element is Hidden or not 
   await expect(page.locator(".displayed-class")).toBeHidden();
   // How to Handle Alerts in Automation
   await page.locator("#name").fill("Riy");
   // Take ScreenShot on the Element level
   await page.locator("#name").screenshot({ path: "ElementScreenShot.png" });
   // Click on Confirm
   await page.locator("#confirmbtn").click();
   // The AlerPOp-ups are Java Based Alerts
   // To Handle that there is page.on method listen to the Event on the Page 
   // Check the Dailog Message and print it on console and Accept the dailog
   page.on("dialog", async dailog => {
      console.log("Alert Message:", dailog.message());
      page.on("dialog", dailog => dailog.accept);
   });
});

test("Visual Testing on Playwright", async ({ page }) => {
   /* On Playwright we can test the UI using the Screenshot as we run test it will capture from 
   previous Screenshot any Bug is there or not if it detect it fails the test */
   await page.goto("https:google.com");
   // While Running the below uncomment it this is for Learning purpose as test will be failed deliberately first time 
   expect(await page.screenshot()).toMatchSnapshot("RegisterPage.png");

})