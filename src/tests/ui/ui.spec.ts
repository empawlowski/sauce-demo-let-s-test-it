import * as product from '@_src/assets/data/e2e/inventory-item.data.json';
import * as report from '@_src/assets/data/report/allure.data.json';
import { Configuration } from '@_src/config/configuration';
import { test } from '@_src/fixtures/base.fixture';
import { logger } from '@_src/helpers/logger.helper';
import * as allure from 'allure-js-commons';

test.describe('Pages with errors', { tag: [report.tags.regression, report.tags.visual] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach('Add running test title', async () => {
    await allure.epic(report.epic.ui);

    logger.info(`Running ${test.info().title}`);
  });
  test.afterEach('Close the page', async ({ base }, testInfo) => {
    logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Visual effect for cart', async ({ login, header, base }) => {
    await allure.feature(report.feature.cart);
    await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    logger.warn('This test will finish with status failed');
    const screenshot: string = 'cart.png';
    // Act
    await login.logIn(Configuration.userVisual, Configuration.password);
    await header.clickShoppingCart();
    // Assert
    await base.expectHaveScreenshot(screenshot);
  });

  test('Visual effect for checkout', async ({ login, header, cart, checkout }) => {
    await allure.feature(report.feature.checkout);
    await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    logger.warn('This test will finish with status failed');
    const screenshot: string = 'checkout.png';
    // Act
    await login.logIn(Configuration.userVisual, Configuration.password);
    await header.clickShoppingCart();
    await cart.clickCheckout();
    // Assert
    await checkout.expectHaveScreenshot(screenshot);
  });

  test('Visual effect for inventory', async ({ login, base }) => {
    await allure.feature(report.feature.inventory);
    await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    logger.warn('This test will finish with status failed');
    const screenshot: string = 'inventory.png';
    // Act
    await login.logIn(Configuration.userVisual, Configuration.password);
    // Assert
    await base.expectHaveScreenshot(screenshot);
  });

  test('Visual effect for single product view', async ({ login, inventory, base }) => {
    await allure.feature(report.feature.inventory);
    await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    logger.warn('This test will finish with status failed');
    const screenshot: string = 'product.png';
    // Act
    await login.logIn(Configuration.userProblem, Configuration.password);
    await inventory.clickOnProductTitleName(product[5].title);
    // Assert
    await base.expectHaveScreenshot(screenshot);
  });
});
