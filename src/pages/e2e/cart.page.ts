import { cartData } from '@_src/assets/data/e2e/cart.data';
import { BasePage } from '@_src/pages/e2e/base.page';
import { CheckoutPage } from '@_src/pages/e2e/checkout.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
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

  async clickContinueShopping(): Promise<InventoryPage> {
    await this.bContinueShopping.click();
    return new InventoryPage(this.page);
  }

  async clickCheckout(): Promise<CheckoutPage> {
    await this.bCheckout.click();
    return new CheckoutPage(this.page);
  }

  async expectCartPage(): Promise<void> {
    await this.toHaveURL(this.url);
    await expect(this.header).toContainText(cartData.header);
    await expect(this.cartList).toBeVisible();
    await expect(this.bContinueShopping).toBeVisible();
    await expect(this.bContinueShopping).toBeVisible();
  }
}
