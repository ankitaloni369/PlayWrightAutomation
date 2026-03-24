const { expect } = require("@playwright/test");

class OrdersReviewPage {

    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder$='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailid = page.locator(".user__name  [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator("label.ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode, countryName) {
        await this.country.pressSequentially(countryCode, { delay: 150 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator('button').count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                // click the options 
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyEmailid(userName) {
        await expect(this.emailid).toHaveText(userName);
    }

    async submitAndGetOrderId() {
        await this.submit.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");  // ✅ match exact spacing
        // ✅ Clean the returned order ID of pipe characters and whitespace
        const rawId = await this.orderId.textContent();
        return rawId.replace(/\|/g, "").trim();
    }
}

module.exports = { OrdersReviewPage };