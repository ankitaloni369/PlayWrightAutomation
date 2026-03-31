const { test, expect } = require("@playwright/test");

//To run the Test in Parallel in one go You need to Tell playwright that,
//by default it execute the tests in sequentional 
test.describe.configure({ mode: "parallel" });
test('First Playwright test', async ({ browser }) => {
  // Open Browser , enter u/p , use awaits to tell code to await till result are shown
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.screener.in');
});


test('Page Playwright test', async ({ page }) => {
  await page.goto('https://www.primevideo.com/movie');
  console.log(await page.title());
  await expect(page).toHaveTitle("Prime Video: Watch, rent, or buy movies online");
});


test('Page Check Title', async ({ page }) => {
  // Block API Response to the Browser 
  // page.route("**/.css", route => route.abort());
  // test.only is used if you want to run only these test
  await page.goto("https://staging-01-client.chottulink.com/login");
  console.log(await page.title())
  await expect(page).toHaveTitle("ChottuLink | Sign In");

});