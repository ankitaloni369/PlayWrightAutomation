//Structured Code for excelDemoPractise
const ExcelJS = require("exceljs");
const { test, expect } = require("@playwright/test");

// Create a function to Write Excel Test
async function writeExcelFile(filePath, sheetName, searchText, replaceText, change) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
        throw new Error(`Sheet ${sheetName} not found`);
    }

    const output = await readExcelFile(worksheet, searchText);

    if (output.row === -1 || output.colNumber === -1) {
        throw new Error("Search text not found in Excel");
    }

    const cell = worksheet.getCell(output.row, output.colNumber + change.colchange);
    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);

}

async function readExcelFile(worksheet, searchText) {
    let output = { row: -1, colNumber: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value == searchText) {
                output.row = rowNumber;
                output.colNumber = colNumber;
            }
        })
    })
    return output;
}

test("Upload download excel validation", async ({ page }) => {
    const textSearch = "Mango";
    const updatedValue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click();
    await downloadPromise;
    // Update the Macbook Price from 399 to 50k
    writeExcelFile("/Users/ankitaloni/Downloads/download.xlsx", "Sheet1", "Mango", 350, { row: 0, colchange: 2 });
    await page.locator("#fileinput").click();
    //To input the File and Upload it Playwright has inbuild method .setInputFiles
    await page.locator("#fileinput").setInputFiles("/Users/ankitaloni/Downloads/download.xlsx");
    const textlocator = page.getByText(textSearch);
    // Validation to Check if Updated Excel 
    const desiredRow = await page.getByRole("row").filter({ has: textlocator });
    expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);

})


