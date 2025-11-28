import { Configuration } from '@_src/config/configuration';
import { type ReporterDescription, defineConfig, devices } from '@playwright/test';
import * as os from 'os';

/* Allure-Report configuration, see: https://allurereport.org/docs/playwright-configuration  */
const reporters = {
  github: ['github', {}] as const,
  html: ['html', { open: 'never', outputFolder: 'src/output/test-report' }] as const,
  json: ['json', { open: 'never', outputFile: 'src/output/test-results/results.json' }] as const,
  junit: ['junit', { open: 'never', outputFile: 'src/output/test-results/results.xml' }] as const,
  allure: [
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
  ] as const,
} satisfies Record<string, ReporterDescription>;

const REPORTERS_CI: ReporterDescription[] = [
  reporters.github,
  reporters.html,
  reporters.json,
  reporters.junit,
  reporters.allure,
];

const REPORTERS: ReporterDescription[] = [reporters.html, reporters.json, reporters.junit, reporters.allure];

const STORAGE_STATE: string = '.auth/user.json';
const DEPENDENCIES: string[] = ['setup'];

/** Based on: https://playwright.dev/docs/test-configuration */
export default defineConfig({
  captureGitInfo: { commit: true, diff: true },
  testDir: './src/tests',
  outputDir: './src/output/test-results',
  // snapshotPathTemplate: '{testDir}/ui/{arg}{ext}',
  snapshotPathTemplate: './src/assets/images/ui/{arg}{ext}',
  globalSetup: './src/config/global-setup.ts',
  tsconfig: './tsconfig.json',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,

  timeout: 45 * 1000, //? default: 30 * 1000,
  reportSlowTests: { max: 5, threshold: 35_000 },
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5_000,

    /* Based on: https://playwright.dev/docs/test-snapshots#options */
    toHaveScreenshot: {
      maxDiffPixels: 10,
    },

    /* Based on: https://playwright.dev/docs/aria-snapshots#aria-snapshots */
    toMatchAriaSnapshot: { pathTemplate: './src/assets/data/accessability/aria/{arg}{ext}' },
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env['CI'] ? REPORTERS_CI : REPORTERS,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Set test ID attribute for project*/
    testIdAttribute: 'data-test',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: Configuration.baseUrl ?? 'https://www.saucedemo.com',

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
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: DEPENDENCIES,
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'], storageState: STORAGE_STATE },
    //   dependencies: DEPENDENCIES,
    // },
    // {
    //   name: 'Webkit',
    //   use: { ...devices['Desktop Safari'], storageState: STORAGE_STATE },
    //   dependencies: DEPENDENCIES,
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'], storageState: STORAGE_STATE },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'], storageState: STORAGE_STATE },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge', storageState: STORAGE_STATE },
    //   dependencies: DEPENDENCIES,
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
