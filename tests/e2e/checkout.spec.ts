import { authData } from '../../.env/.auth/auth.data';
import { test } from '../../components/fixtures/base';
import { checkoutData } from '../../data/tests/e2e/checkout.data';
import { faker } from '@faker-js/faker';

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

  test.afterEach('Close the page', async ({ base, page }) => {
    await base.resetApp();
    await base.logoutFromApp();
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

    test('Empty Fist Name field', async ({ checkout, base }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const error = checkoutData.errorFirstName;
      // Act
      await checkout.clickContinue();
      // Assert
      await base.catchError(error);
    });
    test('Empty Last Name field', async ({ checkout, base }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const firstName = faker.person.firstName();
      const error = checkoutData.errorLastName;
      // Act
      await checkout.fillFieldFirstName(firstName);
      await checkout.clickContinue();
      // Assert
      await base.catchError(error);
    });

    test('Empty Postal Code field', async ({ checkout, base }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const error = checkoutData.errorPostalCode;
      // Act
      await checkout.fillFieldFirstName(firstName);
      await checkout.fillFielLastName(lastName);
      await checkout.clickContinue();
      // Assert
      await base.catchError(error);
    });
  });

  test.describe('Checkout process', { tag: '@smoke' }, () => {
    test('Checkout process with Cancel', async ({ header, inventory, cart, checkout }) => {
      // await allure.owner(report.owner.mrp);
      await test.step('Add products to basket', async () => {
        // Arrange
        await inventory.titleFirst.isVisible();
        const titleOne = (await inventory.titleFirst.innerText()).replaceAll(' ', '-').toLowerCase();
        await inventory.titleSecond.isVisible();
        const titleTwo = (await inventory.titleSecond.innerText()).replaceAll(' ', '-').toLowerCase();
        const titles = [titleOne, titleTwo];
        // Act
        for (const title of titles) {
          await inventory.addToCart(title);
        }
        // Assert
        await header.expectBadge();
      });
      await test.step('Open basket and go to checkout', async () => {
        await header.clickShoppingCart();
        await cart.clickCheckout();
      });
      await test.step('Fill checkout step one', async () => {
        // Arrange
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const code = faker.location.zipCode();
        // Act
        await checkout.fillFieldFirstName(firstName);
        await checkout.fillFielLastName(lastName);
        await checkout.fillFieldPostalCode(code);
        await checkout.clickContinue();
      });
      await test.step('Fill checkout step one', async () => {
        await checkout.clickCancel();
      });
    });
    test('Checkout process with Success', async ({ header, inventory, cart, checkout }) => {
      // await allure.owner(report.owner.mrp);
      // Act
      let products = await inventory.bAddToCart.count();

      await test.step('Add products to basket', async () => {
        // Arrange
        for (let i = 0; i < products; i++) {
          await inventory.clickAddToCartFirst();
        }
      });
      await test.step('Open basket and go to checkout', async () => {
        // Arrange
        await header.clickShoppingCart();
        await header.expectBadgeWithNumber(products.toString());
        await cart.clickCheckout();
      });
      await test.step('Fill checkout step one', async () => {
        // Act
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const code = faker.location.zipCode();

        // Arrange
        await checkout.fillFieldFirstName(firstName);
        await checkout.fillFielLastName(lastName);
        await checkout.fillFieldPostalCode(code);
        await checkout.clickContinue();
      });
      await test.step('Check payment summary', async () => {
        await checkout.expectCheckoutStepTwoPage();
        await checkout.clickFinish();
      });
      await test.step('Verify your order', async () => {
        await checkout.expectCheckoutCompletePage();
        await checkout.clickBackHome();
      });
    });
    test('Checkout process with payment verification', async ({ header, inventory, cart, checkout }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      let products = await inventory.bAddToCart.count();

      await test.step('Add products to basket', async () => {
        // Act
        for (let i = 0; i < products; i++) {
          await inventory.clickAddToCartFirst();
        }
      });
      await test.step('Open basket and go to checkout', async () => {
        // Act
        await header.clickShoppingCart();
        await header.expectBadgeWithNumber(products.toString());
        await cart.clickCheckout();
      });
      await test.step('Fill checkout step one', async () => {
        // Arrange
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const code = faker.location.zipCode();
        // Act
        await checkout.fillFieldFirstName(firstName);
        await checkout.fillFielLastName(lastName);
        await checkout.fillFieldPostalCode(code);
        await checkout.clickContinue();
      });
      await test.step('Verify the payment', async () => {
        // Arrange
        const sub = parseFloat((await checkout.labelSubTotalValue.innerText()).slice(13));
        const tax = parseFloat((await checkout.labelTaxValue.innerText()).slice(6));
        const total = parseFloat((await checkout.labelTotalValue.innerText()).slice(8));
        // Act
        await checkout.summaryTotalValue(sub, tax, total);
        // Assert
        console.log(`Item total: $${sub} + Tax: $${tax} = Total: $${total}`);
      });
    });
  });
});
