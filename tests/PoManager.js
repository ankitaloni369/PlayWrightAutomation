const { LoginPage } = require("../pageObjects/LoginPage");
const { DashboardPage } = require("../pageObjects/DashboardPage");
const { CartPage } = require("../pageObjects/CartPage");
const { OrdersReviewPage } = require("../pageObjects/OrdersReviewPage");
const { OrdersHistoryPage } = require("../pageObjects/OrdersHistoryPage");
class PoManager {
    constructor(page) {
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.orderreviewpage = new OrdersReviewPage(this.page);
        this.orderhistorypage = new OrdersHistoryPage(this.page);
    }

    getLoginPage() {
        return this.loginpage;
    }

    getDashboardPage() {
        return this.dashboardpage;
    }

    getCartPage() {
        return this.cartpage;
    }

    getOrderReviewPage() {
        return this.orderreviewpage;
    }

    getOrderHistoryPage() {
        return this.orderhistorypage;
    }



}
module.exports = { PoManager };