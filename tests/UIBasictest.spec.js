const { test, expect } = require("@playwright/test"); 

test('First Playwright test', async ({ browser }) => {
  // Open Browser , enter u/p , use awaits to tell code to await till result are shown
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.screener.in');
});


test('Page Playwright test', async ({ page }) => {
  await page.goto('https://www.zee5.com');
});


test.only('Page Check Title',async ({page}) =>
{
  const firstName = page.locator("#mat-input-0");
  const lastName =  page.locator("#mat-input-1");
  const email =     page.locator("[type='email']");
  const password =  page.locator('[name="user-password"]');
  const confirmPassword = page.locator("#mat-input-4");
  const signIN =    page.getByRole('button',{name:"Create Account"});
  const Allowall =  page.getByRole('button', { name: 'Allow All' });
  const CheckBoxAllow = page.locator("[type='checkbox']");

  // test.only is used if you want to run only these test
  await page.goto("https://staging-01-client.chottulink.com/register");
  console.log(await page.title())
  //
  await expect(page).toHaveTitle("ChottuLink | Sign Up");

  // CSS and xpath locators are availbele
  await Allowall.waitFor({state: 'visible'});
  await Allowall.click();
  // in fill method if you add "" it clears the previous value 
  await firstName.fill("");
  await lastName.fill("Karl");
  await email.fill("cryptotokenaxs+32@gmail.com");
  await password.fill("Technoank@11");
  await confirmPassword.fill("Technoank@11");
  await CheckBoxAllow.click();
  await signIN.click();
  // TO Extract the text from the field 
  // Webdriver wait is automatically applied by default by playwright which is in playwright.config
  console.log(await page.locator('[id="mat-mdc-error-0"]').textContent());
  // Now to Check Error message if correct or not
  await expect(page.locator('[id="mat-mdc-error-0"]')).toContainText("First Name is required");
  await page.pause();


});