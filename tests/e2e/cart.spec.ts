import { test } from '../../components/fixtures/base';
import { authData } from '../../.env/.auth/auth.data';

let user: string = authData.standard;
let password: string = authData.password;

test.describe('Cart', { tag: '@reg' }, () => {
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

  test.afterEach('Close the page', async ({ page }) => {
    await page.close();
  });
  test('Validation Cart page', async ({ cart, header }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    // Act
    await header.clickShoppingCart();
    // Assert
    await cart.expectCartPage();
  });

  test('Add product to basket', async ({ header, inventory }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    //Act
    await inventory.titleFirst.isVisible();
    const title = (await inventory.titleFirst.innerText()).split(' ').join('-').toLowerCase();
    await inventory.addToCart(title);
    // Assert
    await header.expectBadge();
  });

  test.describe('', { tag: '@smoke' }, () => {
    test('', async ({ cart }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      // Act
      // Assert
    });
  });
});
