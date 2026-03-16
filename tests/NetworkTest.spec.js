const {test,expect,request} = require('@playwright/test');

const { APIUtils } = require("./Utils/APIUtils");  // Import Api Class from different Packages 

const loginPayload = { userEmail: "josephkarl@gmail.com", userPassword: "password@123" }
const orderPayload = { orders: [{ "country": "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayloadOrders = {"data":[],"message":"No Orders"}
const expectedErrorMsg = " You have No Orders to show at this time. Please Visit Back Us ";
let response;

test.beforeAll(async () => {
    //to create a instance for the API Testing // Exposes API for Web Testing 

    const apiContext = await request.newContext();
    const apiutils = new APIUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(orderPayload);
    expect(response.token).toBeTruthy();
    expect(response.orderId).toBeTruthy();

})


test("Place the Order", async ({ page }) => {
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    //Route this API 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders);
        route.fulfill(
            {
                response,
                body,

            });
        // intercepting response - API response -> {Playwright fakeresponse} -> browser
    });

     await page.locator("//button[@routerlink='/dashboard/myorders']").click();
     // Need to wait till the API gives Response 
     await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
     const actualErrorMsg = await page.locator(".mt-4").textContent();
     expect (actualErrorMsg).toContain(expectedErrorMsg);
     console.log("ActualMessage: " + actualErrorMsg + "\nExpectedMessage: " + expectedErrorMsg);

});