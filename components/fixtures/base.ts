import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../../pages/e2e/login.page';
import { HeaderComponent } from '../header.component';
import { SideBarComponent } from '../sidebar.component';
import { InventoryPage } from '../../pages/e2e/inventory.page';
import { CartPage } from '../../pages/e2e/cart.page';
import { CheckoutPage } from '../../pages/e2e/checkout.page';

type pages = {
  login: LoginPage;
  header: HeaderComponent;
  sidebar: SideBarComponent;
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
};

const basePages = baseTest.extend<pages>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SideBarComponent(page));
  },
  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export const test = basePages;
export const expect = basePages.expect;
