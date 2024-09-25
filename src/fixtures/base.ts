import { FooterComponent } from '@_src/components/footer.component';
import { HeaderComponent } from '@_src/components/header.component';
import { SideBarComponent } from '@_src/components/sidebar.component';
import { AccessibilityPage } from '@_src/pages/accessibility/accessibility.page';
import { BasePage } from '@_src/pages/e2e/base.page';
import { CartPage } from '@_src/pages/e2e/cart.page';
import { CheckoutCompletedPage } from '@_src/pages/e2e/checkout-completed.page';
import { CheckoutPage } from '@_src/pages/e2e/checkout.page';
import { InventoryItemPage } from '@_src/pages/e2e/inventory-item.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
import { LoginPage } from '@_src/pages/e2e/login.page';
import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';

type pages = {
  login: LoginPage;
  base: BasePage;
  header: HeaderComponent;
  sidebar: SideBarComponent;
  inventory: InventoryPage;
  item: InventoryItemPage;
  cart: CartPage;
  checkout: CheckoutPage;
  // checkout: CheckoutPage;
  completed: CheckoutCompletedPage;
  footer: FooterComponent;
  accessibility: AccessibilityPage;
  a11y: () => AxeBuilder;
};

export const test = base.extend<pages>({
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
  footer: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },
  accessibility: async ({ page }, use) => {
    await use(new AccessibilityPage(page));
  },
  a11y: async ({ page }, use, testInfo) => {
    const a11y = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('#commonly-reused-element-with-known-issue');
    await use(a11y);
  },
});

// export const test = basePages;
// export const expect = basePages.expect;
export { expect } from '@playwright/test';
