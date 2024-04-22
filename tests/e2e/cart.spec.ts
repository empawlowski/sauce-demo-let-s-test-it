import { authData } from '../../.env/.auth/auth.data';
import { test } from '../../components/fixtures/base';

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

  test.describe('Function with product', () => {
    test('Add product to basket', async ({ header, inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      //Act
      await inventory.titleFirst.isVisible();
      const title = (await inventory.titleFirst.innerText()).replaceAll(' ', '-').toLowerCase();
      await inventory.addToCart(title);
      // Assert
      await header.expectBadge();
    });
    test('Remove product from basket', async ({ header, inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      await test.step('Add product to basket', async () => {
        // Act
        await inventory.clickAddToCartFirst();
        // Assert
        await header.expectBadge();
      });
      await test.step('Remove from basket', async () => {
        // Act
        await header.clickShoppingCart();
        await inventory.clickRemove();
        // Assert
        await header.expectNoBadge();
      });
    });
  });
});
