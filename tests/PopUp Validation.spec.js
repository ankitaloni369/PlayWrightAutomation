const { test, expect } = require("@playwright/test");

test("PopUp Validation", async ({ page }) => {
    // How to Go to different Page on the Same browser and comeback
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    // Go to Different page
    await page.goto("https://google.com");
    // Now go back to Previous page
    await page.goBack();
    // Now go again to the next page
    await page.goForward();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // How to check if the Locator/ Option is hidden or visible
    await expect(page.locator(".displayed-class")).toBeVisible();
    // Click on Hide 
    await page.locator("#hide-textbox").click();
    // Check if the Element is Hidden or not 
    await expect(page.locator(".displayed-class")).toBeHidden();
    
    // How to Handle Alerts in Automation
    await page.locator("#name").fill("Riy");
    // Click on Confirm
    await page.locator("#confirmbtn").click();
      // The AlerPOp-ups are Java Based Alerts
    // To Handle that there is page.on method listen to the Event on the Page 
    page.on("dialog",dailog => dailog.accept);

    // How to hover on the options 
    await page.locator("#mousehover").hover();
    await page.getByText("Reload").click();

   //How to Switch to Other Frames and Click on option inside it 
   const Frames = page.frameLocator("#courses-iframe");
   Frames.locator("li a[href*='lifetime-access']:visible").click();
  // if we put visible in the locator then Playwright will only see the visible locator from the page 
  // and ignore the hidden one 
  // After Clicking on the Option Grab the text 
  const textSuccess = await Frames.locator(".text h2").textContent();
  // Print the text from that 
  console.log(textSuccess.split(" ")[1]);

});