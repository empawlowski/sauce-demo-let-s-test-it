import { authData } from '../../.env/.auth/auth.data';
import { test } from '../../components/fixtures/base';
import * as report from '../../data/report/playwright.data.json';
import { visualData } from '../../data/tests/ui/visual.data';

let user: string = authData.standard;
let password: string = authData.password;

test.describe('Visual screenshot for pages', { tag: [report.tags.visual] }, async () => {
  test.beforeEach('Login method', async ({ login, header }) => {
    // await allure.epic(report.epic.analysis);
    // await allure.feature(report.feature.tm);
    // await allure.tag(report.tag.dealer);

    // Arrange

    // Act
    await login.logIn(user, password);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }) => {
    await base.closePage();
  });

  test('Inventory', async ({ base }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    const screenshot = visualData.inventory;
    // Act
    // Assert
    await base.takeScreenshot(screenshot);
  });

  test('Cart', async ({ base, header }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    const screenshot = visualData.cart;
    // Act
    await header.clickShoppingCart();
    // Assert
    await base.takeScreenshot(screenshot);
  });

  test('Checkout', async ({ base, header, cart }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    const screenshot = visualData.checkout;
    // Act
    await header.clickShoppingCart();
    await cart.clickCheckout();
    // Assert
    await base.takeScreenshot(screenshot);
  });
});
