import { authData } from '../../.env/.auth/auth.data';
import { test } from '../../components/fixtures/base';
import * as report from '../../data/report/playwright.data.json';
import { visualData } from '../../data/tests/ui/visual.data';

let user: string = authData.standard;
let visual_user: string = authData.visual;
let password: string = authData.password;

test.describe('Cart', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    // await allure.epic(report.epic.analysis);
    // await allure.feature(report.feature.tm);
    // await allure.tag(report.tag.dealer);

    // Arrange
    console.log(`Running ${testInfo.title}`);
    // Act
    await login.logIn(user, password);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Validation Cart page', { tag: [report.tags.smoke] }, async ({ cart, header }) => {
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

test.describe('Cart with errors', { tag: report.tags.regression }, () => {
  test.beforeEach('Add running test title', async ({}, testInfo) => {
    console.log(`Running ${testInfo.title}`);
  });
  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Visual effect for page', async ({ login, header, base }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    const screenshot = visualData.cart;
    // Act
    await login.logIn(visual_user, password);
    await header.clickShoppingCart();
    // Assert
    await base.expectHaveScreenshot(screenshot);
  });
});
