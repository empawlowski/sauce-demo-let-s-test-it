import { test } from '../../components/fixtures/base';
import { authData } from '../../.env/.auth/auth.data';
import { inventoryData } from '../../data/tests/e2e/inventory.data';

let user: string = authData.standard;
let password: string = authData.password;

test.describe('Inventory', { tag: '@reg' }, () => {
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
  test('Validation Inventory page', async ({ inventory }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    // Act
    // Assert
    await inventory.expectInventoryPage();
  });
  test.describe('Product sorting', { tag: '@smoke' }, () => {
    test('Sort by Name (A to Z)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.az;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByName();
    });

    test('Sort by Name (Z to A)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.za;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByName();
    });

    test('Sort by Price (low to high)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.lowHi;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByPrice();
    });

    test('Sort by Price (high to low)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.hiLow;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProductByPrice();
    });
  });

  test.describe('Add products - different methods', { tag: '@smoke' }, () => {
    test('Adding by Title - all', async ({ header, inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      let products = await inventory.title.count();

      // Act
      for (let i = 0; i < products; i++) {
        const title = (await inventory.title.nth(i).innerText()).replaceAll(' ', '-').replace(/[(.)]/g, '\\$&').toLowerCase();
        await inventory.addToCart(title);
      }

      // Assert
      await header.expectBadgeWithNumber(products.toString());
    });

    test('Adding by Title - one', async ({ header, inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const name = 'Test.allTheThings() T-Shirt (Red)';
      // Act
      await inventory.addToCart(name.replaceAll(' ', '-').replace(/[(.)]/g, '\\$&').toLowerCase());

      // Assert
      await header.expectBadgeWithNumber('1');
    });

    test('Adding by button "Add to cart" - first', async ({ header, inventory }) => {
      // await allure.owner(report.owner.mrp);
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
      //! It not possible to add more than 3 products, strange.
      // await allure.owner(report.owner.mrp);
      // Arrange
      const products = await inventory.bAddToCart.count();
      console.log('Number of product/s on page:', products);
      // Act
      for (let i = 0; i < products - 3; i++) {
        await inventory.clickAddToCartNotFirst(i);
      }
      // Assert
      await header.expectBadgeWithNumber((products - 3).toString());
    });
  });
});
