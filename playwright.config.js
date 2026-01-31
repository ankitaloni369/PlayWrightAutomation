// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { on } = require('node:cluster');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  timeout: 40 * 1000,

  expect: {
    timeout: 50 * 1000,
  },

  reporter: 'html',

  // Shared Config for all the Project below .Playwright

  use: {
    browserName: 'webkit',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure', // On , OFF, on Fail , On PASS
  },
});