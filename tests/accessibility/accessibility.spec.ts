import { expect, test } from '@_src/fixtures/base';
import * as report from '@_src/test-data/report/allure.data.json';
import { authData } from '@_src/test-data/tests/e2e/auth.data';
import * as product from '@_src/test-data/tests/e2e/inventory-item.data.json';
import AxeBuilder from '@axe-core/playwright';

const { allure } = require('allure-playwright');

let user: string = authData.standard;
let password: string = authData.password;

test(
  'Main page - accessibility',
  { tag: [report.tags.accessibility] },
  async ({ login, header, page, a11y }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.accessibility);
    await allure.owner(report.owner.mrp);

    // Arrange
    // Act
    await login.logIn(user, password);
    await header.expectLogo();

    // const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // .withTags(['best-practice'])
      // .withRules(['lighthouse-rules'])
      .analyze();
    // const accessibilityScanResults = await new AxeBuilder({ page }).include('#navigation-menu-flyout').analyze();
    // const accessibilityScanResults = await new AxeBuilder({ page }).exclude('#element-with-known-issue').analyze();
    // const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();
    console.log(accessibilityScanResults);

    const accessibilityScanResultsFromFixture = await a11y().analyze();

    // Exporting scan results as a test attachment
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
    // Assert
    // expect(accessibilityScanResults.violations).toHaveLength(0);
    await test.step('Check a11y from fixture', async () => {
      // expect.soft(accessibilityScanResultsFromFixture.violations).toEqual([]);
      expect.soft(accessibilityScanResultsFromFixture.violations.length).toEqual(1);
    });
    await test.step('Check a11y', async () => {
      // expect.soft(accessibilityScanResults.violations).toEqual([]);
      expect.soft(accessibilityScanResults.violations.length).toEqual(1);
    });
  },
);

test.describe('Inventory', { tag: report.tags.accessibility }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.accessibility);
    await allure.story(report.story.gunning);

    // Arrange
    console.log(`Running ${testInfo.title}`);
    // Act
    await login.logIn(user, password);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Gunning fog index - product describe', async ({ inventory, accessibility }) => {
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
