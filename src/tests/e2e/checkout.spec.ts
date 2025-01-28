import { checkoutData } from '@_src/assets/data/e2e/checkout.data';
import { loginData } from '@_src/assets/data/e2e/login.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { createCheckoutUser } from '@_src/factories/user.factory';
import { test } from '@_src/fixtures/base.fixture';
import { logger } from '@_src/helpers/logger.helper';
import { CheckoutUserModel } from '@_src/models/user.model';
import * as allure from 'allure-js-commons';

test.describe('Checkout', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.checkout);

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

  test('Validation Checkout page', { tag: [report.tags.smoke] }, async ({ header, cart, checkout }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const url: string = checkoutData.urlStepOne;
    // Act
    await header.clickShoppingCart();
    await cart.clickCheckout();
    // Assert
    await checkout.expectCheckoutPage(url);
  });

  test.describe('Empty fields - error validation', { tag: [report.tags.smoke] }, () => {
    test.beforeEach('Open Cart page', async ({ header, cart }) => {
      await header.clickShoppingCart();
      await cart.clickCheckout();
    });

    test('Empty Fist Name field', async ({ checkout, base }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const error: string = checkoutData.errorFirstName;
      // Act
      await checkout.clickContinue();
      // Assert
      await base.catchError(error);
    });
    test('Empty Last Name field', async ({ checkout, base }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const userData: CheckoutUserModel = createCheckoutUser();
      const error: string = checkoutData.errorLastName;
      // Act
      await checkout.fillFieldFirstName(userData.firstName);
      await checkout.clickContinue();
      // Assert
      await base.catchError(error);
    });

    test('Empty Postal Code field', async ({ checkout, base }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const userData: CheckoutUserModel = createCheckoutUser();
      const error: string = checkoutData.errorPostalCode;
      // Act
      await checkout.fillFieldFirstName(userData.firstName);
      await checkout.fillFielLastName(userData.lastName);
      await checkout.clickContinue();
      // Assert
      await base.catchError(error);
    });
  });

  test.describe('Checkout process', { tag: [report.tags.smoke] }, () => {
    test('Continue process from Checkout', async ({ header, inventory, cart }) => {
      await allure.owner(report.owner.mrp);

      await test.step('Thread 1: Add products to basket', async () => {
        // Arrange
        const firstTitle: string = await inventory.getFirstTitle().innerText();
        const secondTitle: string = await inventory.getSecondTitle().innerText();
        const titles: string[] = [firstTitle, secondTitle];
        // Act
        for (const title of titles) {
          await inventory.addToCart(title);
        }
        // Assert
        await header.isBadgeVisible();
      });

      await test.step('Thread 2: Open basket and click Continue Shopping button', async () => {
        // Act
        await header.clickShoppingCart();
        // Assert
        await cart.expectCartPage();
        // Act
        await cart.clickContinueShopping();
      });

      await test.step('Thread 3: Check redirect to Inventory page', async () => {
        // Assert
        await inventory.expectInventoryPage();
      });
    });

    test('Checkout process with Cancel', async ({ header, inventory, cart, checkout }) => {
      await allure.owner(report.owner.mrp);

      await test.step('Thread 1: Add products to basket', async () => {
        // Arrange
        const firstTitle: string = await inventory.getFirstTitle().innerText();
        const secondTitle: string = await inventory.getSecondTitle().innerText();
        const titles: string[] = [firstTitle, secondTitle];
        // Act
        for (const title of titles) {
          await inventory.addToCart(title);
        }
        // Assert
        await header.isBadgeVisible();
      });

      await test.step('Thread 2: Open basket and go to checkout', async () => {
        // Act
        await header.clickShoppingCart();
        await cart.clickCheckout();
      });

      await test.step('Thread 3: Fill checkout step one', async () => {
        // Arrange
        const userCheckoutModel: CheckoutUserModel = createCheckoutUser('female');

        // Act
        await checkout.fillCheckoutFields(userCheckoutModel);
      });

      await test.step('Thread 4: Fill checkout step one', async () => {
        // Act
        await checkout.clickCancel();
      });
    });

    test('Checkout process with Success', async ({ header, inventory, cart, checkout, completed }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const products: number = await inventory.bAddToCart.count();

      await test.step('Thread 1: Add products to basket', async () => {
        // Act
        for (let i = 0; i < products; i++) {
          await inventory.clickAddToCartFirst();
        }
      });
      await test.step('Thread 2: Open basket and go to checkout', async () => {
        // Act
        await header.clickShoppingCart();
        await header.expectBadgeWithNumber(products);
        await cart.clickCheckout();
      });
      await test.step('Thread 3: Fill checkout step one', async () => {
        // Arrange
        const userCheckoutModel: CheckoutUserModel = createCheckoutUser();

        // Act
        await checkout.fillCheckoutFields(userCheckoutModel);
      });

      await test.step('Thread 4: Check payment summary', async () => {
        // Act
        await checkout.expectCheckoutStepTwoPage(checkoutData.urlStepTwo);
        await checkout.clickFinish();
      });

      await test.step('Thread 5: Verify your order', async () => {
        // Assert
        await completed.expectCheckoutCompletePage(checkoutData.urlComplete);
        // Act
        await completed.clickBackHome();
      });
    });

    test('Checkout process with payment verification', async ({ header, inventory, cart, checkout }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const products: number = await inventory.bAddToCart.count();

      await test.step('Thread 1: Add products to basket', async () => {
        // Act
        for (let i = 0; i < products; i++) {
          await inventory.clickAddToCartFirst();
        }
      });

      await test.step('Thread 2: Open basket and go to checkout', async () => {
        // Act
        await header.clickShoppingCart();
        await header.expectBadgeWithNumber(products);
        await cart.clickCheckout();
      });

      await test.step('Thread 3: Fill checkout step one', async () => {
        // Arrange
        const userData: CheckoutUserModel = createCheckoutUser();

        // Act
        await checkout.fillFieldFirstName(userData.firstName);
        await checkout.fillFielLastName(userData.lastName);
        await checkout.fillFieldPostalCode(userData.postalCode);
        await checkout.clickContinue();
      });

      await test.step('Thread 4: Verify the payment', async () => {
        // Arrange
        const sub: string = await checkout.labelSubTotalValue.innerText();
        const tax: string = await checkout.labelTaxValue.innerText();
        const total: string = await checkout.labelTotalValue.innerText();
        // Assert
        await checkout.summaryTotalValue(sub, tax, total);
      });
    });
  });
});
