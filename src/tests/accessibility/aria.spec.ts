import { loginData } from '@_src/assets/data/e2e/login.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { test } from '@_src/fixtures/base.fixture';
import { logger } from '@_src/helpers/logger.helper';
import * as allure from 'allure-js-commons';

test.describe('ARIA Snapshots', { tag: [report.tags.regression, report.tags.aria] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.accessibility);
    await allure.feature(report.feature.aria);
    await allure.owner(report.owner.mrp);

    // Arrange
    logger.info(`Running ${testInfo.title}`);
    // Act
    await login.goTo(loginData.inventoryURL);
    // Assert
    await header.expectLogo();
  });

  test('ARIA for Inventory page', async ({ base }) => {
    await base.toMatchAriaSnapshot('inventory');
  });

  test('ARIA for Cart page', async ({ header, cart }) => {
    await header.clickShoppingCart();
    await cart.toMatchAriaSnapshot('cart');
  });

  test('ARIA for Checkout page', async ({ header, cart, checkout }) => {
    await header.clickShoppingCart();
    await cart.clickCheckout();
    await checkout.toMatchAriaSnapshot('checkout');
  });
});
