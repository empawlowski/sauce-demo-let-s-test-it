import { AccessibilityPage } from '@_src/pages/accessibility/accessibility.page';
import { BasePage } from '@_src/pages/e2e/base.page';
import { CartPage } from '@_src/pages/e2e/cart.page';
import { CheckoutCompletedPage } from '@_src/pages/e2e/checkout-completed.page';
import { CheckoutPage } from '@_src/pages/e2e/checkout.page';
import { InventoryItemPage } from '@_src/pages/e2e/inventory-item.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
import { LoginPage } from '@_src/pages/e2e/login.page';
import { test as pagesTest } from '@playwright/test';

interface Pages {
  login: LoginPage;
  base: BasePage;
  inventory: InventoryPage;
  item: InventoryItemPage;
  cart: CartPage;
  checkout: CheckoutPage;
  // checkout: CheckoutPage;
  completed: CheckoutCompletedPage;
  accessibility: AccessibilityPage;
}

export const pages = pagesTest.extend<Pages>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  base: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  item: async ({ page }, use) => {
    await use(new InventoryItemPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  completed: async ({ page }, use) => {
    await use(new CheckoutCompletedPage(page));
  },
  accessibility: async ({}, use) => {
    await use(new AccessibilityPage());
  },
});
