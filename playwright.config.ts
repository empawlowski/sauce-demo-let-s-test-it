import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import * as os from 'os';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.ENV}`) });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: '{testDir}/ui/{arg}{ext}',
  globalSetup: './src/config/global-setup.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  timeout: 45 * 1000, //? default: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [['line'], ['allure-playwright']],
  // reporter: [['html', { open: 'always' }]],

  reporter: [
    ['line'],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true,
        categories: [
          {
            name: 'Outdated tests',
            messageRegex: '.*FileNotFound.*',
          },
        ],
        environmentInfo: {
          framework: 'Sauce Demo Playwright',
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],

  // reporter: 'dot',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Set test ID attribute for project*/
    testIdAttribute: 'data-test',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    actionTimeout: 0,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'Webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
