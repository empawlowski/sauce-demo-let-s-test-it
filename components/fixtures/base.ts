import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../../pages/e2e/login.page';
import { SideBarComponent } from '../sidebar.component';
import { InventoryPage } from '../../pages/e2e/inventory.page';
import { HeaderComponent } from '../header.component';

type pages = {
  login: LoginPage;
  header: HeaderComponent;
  sidebar: SideBarComponent;
  inventory: InventoryPage;
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
});

export const test = basePages;
export const expect = basePages.expect;
