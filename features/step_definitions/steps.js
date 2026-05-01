const { When, Then, Given, setDefaultTimeout, After } = require("@cucumber/cucumber");
const { PoManager } = require("../../tests/PoManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");
const data = JSON.parse(JSON.stringify(require("../../Utils/PlaceOrderTestData.json")));
setDefaultTimeout(100 * 1000);

Given('a login to Ecommerce website with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed to Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.Checkout();
});

When('Enter valid details and place the Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.ordersReviewPage = this.poManager.getOrderReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify the Order in present in the OrderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    this.ordersHistoryPage = this.poManager.getOrderHistoryPage();
    await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
});



