import * as product from '@_src/assets/data/e2e/inventory-item.data.json';
import { loginData } from '@_src/assets/data/e2e/login.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { expect, test } from '@_src/fixtures/base.fixture';
import AxeBuilder from '@axe-core/playwright';
import * as allure from 'allure-js-commons';

//? Based on: https://playwright.dev/docs/accessibility-testing

test.describe('Accessability tests', { tag: [report.tags.regression, report.tags.accessibility] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.accessibility);
    await allure.owner(report.owner.mrp);

    // Arrange
    console.log(`Running ${testInfo.title}`);
    // Act
    await login.goTo(loginData.inventoryURL);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test.describe('Accessability tests - without fixture', { tag: report.tags.accessibility }, () => {
    test('Full scan results for page', async ({ page }, testInfo) => {
      //? #1 shorter version
      // const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      //? #2 more variables version
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // .withRules(['lighthouse-rules'])
        .analyze();

      //? #3 others variables version
      // const accessibilityScanResults = await new AxeBuilder({ page }).include('#navigation-menu-flyout').analyze();
      // const accessibilityScanResults = await new AxeBuilder({ page }).exclude('#element-with-known-issue').analyze();
      // const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();

      await test.step('Thread 1: Exporting scan results as a test attachment', async () => {
        //? simple method by console log
        // console.log(accessibilityScanResults);

        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json',
        });
      });

      await test.step('Thread 2: Check a11y assertions', async () => {
        expect.soft(accessibilityScanResults.violations.length).toEqual(1);
      });
    });
  });

  test.describe('Accessability tests - fixture', () => {
    test('Full scan results for page', async ({ a11y }, testInfo) => {
      const accessibilityScanResults = await a11y().analyze();

      await test.step('Thread 1: Exporting scan results as a test attachment - full', async () => {
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(accessibilityScanResults, null, 2),
          contentType: 'application/json',
        });
      });

      await test.step('Thread 2: Check a11y assertions - full', async () => {
        expect.soft(accessibilityScanResults.violations.length).toEqual(2);
      });
    });

    test('Violations results for page', async ({ a11y }, testInfo) => {
      const { violations } = await a11y().analyze();

      await test.step('Thread 1: Exporting scan results as a test attachment - violations', async () => {
        await testInfo.attach('accessibility-scan-results', {
          body: JSON.stringify(violations, null, 2),
          contentType: 'application/json',
        });
      });

      await test.step('Thread 2: Check a11y assertions - violations', async () => {
        expect.soft(violations).toHaveLength(2);
      });
    });
  });

  test.describe('Gunning fog index', () => {
    test('Inventory - product describe', async ({ inventory, accessibility }) => {
      await allure.story(report.story.gunning);
      await allure.owner(report.owner.mrp);
      // Arrange
      const title = product[3].title;
      // Act
      await inventory.clickOnProductTitleName(title);
      const describe = await inventory.desc.innerText();

      // Assert
      await accessibility.expectGunningFoxIndex(describe);
    });
  });
});
