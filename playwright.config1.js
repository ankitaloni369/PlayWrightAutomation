// How to add Multiple project configurations in playwright 
// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { on } = require('node:cluster');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    
    retries:2, 
    // the code will re-run one time after fail. 
    // While testing retries manually click on browser to fail the test 
    
    workers: 5, 
    //it decide who many test it will execute in parallel,
    // if 1 is selected then it will disabled the parralel execution 
    
    timeout: 30 * 1000,

    expect: {
        timeout: 30 * 1000,
    },

    reporter: "html",
    projects: [
        {
            name: "Safari",
            use: {
                browserName: 'webkit',
                headless: false,
                screenshot: 'on',
                trace: 'on', // On , OFF, on Fail , On PASS
                //...devices['iPhone 6 Plus'], //can be used on any browser
                ignoreHTTPSErrors: true,
                permissions: ['geolocation'],
            }
        },
        {
            name: "Chrome",
            use: {
                browserName: 'chromium',
                headless: false,
                screenshot: 'on',
                video:"retain-on-failure",
                trace: 'on', // On , OFF, on Fail , On PASS
                ignoreHTTPSErrors: true,
                permissions: ['geolocation'],
                //viewport: { width: 1080, height: 1600 }
            }
        }


    ]

});