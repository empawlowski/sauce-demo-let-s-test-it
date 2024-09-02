import { BasePage } from '@_src/pages/e2e/base.page';
import { cartData } from '@_src/test-data/tests/e2e/cart.data';
import { Locator, Page, expect } from '@playwright/test';

export class CartPage extends BasePage {
  url = cartData.url;
  readonly cartList: Locator;
  readonly bContinueShopping: Locator;
  readonly bCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.cartList = this.page.getByTestId('cart-list');
    this.bContinueShopping = this.page.locator('#continue-shopping');
    this.bCheckout = this.page.locator('#checkout');
  }

  async clickContinueShopping(): Promise<void> {
    await this.bContinueShopping.click();
  }

  async clickCheckout(): Promise<void> {
    await this.bCheckout.click();
  }

  async expectCartPage(): Promise<void> {
    await this.toHaveURL(this.url);
    await expect(this.header).toContainText(cartData.header);
    await expect(this.cartList).toBeVisible();
    await expect(this.bContinueShopping).toBeVisible();
    await expect(this.bContinueShopping).toBeVisible();
  }
}
