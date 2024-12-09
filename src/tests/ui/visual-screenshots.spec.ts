import { loginData } from '@_src/assets/data/e2e/login.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { visualData } from '@_src/assets/data/ui/visual.data';
import { test } from '@_src/fixtures/base.fixture';
import * as allure from 'allure-js-commons';

test.describe('Visual screenshot for pages', { tag: [report.tags.visual] }, () => {
  test.beforeEach('Login method', async ({ login, header }) => {
    await allure.epic(report.epic.application);
    await allure.epic(report.feature.ui);
    await allure.epic(report.story.ui);
    // Act
    await login.goTo(loginData.inventoryURL);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }) => {
    await base.closePage();
  });

  test('Inventory', async ({ base }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const screenshot = visualData.inventory;
    // Act
    // Assert
    await base.takeScreenshot(screenshot);
  });

  test('Cart', async ({ base, header }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const screenshot = visualData.cart;
    // Act
    await header.clickShoppingCart();
    // Assert
    await base.takeScreenshot(screenshot);
  });

  test('Checkout', async ({ base, header, cart }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const screenshot = visualData.checkout;
    // Act
    await header.clickShoppingCart();
    await cart.clickCheckout();
    // Assert
    await base.takeScreenshot(screenshot);
  });
});
