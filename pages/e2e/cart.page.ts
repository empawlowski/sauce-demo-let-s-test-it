import { cartData } from '../../data/tests/e2e/cart.data';
import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';

export class CartPage extends BasePage {
  base = new BasePage(this.page);

  constructor(page: Page) {
    super(page);
  }

  //* Body
  cartList = this.page.getByTestId('cart-list');

  //* Footer
  bContinueShopping = this.page.locator('#continue-shopping');
  bCheckout = this.page.locator('#checkout');

  async clickContinueShopping(): Promise<void> {
    await this.bContinueShopping.click();
  }

  async clickCheckout(): Promise<void> {
    await this.bCheckout.click();
  }

  async expectCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart.html/);
    await expect(this.header).toContainText(cartData.header);
    await expect(this.cartList).toBeVisible();
    await expect(this.bContinueShopping).toBeVisible();
    await expect(this.bContinueShopping).toBeVisible();
  }
}
