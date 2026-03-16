const { test, expect } = require("@playwright/test");

// Define two mock response objects as constants before your tests:
// Write a loginAndGoToEvents(page) helper that logs in and then navigates to /events

// Step 1 — Set up the API mock.Intercept all requests matching ** /api/events ** using page.route;
// In the handler, call route.fulfill() with status 200, content type application/json, and body set to JSON.stringify(SIX_EVENTS_RESPONSE)
//The mock must be registered before navigating to the events page

//Step 2 — Login and navigate.Call your loginAndGoToEvents(page) helper

//Step 3 — Verify cards loaded from mock- Get all event cards by data - testid="event-card"
//Assert first card is visible - Assert card count equals exactly 6

//Step 4 — Verify banner is visible - Locate the banner using a case-insensitive text regex: /sandbox holds up to/i
//Assert it is visible - Assert it contains text 9 bookings.

const SIX_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150 },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300 },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50 },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20 },
        { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000 },
        { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180 }
    ],
    pagination: { page: 1, totalPages: 1, total: 6, limit: 12 }
};

const FOUR_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false }
    ],
    pagination: { page: 1, totalPages: 1, total: 4, limit: 12 }
};

const BASE_URL = "https://eventhub.rahulshettyacademy.com";


/* ---------------- HELPER FUNCTION ---------------- */
async function loginAndGoToEvents(page) {
    await page.goto(BASE_URL);
    await page.getByLabel("Email").fill("jospehkarl@gmail.com");
    await page.getByLabel("Password").fill("Technoank@11");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.goto("https://eventhub.rahulshettyacademy.com/events");   
}


/* ---------------- TEST 1 ---------------- */

test("Banner visible when 6 events returned", async ({ page }) => {

    await page.route("**/api/events*", async route => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(SIX_EVENTS_RESPONSE)
        });
    });

    // To Print API Response and Status code 
    page.on("request", request => console.log(request.url())); //To Display API url 
    page.on("response", response => console.log(response.url(), response.status())); // Display URL with Status Code

    await loginAndGoToEvents(page);
    const eventsCard = page.locator('[data-testid="event-card"]');
    await expect(eventsCard.first()).toBeVisible();
    await expect(eventsCard).toHaveCount(6);
    const banner = page.getByText(/sandbox holds up to/i);
    await expect(banner).toBeVisible();
    await expect(banner).toContainText("9 bookings");

});



/* ---------------- TEST 2 ---------------- */


test("Banner hidden when 4 events returned", async ({ page }) => {

    await page.route("**/api/events*", async route => {
        await route.fulfill(
            {
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(FOUR_EVENTS_RESPONSE)

            });
    });

    page.on("request", request => console.log(request.url()));
    page.on("response", response => console.log(response.url(), response.status()));
    await loginAndGoToEvents(page);
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    const eventsCard = page.locator('[data-testid="event-card"]');
    await expect(eventsCard.first()).toBeVisible();
    await expect(eventsCard).toHaveCount(4);
    const banner = page.getByText(/sandbox holds up to/i);
    await expect(banner).toBeHidden();

});

