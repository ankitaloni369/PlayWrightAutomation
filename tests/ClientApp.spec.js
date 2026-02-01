const {test,expect} = require("@playwright/test");
const { resolveObjectURL } = require("node:buffer");
const { clear } = require("node:console");
const { pathToFileURL } = require("node:url");

test.only('Login on Client App', async ({ page }) =>
{
    const email  = "josephkarl@gmail.com";
    const useremail = page.getByRole('textbox',{name:"Email"});
    const password  = page.getByRole('textbox',{name:"enter your passsword"});
    const login    =  page.getByRole('button', {name:"login"});
    const products =  page.locator(".card-body");
    const productName = ["iphone 13 pro","ZARA COAT 3","ADIDAS ORIGINAL"];
    const expDropdown = page.locator('select.input.ddl').nth(0);
    const yearDropdown = page.locator('select.input.ddl').nth(1);


    await page.goto("https://rahulshettyacademy.com/client");

    await useremail.fill(email);
    await password.fill("password@123");
    await login.click();
    // Add a wait or inbuilt feature to load all network calls 
    // await page.waitForLoadState("networkidle");
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
    // Add Payment information on the CheckOut Page 
    // Fill Credit Card Information
    await page.locator("input[value='4542 9931 9292 2293']").fill("4444 4444 4444 4444");
    // Add Expiry Date 
    await expDropdown.selectOption('09');
    // Add Exp Year 
    await yearDropdown.selectOption('29');
    // Add CVV 
    await page.locator('input.input.txt').nth(1).fill('456');
    // Add Name on Card 
    await page.locator('input.input.txt').nth(2).fill('Rahul Shetty');
    // Suggestion Dropdown for Country 
    // in this if we add the text once at time the dropdown will not be shown : for that you need to add 
    // text sequentionally one by one word for that use pressSequentially
    await page.locator("[placeholder$='Select Country']").pressSequentially("ind",{delay: 150});
    // DropDown locator
    const dropdownloc = page.locator(".ta-results");
    await dropdownloc.waitFor();
    const optionsCount  = await  dropdownloc.locator('button').count();
    for(let i=0;i<optionsCount;i++)
    {
        const text = await dropdownloc.locator("button").nth(i).textContent();
        if(text === " India")
        {
            // click the options 
            await dropdownloc.locator("button").nth(i).click();
            break;
        }
    }
    // validation for Email Check  
    expect(page.locator(".user__name  [type='text']").first()).toHaveText(email);
    
    // Click on Place Order 
    await page.locator(".action__submit").click();

    // Check for Order Summary Page Heading Text
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    // Fetch all the OrderIDs from the Invoice 
    const orderIds = page.locator("label.ng-star-inserted");
    const orderCount = await orderIds.count();
    const finalOrderID = [ ];

    for(let i=0;i<orderCount;i++)
    {
        const rawText = await orderIds.nth(i).innerText();
        // Clean the output as we are getting | id |
        const orderId = rawText.replace(/\|/g, '').trim();
        finalOrderID.push(orderId);
        console.log(`Order ID ${i + 1}: ${orderId}`);
        expect(orderId.length).toBeGreaterThan(10);
    }
    

    // Click on Orders on the OrderSummary Page 
    await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    // Wait for the table to load 
    await page.locator("tbody").waitFor();

    // Check for the Rows of the table
    const rows = page.locator("tbody tr");

    // Check Count for the rows 
    const rowsCount = await rows.count();

    // Check the OrderIDs form the Rows and Click order view button of the matching id 
    for(let i=0;i<rowsCount;i++)
    {
        const rowID = (await rows.nth(i).locator("th").textContent()).trim();

        if(finalOrderID.includes(rowID))
        {
            await Promise.all([
            page.waitForLoadState("networkidle"),
            rows.nth(i).locator("button").first().click()
            ]);
            break;
        }
    }
    // Wait for the Page and table to load 
    await page.waitForLoadState("networkidle")

    // Catch the orderIDs from the page
    await page.locator(".col-text.-main").waitFor();

    // Clean the OrderIds from the Output 
    const orderSummaryIds = (await page.locator(".col-text.-main").innerText()).replace(/\|/g, '').trim();

    //Validation for the OrderIDs from the Orders page and order Summary page 
    expect(finalOrderID.includes(orderSummaryIds)).toBeTruthy(); 
    
    await page.pause();

});


test('Test DropDowns select', async({page})=>
{

    const useremail = page.getByRole('textbox',{name:"Username"});
    const password  = page.getByRole('textbox',{name:"Password"});
    const dropdown  = page.locator('select.form-control');
    const radioBut  = page.getByRole('radio',{name: "User"});
    const agreeTerm = page.getByRole('checkbox',{name:"I Agree to the "});
    const signbutton = page.getByRole('button',{name:"signin"});
    const okayButton = page.getByRole('button',{name:"Okay"});
    const blinkLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await useremail.fill("josephkarl@gmail.com");
    await password.fill("password@11");

    // to click on radio button
    await radioBut.check();

    // Now Check if the radio button is checked or not
    console.log(await radioBut.isChecked());  // returns boolean value 

    // add Assertions also 
    await expect(radioBut).toBeChecked();

    // Wait until it is visible
    await okayButton.waitFor({ state: 'visible' });
    
    // After User click popUp is Shown 
    await okayButton.click();
    
    // to click option from the dropdown
    await dropdown.selectOption('teach');

    //to check/click on terms and conditions
    await agreeTerm.check();
    
    // Add assertions or Check 
    await expect(agreeTerm).toBeChecked();
    
    // uncheck the Agree Terms 
    await agreeTerm.uncheck();
    expect (await (agreeTerm).isChecked()).toBeFalsy();
    
    // again check the agree Terms 
    await agreeTerm.check();

    // Check again the Status 
    expect (await (agreeTerm).isChecked()).toBeTruthy();

    // Check the link is blinking or not
    await expect(blinkLink).toHaveAttribute("class","blinkingText");

    await page.pause();

});

test("Test Child windows handling",async ({browser}) =>
{
    const context = await browser.newContext(); // create browser instanse 
    const page = await context.newPage(); // in that page instanse 
    const useremail = page.getByRole('textbox',{name:"Username"});

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documnetLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            documnetLink.click(),

        ])

    const textArray = await (newPage.locator('.red')).textContent();

    const returnText = textArray.split("@");
    console.log(returnText);
    const domain = returnText[1].split(" ")[0];
    console.log(domain);
    await useremail.fill(domain);
    console.log(await useremail.inputValue());
    await page.pause();

});






