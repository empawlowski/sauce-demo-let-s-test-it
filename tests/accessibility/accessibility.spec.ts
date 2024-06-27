import { authData } from '../../.env/.auth/auth.data';
import { expect, test } from '../../components/fixtures/base';
import * as report from '../../data/report/playwright.data.json';
import * as product from '../../data/tests/e2e/inventory-item.data.json';
import AxeBuilder from '@axe-core/playwright';

let user: string = authData.standard;
let password: string = authData.password;

test.skip('Main page - accessibility', { tag: [report.tags.accessibility] }, async ({ login, header, page }) => {
  // await allure.epic(report.epic.analysis);
  // await allure.feature(report.feature.tm);
  // await allure.tag(report.tag.dealer);

  // Arrange
  // Act
  await login.logIn(user, password);
  await header.expectLogo();

  // const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    // .withTags(['best-practice'])
    .analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).include('#navigation-menu-flyout').analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).exclude('#element-with-known-issue').analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();
  console.log(accessibilityScanResults);
  // Assert
  expect(accessibilityScanResults.violations).toEqual([]);
});

test.describe('Inventory', { tag: report.tags.accessibility }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    // await allure.epic(report.epic.analysis);
    // await allure.feature(report.feature.tm);
    // await allure.tag(report.tag.dealer);

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
    // await allure.owner(report.owner.mrp);
    // Arrange
    const title = product[3].title;
    // Act
    await inventory.clickOnProductTitleName(title);
    const describe = await inventory.desc.innerText();

    // Assert
    await accessibility.expectGunningFoxIndex(describe);
  });
});
