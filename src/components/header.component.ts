import { baseData } from '@_src/assets/data/e2e/base.data';
import { CartPage } from '@_src/pages/e2e/cart.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class HeaderComponent {
  readonly bSideBarMenu: Locator;
  readonly appLogo: Locator;
  readonly bShoppingCart: Locator;
  readonly badgeShoppingCart: Locator;

  constructor(private page: Page) {
    this.bSideBarMenu = this.page.locator('#react-burger-menu-btn');
    this.appLogo = this.page.locator('.app_logo');
    this.bShoppingCart = this.page.locator('#shopping_cart_container');
    this.badgeShoppingCart = this.page.getByTestId('shopping-cart-badge');
  }

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
