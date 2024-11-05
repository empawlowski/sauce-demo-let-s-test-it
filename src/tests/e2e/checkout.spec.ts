import { checkoutData } from '@_src/assets/data/e2e/checkout.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { visualData } from '@_src/assets/data/ui/visual.data';
import { Configuration } from '@_src/config/configuration';
import { createCheckoutUser } from '@_src/factories/user.factory';
import { test } from '@_src/fixtures/base.fixture';
import { faker } from '@faker-js/faker';

const { allure } = require('allure-playwright');

test.describe('Checkout', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.checkout);

    // Arrange
    console.log(`Running ${testInfo.title}`);
    // Act
    await login.logIn(Configuration.user, Configuration.password);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Validation Checkout page', { tag: [report.tags.smoke] }, async ({ header, cart, checkout }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const url = checkoutData.urlStepOne;
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
      const error = checkoutData.errorFirstName;
      // Act
      await checkout.clickContinue();
      // Assert
      await base.catchError(error);
    });
    test('Empty Last Name field', async ({ checkout, base }) => {
      await allure.owner(report.owner.mrp);
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
      await allure.owner(report.owner.mrp);
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

  test.describe('Checkout process', { tag: [report.tags.smoke] }, () => {
    test('Continue process from Checkout', async ({ header, inventory, cart }) => {
      await allure.owner(report.owner.mrp);

      await test.step('Step 1: Add products to basket', async () => {
        // Arrange
        const firstTitle = await inventory.getFirstTitle().innerText();
        const secondTitle = await inventory.getSecondTitle().innerText();
        const titles = [firstTitle, secondTitle];
        // Act
        for (const title of titles) {
          await inventory.addToCart(title);
        }
        // Assert
        await header.isBadgeVisible();
      });

      await test.step('Step 2: Open basket and click Continue Shopping button', async () => {
        // Act
        await header.clickShoppingCart();
        // Assert
        await cart.expectCartPage();
        // Act
        await cart.clickContinueShopping();
      });

      await test.step('Step 3: Check redirect to Inventory page', async () => {
        // Assert
        await inventory.expectInventoryPage();
      });
    });

    test('Checkout process with Cancel', async ({ header, inventory, cart, checkout }) => {
      await allure.owner(report.owner.mrp);

      await test.step('Step 1: Add products to basket', async () => {
        // Arrange
        const firstTitle = await inventory.getFirstTitle().innerText();
        const secondTitle = await inventory.getSecondTitle().innerText();
        const titles = [firstTitle, secondTitle];
        // Act
        for (const title of titles) {
          await inventory.addToCart(title);
        }
        // Assert
        await header.isBadgeVisible();
      });

      await test.step('Step 2: Open basket and go to checkout', async () => {
        // Act
        await header.clickShoppingCart();
        await cart.clickCheckout();
      });

      await test.step('Step 3: Fill checkout step one', async () => {
        // Arrange
        const userCheckoutModel = createCheckoutUser('female');

        // Act
        await checkout.fillCheckoutFields(userCheckoutModel);
      });

      await test.step('Step 4: Fill checkout step one', async () => {
        // Act
        await checkout.clickCancel();
      });
    });

    test('Checkout process with Success', async ({ header, inventory, cart, checkout, completed }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      let products: number = await inventory.bAddToCart.count();

      await test.step('Step 1: Add products to basket', async () => {
        // Act
        for (let i = 0; i < products; i++) {
          await inventory.clickAddToCartFirst();
        }
      });
      await test.step('Step 2: Open basket and go to checkout', async () => {
        // Act
        await header.clickShoppingCart();
        await header.expectBadgeWithNumber(products);
        await cart.clickCheckout();
      });
      await test.step('Step 3: Fill checkout step one', async () => {
        // Arrange
        const userCheckoutModel = createCheckoutUser();

        // Act
        await checkout.fillCheckoutFields(userCheckoutModel);
      });

      await test.step('Check payment summary', async () => {
        // Act
        await checkout.expectCheckoutStepTwoPage(checkoutData.urlStepTwo);
        await checkout.clickFinish();
      });

      await test.step('Verify your order', async () => {
        // Assert
        await completed.expectCheckoutCompletePage(checkoutData.urlComplete);
        // Act
        await completed.clickBackHome();
      });
    });

    test('Checkout process with payment verification', async ({ header, inventory, cart, checkout }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      let products: number = await inventory.bAddToCart.count();

      await test.step('Step 1: Add products to basket', async () => {
        // Act
        for (let i = 0; i < products; i++) {
          await inventory.clickAddToCartFirst();
        }
      });

      await test.step('Step 2: Open basket and go to checkout', async () => {
        // Act
        await header.clickShoppingCart();
        await header.expectBadgeWithNumber(products);
        await cart.clickCheckout();
      });

      await test.step('Step 3: Fill checkout step one', async () => {
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

      await test.step('Step 4: Verify the payment', async () => {
        // Arrange
        const sub = await checkout.labelSubTotalValue.innerText();
        const tax = await checkout.labelTaxValue.innerText();
        const total = await checkout.labelTotalValue.innerText();
        // Assert
        await checkout.summaryTotalValue(sub, tax, total);
      });
    });
  });
});

test.describe('Checkout with errors', { tag: [report.tags.regression, report.tags.visual] }, () => {
  test.beforeEach('Add running test title', async ({}, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.checkout);

    console.log(`Running ${testInfo.title}`);
  });
  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Visual effect for page', async ({ login, header, cart, checkout }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    const screenshot = visualData.checkout;
    // Act
    await login.logIn(Configuration.userVisual, Configuration.password);
    await header.clickShoppingCart();
    await cart.clickCheckout();
    // Assert
    await checkout.expectHaveScreenshot(screenshot);
  });
});
