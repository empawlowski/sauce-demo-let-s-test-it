import { test } from '../../components/fixtures/base';
import { authData } from '../../.env/.auth/auth.data';
import { checkoutData } from '../../data/tests/e2e/checkout.data';

let user: string = authData.standard;
let password: string = authData.password;

test.describe('Checkout', { tag: '@reg' }, () => {
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
  test('Validation Checkout page', async ({ header, cart, checkout }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    // Act
    await header.clickShoppingCart();
    await cart.clickCheckout();
    // Assert
    await checkout.expectCheckoutPage();
  });

  test.describe('Empty fields - error validation', { tag: '@smoke' }, () => {
    test.beforeEach('Open Cart page', async ({ header, cart }) => {
      await header.clickShoppingCart();
      await cart.clickCheckout();
    });

    test('Empty Fist Name field', async ({ checkout }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const error = checkoutData.errorFirstName;
      // Act
      await checkout.clickContinue();
      // Assert
      await checkout.catchError(error);
    });
    test('Empty Last Name field', async ({ checkout }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const firstName = 'a';
      const error = checkoutData.errorLastName;
      // Act
      await checkout.fillFieldFirstName(firstName);
      await checkout.clickContinue();
      // Assert
      await checkout.catchError(error);
    });

    test('Empty Postal Code field', async ({ checkout }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const firstName = 'a';
      const lastName = 'a';
      const error = checkoutData.errorPostalCode;
      // Act
      await checkout.fillFieldFirstName(firstName);
      await checkout.fillFielLastName(lastName);
      await checkout.clickContinue();
      // Assert
      await checkout.catchError(error);
    });
  });
});
