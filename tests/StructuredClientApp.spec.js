const { test, expect } = require("@playwright/test");
const { PoManager } = require("./PoManager");
//JSON -> string -> Js object (Flow)
const dataset = JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));

// Implementation Parameterization in running test using different dataset
for(const data of dataset)
{
test(`Client App Login ${data.productName}`, async ({ page }) => {
    const poManager = new PoManager(page);

    // Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    // Dashboard — Add product and go to cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);   
    await dashboardPage.navigateToCart();                    

    // Cart — Verify product and checkout
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);  
    await cartPage.Checkout();

    // Orders Review — Fill country and submit
    const ordersReviewPage = poManager.getOrderReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderId);

    // Orders History — Find order and validate ID
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrderHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);

    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

}