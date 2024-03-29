import { authData } from '../../.env/.auth/auth.data';
import { test } from '../../components/fixtures/base';
import { inventoryData } from '../../data/tests/e2e/inventory.data';

let user: string = authData.standard;
let password: string = authData.password;

test.describe('Inventory @reg', () => {
  test.beforeEach(async ({ login, header }) => {
    // await allure.epic(report.epic.analysis);
    // await allure.feature(report.feature.tm);
    // await allure.tag(report.tag.dealer);

    // Arrange

    // Act
    await login.logIn(user, password);
    // Assert
    await header.expectLogo();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test('Inventory page - validation', async ({ inventory }) => {
    // await allure.owner(report.owner.mrp);
    // Arrange
    // Act
    // Assert
    await inventory.expectInventoryPage();
  });
  test.describe('Product sorting', () => {
    test('Sort by Name (A to Z)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.az;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProduct();
    });

    test('Sort by Name (Z to A)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.za;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProduct();
    });

    test('Sort by Price (low to high)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.lowHi;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProduct();
    });

    test('Sort by Price (high to low)', async ({ inventory }) => {
      // await allure.owner(report.owner.mrp);
      // Arrange
      const sort = inventoryData.hiLow;
      // Act
      await inventory.sortProduct(sort);
      // Assert
      await inventory.expectSortProduct();
    });
  });
});