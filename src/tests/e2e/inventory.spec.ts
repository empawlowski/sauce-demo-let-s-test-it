import * as product from '@_src/assets/data/e2e/inventory-item.data.json';
import { inventoryData } from '@_src/assets/data/e2e/inventory.data';
import { loginData } from '@_src/assets/data/e2e/login.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { Configuration } from '@_src/config/configuration';
import { type Locator, expect, test } from '@_src/fixtures/base.fixture';
import { logger } from '@_src/helpers/logger.helper';
import { SingleProductModel } from '@_src/models/inventory.model';
import * as allure from 'allure-js-commons';

test.describe('Inventory', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.inventory);

    // Arrange
    logger.info(`Running ${testInfo.title}`);
    // Act
    await login.goTo(loginData.inventoryURL);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    // Arrange
    logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);
    // Act
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
      const sort: string = inventoryData.az;
      // Act
      await inventory.sortProduct(sort);
      const titleFirst: string = await inventory.getFirstTitle().innerText();
      const titleSecond: string = await inventory.getSecondTitle().innerText();

      // Assert
      await inventory.expectSortProductByName(titleFirst, titleSecond);
    });

    test('Sort by Name (Z to A)', async ({ inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const sort: string = inventoryData.za;

      // Act
      await inventory.sortProduct(sort);
      const titleFirst: string = await inventory.getFirstTitle().innerText();
      const titleSecond: string = await inventory.getSecondTitle().innerText();

      // Assert
      await inventory.expectSortProductByName(titleFirst, titleSecond);
    });

    test('Sort by Price (low to high)', async ({ inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const sort: string = inventoryData.lowHi;
      // Act
      await inventory.sortProduct(sort);
      const priceFirst: string = await inventory.getFirstPrice().innerText();
      const priceSecond: string = await inventory.getSecondPrice().innerText();
      // Assert
      await inventory.expectSortProductByPrice(priceFirst, priceSecond);
    });

    test('Sort by Price (high to low)', async ({ inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const sort: string = inventoryData.hiLow;
      // Act
      await inventory.sortProduct(sort);
      const priceFirst: string = await inventory.getFirstPrice().innerText();
      const priceSecond: string = await inventory.getSecondPrice().innerText();
      // Assert
      await inventory.expectSortProductByPrice(priceFirst, priceSecond);
    });
  });

  test.describe('Add products - different methods', () => {
    test('Adding by Title - all', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const products: number = await inventory.title.count();

      // Act
      for (let i = 0; i < products; i++) {
        const title: string = await inventory.title.nth(i).innerText();
        await inventory.addToCart(title);
      }

      // Assert
      await header.expectBadgeWithNumber(products);
    });

    test('Adding by Title - one', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const name: string = 'Test.allTheThings() T-Shirt (Red)';
      // Act
      await inventory.addToCart(name);

      // Assert
      await header.expectBadgeWithNumber(1);
    });

    test('Adding by button "Add to cart" - count', async ({ header, inventory }) => {
      await allure.owner(report.owner.mrp);
      // Arrange
      const products: number = await inventory.bAddToCart.count();
      // Act
      for (let i = 0; i < products; i++) {
        await inventory.clickAddToCartFirst();
      }

      // Assert
      await header.expectBadgeWithNumber(products);
    });
  });

  test('Single product view', async ({ inventory, item }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const singleProduct: SingleProductModel = {
      title: product[4].title,
      desc: product[4].desc,
      price: product[4].price,
      link: product[4].link,
    };

    // Act
    await inventory.clickOnProductTitleFirst();
    // Assert
    await item.expectSingleProductPage(singleProduct);
  });
});

test.describe('Inventory with errors', { tag: [report.tags.regression, report.tags.visual] }, () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach('Add running test title', async () => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.inventory);

    logger.info(`Running ${test.info().title}`);
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Adding by button "Add to cart" - all', async ({ login, inventory, header }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    let productAdded: number = 0;
    await login.logIn(Configuration.user, Configuration.password);

    const productList: number = await inventory.bAddToCart.count();
    const products: Locator[] = await inventory.bAddToCartRegEx.all();

    // Act
    for (const product of products) {
      if ((await product.isVisible()) && (await product.isEnabled())) {
        await product.click();
        productAdded++;
      } else {
        logger.warn('Button not visible or enabled', product);
      }
    }

    // Assert
    await header.expectBadgeWithNumber(productAdded);
    //? Assert for console warning
    expect.soft(productAdded).toBeLessThanOrEqual(productList);
  });

  test('Wrong image link for product', async ({ login, inventory }) => {
    await allure.owner(report.owner.mrp);
    // Arrange
    const link: string = product[6].link;
    // Act
    await login.logIn(Configuration.userProblem, Configuration.password);
    // Assert
    await inventory.expectIncorrectImageOnProduct(link);
  });
});
