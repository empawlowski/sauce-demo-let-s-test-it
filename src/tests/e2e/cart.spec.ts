import { loginData } from '@_src/assets/data/e2e/login.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { test } from '@_src/fixtures/base.fixture';
import { logger } from '@_src/helpers/logger.helper';
import * as allure from 'allure-js-commons';

test.describe('Cart', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.cart);

    // Arrange
    logger.info(`Running ${testInfo.title}`);
    // Act
    await login.goTo(loginData.inventoryURL);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);

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
