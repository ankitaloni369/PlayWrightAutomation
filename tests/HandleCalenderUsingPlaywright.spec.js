import {test ,expect }  from "@playwright/test" ;

test("Calender Handling using Playwright",async ({ page }) =>
{
    const monthNumber = "9";
    const date = "5";
    const year = "2027"; 

    // Array of Values Entered in the Calender 
    const expectValues = [monthNumber,date,year];
    
    // Go to the page 
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    // Click on Date Picker
    await page.locator(".react-date-picker__inputGroup").click();
    // Click on the Calender to Select Year (Need to Click on twice to Show Year)
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    //Select Year you want to Click 
    await page.getByText(year).click();
    //Select Month you want to select
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    // Select Date you want to select
    await page.locator("//abbr[text()='"+date+"']").click();

    // validations for Calender Entry 

    // Need to Choose a locator which is same for all the 3 Inputs 
    const inputs = page.locator(".react-date-picker__inputGroup__input");

    //Validations Code 
    for(let i=0;i< expectValues.length;++i)
    {
        const values = await inputs.nth(i).inputValue();
        console.log(values[i]);
        expect(values).toEqual(expectValues[i]);

    }

});

