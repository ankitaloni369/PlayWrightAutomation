const { test, expect } = require('@playwright/test');

test("Security Test form Network", async ({ page }) => {

    const email = "josephkarl@gmail.com";
    const useremail = page.getByRole('textbox', { name: "Email" });
    const password = page.getByRole('textbox', { name: "enter your passsword" });
    const login = page.getByRole('button', { name: "login" });

    await page.goto("https://rahulshettyacademy.com/client");
    await useremail.fill(email);
    await password.fill("password@123");
    await login.click();
    await page.locator(".card-body b").first().waitFor();
    await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    
    //Route the API 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69b43f91f86ba51a65012cbe" }))

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
    console.log(await page.locator(".blink_me").textContent());
});