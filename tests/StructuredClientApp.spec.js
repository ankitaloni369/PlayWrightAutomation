const { test, expect } = require("@playwright/test");
const { PoManager } = require("./PoManager");

test("Client App Login", async ({ page }) => {
    const username = "josephkarl@gmail.com";
    const password = "password@123";
    const productName = "ADIDAS ORIGINAL";

    const poManager = new PoManager(page);

    // Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    // Dashboard — Add product and go to cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);   
    await dashboardPage.navigateToCart();                    

    // Cart — Verify product and checkout
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);  
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