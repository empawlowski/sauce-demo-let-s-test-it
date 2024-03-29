import { Page, expect } from '@playwright/test';
import { baseData } from '../data/tests/e2e/base.data';

export class HeaderComponent {
  constructor(private page: Page) {}

  bSidebarMenu = this.page.locator('#menu_button_container');
  appLogo = this.page.locator('.app_logo');
  bShoppingCart = this.page.locator('#shopping_cart_container');

  async expectLogo(): Promise<void> {
    await expect(this.appLogo).toContainText(baseData.appLogo);
  }
}
