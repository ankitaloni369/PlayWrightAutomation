const { test, expect, request } = require("@playwright/test");
// request is Used for API testing (without browser) // expect is Used for Assertions and test to write test cases.

const { APIUtils } = require("./Utils/APIUtils");  // Import Api Class from different Packages 

const loginPayload = { userEmail: "josephkarl@gmail.com", userPassword: "password@123" }
const orderPayload = { orders: [{ "country": "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

let response;

// .beforeAll is called once before all the test.If Multiple beforeAll are added then the execution is as per registration 

test.beforeAll(async () => {
    //to create a instance for the API Testing // Exposes API for Web Testing 

    const apiContext = await request.newContext();
    const apiutils = new APIUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(orderPayload);
    expect(response.token).toBeTruthy();
    expect(response.orderId).toBeTruthy();

});

test("Place the Order", async ({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("//button[@routerlink='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();

    // Check for the Rows of the table
    const rows = await page.locator("tbody tr");

    // Check Count for the rows 
    const rowsCount = await rows.count();

    // Check the OrderIDs form the Rows and Click order view button of the matching id 
    for (let i = 0; i < rowsCount; i++) {
        const rowID = (await rows.nth(i).locator("th").textContent()).trim();

        if (response.orderId.includes(rowID)) {
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
    const orderDetails = (await page.locator(".col-text.-main").innerText()).replace(/\|/g, '').trim();

    //Validation for the OrderIDs from the Orders page and order Summary page 
    expect(response.orderId.includes(orderDetails)).toBeTruthy();

    await page.pause();

});
