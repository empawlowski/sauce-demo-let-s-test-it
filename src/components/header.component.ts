import { baseData } from '@_src/assets/data/e2e/base.data';
import { CartPage } from '@_src/pages/e2e/cart.page';
import { type Page, expect } from '@playwright/test';

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

  async clickShoppingCart(): Promise<CartPage> {
    await this.bShoppingCart.click();
    return new CartPage(this.page);
  }

  async isBadgeVisible(): Promise<void> {
    await expect(this.badgeShoppingCart).toBeVisible();
  }

  async expectBadgeWithNumber(number: number): Promise<void> {
    await expect(this.badgeShoppingCart).toBeVisible();
    await expect(this.badgeShoppingCart).toContainText(number.toString());
  }

  async isBadgeHidden(): Promise<void> {
    await expect(this.badgeShoppingCart).toBeHidden();
  }
}
