import { Configuration } from './src/config/configuration';
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as os from 'os';
import * as path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.ENV}`) });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  outputDir: './src/output/test-results',
  // snapshotPathTemplate: '{testDir}/ui/{arg}{ext}',
  snapshotPathTemplate: './src/assets/images/ui/{arg}{ext}',
  globalSetup: './src/config/global-setup.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,

  timeout: 45 * 1000, //? default: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,

    /* Based on: https://playwright.dev/docs/test-snapshots#options */
    toHaveScreenshot: {
      maxDiffPixels: 10,
    },
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Allure-Report configuration, see: https://allurereport.org/docs/playwright-configuration  */

  reporter: [
    ['line'],
    ['html', { open: 'on-failure', outputFolder: 'src/output/test-reports' }],
    [
      'allure-playwright',
      {
        detail: true,
        resultsDir: './src/output/allure-results',
        outputFolder: './src/output/allure-reports',
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
          os_architecture: os.arch(),
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
    baseURL: Configuration.baseURL ?? 'https://www.saucedemo.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    actionTimeout: 0,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'Chromium - setup',
      grep: /@setup/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'Chromium - without setup',
      grepInvert: /@setup/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'Chromium',
    //   use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'Webkit',
    //   use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' },
    //   dependencies: ['setup'],
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
    //   dependencies: ['Webkit'],
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
