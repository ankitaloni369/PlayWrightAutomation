const {test, expect} = require("@playwright/test");
let WebContext;

test.beforeAll(async ({browser})=> 
{
    const email = "josephkarl@gmail.com";
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    // store login session
    await context.storageState({ path: 'state.json' });

    // Inject store login session
    WebContext = await browser.newContext({storageState:'state.json'});
});

test('Login to the Client App',async() =>
{
  const page = await WebContext.newPage();
  const products =  page.locator(".card-body");
    const productName = ["iphone 13 pro","ZARA COAT 3","ADIDAS ORIGINAL"];
  // Webcontext is created by using the state.json injecting the token
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".card-body b").first().waitFor();
    // To get all the content on the Page
    const titles = await page.locator(".card-body b").allTextContents();
    // Print all the titles 
    console.log(titles);

     // create an variable for the product count (Async)

    const countProducts = await products.count();

    // Loop form the Array to get the desired text
    for(let i=0;i < countProducts; i++)
    {
        const productText = await products.nth(i).locator("b").textContent();
       if(productName.includes(productText))
       {
         //logic to add the product to the Cart 
         await products.nth(i).locator("text= Add To Cart").click();
         // OR locator("text = Add To Cart")
         
       }
    }

    await page.locator("[routerlink*='cart']").click();
    // Wait until page is loaded 
    await page.locator("div li").first().waitFor();
    // Text Based on the Tag
    await expect(page.locator("h3:has-text('iphone 13 pro')")).toBeVisible();
    // Click on Checkout
    await page.locator("text = Checkout").click();

});

test('Test Case 2',async()=>
{
    const page = await WebContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".card-body b").first().waitFor();
    // To get all the content on the Page
    const titles = await page.locator(".card-body b").allTextContents();
    // Print all the titles 
    console.log(titles);
});