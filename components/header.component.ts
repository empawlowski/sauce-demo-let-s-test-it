import { baseData } from '../data/tests/e2e/base.data';
import { Page, expect } from '@playwright/test';

export class HeaderComponent {
  constructor(private page: Page) {}

  bSidebarMenu = this.page.locator('#menu_button_container');
  appLogo = this.page.locator('.app_logo');
  bShoppingCart = this.page.getByTestId('shopping-cart-link');
  badgeShoppingCart = this.page.getByTestId('shopping-cart-badge');

  async expectLogo(): Promise<void> {
    await expect(this.appLogo).toContainText(baseData.appLogo);
  }

  async clickShoppingCart(): Promise<void> {
    await this.bShoppingCart.click();
  }

  async expectBadge(): Promise<void> {
    await expect(this.badgeShoppingCart).toBeVisible();
  }

  async expectBadgeWithNumber(number: string): Promise<void> {
    await expect(this.badgeShoppingCart).toBeVisible();
    await expect(this.badgeShoppingCart).toContainText(number);
  }

  async expectNoBadge(): Promise<void> {
    await expect(this.badgeShoppingCart).toBeHidden();
  }
}
