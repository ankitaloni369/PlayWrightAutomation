class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async searchOrderAndSelect(orderId) {
        await this.ordersTable.waitFor();

        // ✅ Count evaluated once before loop — not on every iteration
        const rowCount = await this.rows.count();

        for (let i = 0; i < rowCount; i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();

            // ✅ Trim both sides before comparing, logic no longer reversed
            if (rowOrderId.trim() === orderId.trim()) {
                await Promise.all([
                    this.page.waitForLoadState("networkidle"),   // ✅ Wait for page load on click
                    this.rows.nth(i).locator("button").first().click()
                ]);
                break;
            }
        }
    }

    async getOrderId() {
        // ✅ Wait for element before reading, clean pipe characters
        await this.orderIdDetails.waitFor();
        const rawId = await this.orderIdDetails.textContent();
        return rawId.replace(/\|/g, "").trim();
    }
}

module.exports = {OrdersHistoryPage};