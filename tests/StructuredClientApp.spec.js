const { test, expect } = require('@playwright/test');
const { PoManager } = require('./PoManager');

//JSON -> string -> Js object (Flow)
const dataset = JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));

// Implementation Parameterization in running test using different dataset
for (const data of dataset) {
  test(`Client App Login ${data.productName}`, async ({ page }) => {
    const poManager = new PoManager(page);
    //js file- Login js, DashboardPage
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrderReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrderHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  });

}







