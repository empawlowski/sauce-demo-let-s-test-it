import { FooterComponent } from '@_src/components/footer.component';
import { HeaderComponent } from '@_src/components/header.component';
import { SideBarComponent } from '@_src/components/sidebar.component';
import { AccessibilityPage } from '@_src/pages/accessibility/accessibility.page';
import { BasePage } from '@_src/pages/e2e/base.page';
import { CartPage } from '@_src/pages/e2e/cart.page';
import { CheckoutPage } from '@_src/pages/e2e/checkout.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
import { LoginPage } from '@_src/pages/e2e/login.page';
import { test as baseTest } from '@playwright/test';

type pages = {
  login: LoginPage;
  base: BasePage;
  header: HeaderComponent;
  sidebar: SideBarComponent;
  inventory: InventoryPage;
  cart: CartPage;
  checkout: CheckoutPage;
  footer: FooterComponent;
  accessibility: AccessibilityPage;
};

const basePages = baseTest.extend<pages>({
  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  base: async ({ page }, use) => {
    await use(new BasePage(page));
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
  footer: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },
  accessibility: async ({ page }, use) => {
    await use(new AccessibilityPage(page));
  },
});

export const test = basePages;
export const expect = basePages.expect;
