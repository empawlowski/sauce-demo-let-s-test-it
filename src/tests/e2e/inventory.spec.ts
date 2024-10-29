import * as product from '@_src/assets/data/e2e/inventory-item.data.json';
import { inventoryData } from '@_src/assets/data/e2e/inventory.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { visualData } from '@_src/assets/data/ui/visual.data';
import { Configuration } from '@_src/config/configuration';
import { test } from '@_src/fixtures/base.fixture';

const { allure } = require('allure-playwright');

test.describe('Inventory', { tag: report.tags.regression }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.inventory);

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

  test('Validation Inventory page', { tag: [report.tags.smoke] }, async ({ inventory }) => {
    await allure.owner(report.owner.mrp);

    // Assert
    await inventory.expectInventoryPage();
  });
  test.describe('Products sorting', () => {
    test('Sort by Name (A to Z)', async ({ inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.az;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByName();
    });

    test('Sort by Name (Z to A)', async ({ inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.za;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByName();
    });

    test('Sort by Price (low to high)', async ({ inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.lowHi;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByPrice();
    });

    test('Sort by Price (high to low)', async ({ inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.hiLow;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByPrice();
    });
  });

  test.describe('Add products - different methods', () => {
    test('Adding by Title - all', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      let products = await inventory.title.count();

      // Act
      for (let i = 0; i < products; i++) {
        const title = (await inventory.title.nth(i).innerText())
          .replaceAll(' ', '-')
          .replace(/[(.)]/g, '\\$&')
          .toLowerCase();
        await inventory.addToCart(title);
      }

      // Assert
      await header.expectBadgeWithNumber(products.toString());
    });

    test('Adding by Title - one', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const name = 'Test.allTheThings() T-Shirt (Red)';
      // Act
      await inventory.addToCart(name.replaceAll(' ', '-').replace(/[(.)]/g, '\\$&').toLowerCase());

      // Assert
      await header.expectBadgeWithNumber('1');
    });

    test('Adding by button "Add to cart" - first', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const products = await inventory.bAddToCart.count();
      console.log('Number of product/s on page:', products);
      // Act
      for (let i = 0; i < products; i++) {
        await inventory.clickAddToCartFirst();
      }
      // Assert
      await header.expectBadgeWithNumber(products.toString());
    });

    test('Adding by button "Add to cart" - all', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const products = await inventory.bAddToCart.count();
      // Act
      for (let i = 0; i < products; i++) {
        await inventory.clickAddToCartFirst();
      }

      // Assert
      await header.expectBadgeWithNumber(products.toString());
    });
  });

  test('Single product view', async ({ inventory, item }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const title = product[4].title;
    const desc = product[4].desc;
    const price = product[4].price;
    const link = product[4].link;
    // Act
    await inventory.clickOnProductTitleFirst();
    // Assert
    await item.expectSingleProductPage(title, desc, price, link);
  });
});

test.describe('Inventory with errors', { tag: [report.tags.regression, report.tags.visual] }, () => {
  test.beforeEach('Add running test title', async ({}, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.inventory);

    console.log(`Running ${testInfo.title}`);
  });
  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Wrong image link for product', async ({ login, inventory }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const link = product[6].link;
    // Act
    await login.logIn(Configuration.userProblem, Configuration.password);
    // Assert
    await inventory.expectIncorrectImageOnProduct(link);
  });

  test('Visual effect for page', async ({ login, base }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    test.fail(); //? added to not create a failure report
    const screenshot = visualData.inventory;
    // Act
    await login.logIn(Configuration.userVisual, Configuration.password);
    // Assert
    await base.expectHaveScreenshot(screenshot);
  });
});
