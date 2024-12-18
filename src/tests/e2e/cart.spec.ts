import { loginData } from '@_src/assets/data/e2e/login.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { visualData } from '@_src/assets/data/ui/visual.data';
import { Configuration } from '@_src/config/configuration';
import { test } from '@_src/fixtures/base.fixture';
import * as allure from 'allure-js-commons';

test.describe('Cart', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.cart);

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

  test('Validation Cart page', { tag: [report.tags.smoke] }, async ({ cart, header }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    // Act
    await header.clickShoppingCart();
    // Assert
    await cart.expectCartPage();
  });

  test.describe('Function with product', () => {
    test('Add product to basket', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      //Act
      await inventory.getFirstTitle().isVisible();
      const title = await inventory.getFirstTitle().innerText();
      await inventory.addToCart(title);
      // Assert
      await header.isBadgeVisible();
    });
    test('Remove product from basket', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      await test.step('Add product to basket', async () => {
        // Act
        await inventory.clickAddToCartFirst();
        // Assert
        await header.isBadgeVisible();
      });
      await test.step('Remove from basket', async () => {
        // Act
        await header.clickShoppingCart();
        await inventory.clickRemove();
        // Assert
        await header.isBadgeHidden();
      });
    });
  });
});

test.describe('Cart with errors', { tag: [report.tags.regression, report.tags.visual] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach('Add running test title', async () => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.cart);

    console.log(`Running ${test.info().title}`);
  });
  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Visual effect for page', async ({ login, header, base }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    const screenshot = visualData.cart;
    // Act
    await login.logIn(Configuration.userVisual, Configuration.password);
    await header.clickShoppingCart();
    // Assert
    await base.expectHaveScreenshot(screenshot);
  });
});
