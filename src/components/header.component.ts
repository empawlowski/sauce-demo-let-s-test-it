import { baseData } from '@_src/test-data/tests/e2e/base.data';
import { Page, expect } from '@playwright/test';

export class HeaderComponent {
  constructor(private page: Page) {}

  bSideBarMenu = this.page.locator('#react-burger-menu-btn');
  appLogo = this.page.locator('.app_logo');
  bShoppingCart = this.page.locator('#shopping_cart_container');
  badgeShoppingCart = this.page.getByTestId('shopping-cart-badge');

  async clickSideBarMenu(): Promise<void> {
    await this.bSideBarMenu.click();
  }

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
