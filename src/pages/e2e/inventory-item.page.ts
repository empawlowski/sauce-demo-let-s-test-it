import { inventoryData } from '@_src/assets/data/e2e/inventory.data';
import { SingleProductModel } from '@_src/models/inventory.model';
import { BasePage } from '@_src/pages/e2e/base.page';
import { type Locator, type Page, expect } from '@playwright/test';

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
    this.linkBackToProducts = page.locator('#back-to-products');
    this.title = page.getByTestId('inventory-item-name');
    this.desc = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.imgDetail = page.locator('.inventory_details_img');
    this.bAddToCart = page.getByRole('button', { name: inventoryData.bAddToCart, exact: true });
    this.bRemove = page.getByRole('button', { name: inventoryData.bRemove, exact: true });
  }

  async expectSingleProductPage(product: SingleProductModel): Promise<void> {
    await this.toHaveURL(new RegExp(this.url));
    await expect(this.linkBackToProducts).toBeVisible();
    await expect(this.title).toContainText(product.title);
    await expect(this.desc).toContainText(product.desc);
    await expect(this.price).toContainText(product.price);
    await expect(this.imgDetail).toHaveAttribute('src', product.link);
    await expect(this.bAddToCart.or(this.bRemove)).toBeVisible();
  }
}
