const {test,expect}  = require("@playwright/test");


test("Playwright Special Locators", async({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // Locator getByPlaceholder : It Uses the text form the TextBox Input Field 
    // It is Used when Input field do not have Labels 
    await page.getByPlaceholder("Password").fill("SwagatC@11");

    // Locator getByLabel : It uses the Text On the Label Input (html Page)
    // It is Stable one and Improves test readbility and accessibilty compliance 

    await page.getByLabel("Check me out if you Love IceCreams!").click();

    // In Playwright we have one other options for Click that is Check : So Basically playright check the Checkbox State 

    await page.getByLabel("Employed").check();

    // Locator getByRole : It Finds the Elememt based on what element is (button , textbox , link , checkbox , radio , heading )

    await page.getByLabel("Gender").selectOption("Female");

    // Now when we run the Playwright text we use --debug or --headed or leave blank 
    // npx playwright test --ui runs Playwright tests in interactive UI mode, 
    // which helps in debugging and visually inspecting test execution. 
    // It is mainly used during local development, not in CI pipelines.

    //Locator By Role 
    await page.getByRole("button",{name:"Submit"}).click();

    //Locator by Text
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //Locator by Role to Click a option on a page
    await page.getByRole("link",{name:"Shop"}).click();

    // Filter Option to Filter a Cards or multiple Option Present By Text
    await page.locator("app-card").filter({hasText:"Blackberry"}).getByRole("button",{name:"Add"}).click();

    // Mostly in MNC Standard they use Single Stratergies for Selction you cant Use any locator by your need for each page 
    // Most widely used in CSS all the Project CSS Locator is Used as standards 

    

});
