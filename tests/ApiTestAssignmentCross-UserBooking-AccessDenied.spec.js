// What you are testing:
// User A (Yahoo) creates a booking via a direct API call— no browser UI involved. 
// User B (Gmail) logs in through the browser and tries to open that booking's URL directly. 
// User B must see an "Access Denied" error.

const { test, expect } = require("@playwright/test");

const UI_BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_BASE_URL = "https://api.eventhub.rahulshettyacademy.com";

const LOGIN_API_URL = API_BASE_URL + "/api/auth/login";
const EVENT_API_URL = API_BASE_URL + "/api/events";
const API_BOOKING_API_URL = API_BASE_URL + "/api/bookings/";

const YAHOO_USER = {

    email: 'adamchriz9@yahoo.com',
    password: 'Test@123'
};

const GMAIL_USER = {
    email: 'adamchriz10@gmail.com',
    password: 'Test@123'
};

/* ---------------- HELPER FUNCTION ---------------- */
async function loginAs(page, User) {
    await page.goto(UI_BASE_URL);
    await page.getByLabel("Email").fill(User.email);
    await page.getByLabel("Password").fill(User.password);
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForLoadState('networkidle');
    
}

test("Gmail user should see Access Denied when viewing Yahoo user's booking", async ({ page, request }) => {   /*-------------------STEP 1--------------------------- */
    // Login as Yahoo user via API 

    const loginResponse = await request.post(LOGIN_API_URL, {
        data:
        {
            email: YAHOO_USER.email,
            password: YAHOO_USER.password
        }
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJSON = await loginResponse.json();
    // Extract the token from the Response
    const yahoo_token = loginResponseJSON.token;

    /*-------------------STEP 2--------------------------- */
    // Fetch events via API to get a valid event ID
    const eventDataResponse = await request.get(EVENT_API_URL, {
        headers:
        {
            Authorization: `Bearer ${yahoo_token}`
        }
    });
    expect(eventDataResponse.ok()).toBeTruthy();
    const eventDataResponseJSON = await eventDataResponse.json();
    // Extract the Event Data from the Response
    const eventID = eventDataResponseJSON.data[0].id;

    /*-------------------STEP 3--------------------------- */
    //Create a booking via API as Yahoo user
    const bookingResponse = await request.post(API_BOOKING_API_URL, {
        headers:
        {
            Authorization: `Bearer ${yahoo_token}`
        },
        data:
        {
            "eventId": eventID,
            "customerName": "Priya Sharma",
            "customerEmail": "priya.sharma@email.com",
            "customerPhone": "+91-9876543210",
            "quantity": 2

        }
    });
    expect(bookingResponse.ok()).toBeTruthy();
    const bookingResponseJSON = await bookingResponse.json();
    // Extract the Booking ID from the Response 
    const bookingID = bookingResponseJSON.data.id;

    /*-------------------STEP 4--------------------------- */
    //  Login as Gmail user via browser UI
    await loginAs(page, GMAIL_USER);

    /*-------------------STEP 5--------------------------- */
    //Navigate to Yahoo's booking URL as Gmail user
    await page.goto(`${UI_BASE_URL}/bookings/${bookingID}`, {
        waitUntil: 'networkidle'
    });

    /*-------------------STEP 6--------------------------- */
    //  Validate Access Denied text
    await page.waitForSelector('h3.text-lg');
    await expect(page.locator("h3.text-lg")).toHaveText("Access Denied");
    //  Validate You are not authorized to view this booking
    await expect(page.locator("p.text-sm")).toHaveText("You are not authorized to view this booking.");

});