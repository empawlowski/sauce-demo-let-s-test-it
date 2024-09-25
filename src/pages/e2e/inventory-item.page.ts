import { BasePage } from '@_src/pages/e2e/base.page';
import { inventoryData } from '@_src/test-data/tests/e2e/inventory.data';
import { Locator, Page, expect } from '@playwright/test';

export class InventoryItemPage extends BasePage {
  readonly url: string = inventoryData.urlItem;
  readonly title: Locator;
  readonly desc: Locator;
  readonly price: Locator;
  readonly imgDetail: Locator;
  readonly bAddToCart: Locator;
  readonly bRemove: Locator;
  readonly linkBackToProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.linkBackToProducts = this.page.locator('#back-to-products');
    this.title = this.page.getByTestId('inventory-item-name');
    this.desc = this.page.getByTestId('inventory-item-desc');
    this.price = this.page.getByTestId('inventory-item-price');
    this.imgDetail = this.page.locator('.inventory_details_img');
    this.bAddToCart = this.page.getByRole('button', {
      name: inventoryData.bAddToCart,
      exact: true,
    });
    this.bRemove = this.page.getByRole('button', {
      name: inventoryData.bRemove,
      exact: true,
    });
  }

  async expectSingleProductPage(title: string, desc: string, price: string, link: string): Promise<void> {
    await this.toHaveURL(new RegExp(this.url));
    await expect(this.linkBackToProducts).toBeVisible();
    await expect(this.title).toContainText(title);
    await expect(this.desc).toContainText(desc);
    await expect(this.price).toContainText(price);
    await expect(this.imgDetail).toHaveAttribute('src', link);
    await expect(this.bAddToCart.or(this.bRemove)).toBeVisible();
  }
}
