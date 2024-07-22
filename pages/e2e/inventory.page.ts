import { inventoryData } from '../../data/tests/e2e/inventory.data';
import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';

export class InventoryPage extends BasePage {
  base = new BasePage(this.page);

  constructor(page: Page) {
    super(page);
  }

  //* Header
  fProductSort = this.page.getByTestId('product-sort-container');
  activeSortOption = this.page.getByTestId('active-option');

  //* Inventory page
  //* Product body
  tableInventoryList = this.page.getByTestId('inventory-list');
  title = this.page.getByTestId('inventory-item-name');
  desc = this.page.getByTestId('inventory-item-desc');
  price = this.page.getByTestId('inventory-item-price');
  img = this.page.locator('img.inventory_item_img');
  bAddToCart = this.page.getByRole('button', { name: inventoryData.bAddToCart, exact: true });
  bRemove = this.page.getByRole('button', { name: inventoryData.bRemove, exact: true });
  //? Products section
  titleFirst = this.title.first();
  titleSecond = this.title.nth(1);
  priceFirst = this.price.first();
  priceSecond = this.price.nth(1);

  //* Inventory item page
  linkBackToProducts = this.page.locator('#back-to-products');
  imgDetail = this.page.locator('.inventory_details_img');

  async clickOnProductTitleFirst(): Promise<void> {
    await this.title.first().click();
  }

  async clickOnProductTitleName(name: string): Promise<void> {
    await this.title.getByText(name, { exact: true }).click();
  }

  async addToCart(title: string): Promise<void> {
    await this.page.locator(`#add-to-cart-${title}`).click();
  }

  async clickAddToCartFirst(): Promise<void> {
    await this.bAddToCart.first().click();
  }

  async clickRemove(): Promise<void> {
    await this.bRemove.click();
  }

  async sortProduct(sort: string): Promise<void> {
    await this.fProductSort.selectOption(sort);
  }

  async expectInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.header).toContainText(inventoryData.header);
    await expect(this.fProductSort).toBeVisible();
    await expect(this.tableInventoryList).toBeVisible();
  }

  async expectSortProductByName(): Promise<void> {
    const titleFirst = await this.titleFirst.innerText();
    const titleSecond = await this.titleSecond.innerText();

    if (await this.activeSortOption.getByText(inventoryData.az).isVisible()) {
      expect(titleFirst.localeCompare(titleSecond)).toBeLessThanOrEqual(0);
    }
    if (await this.activeSortOption.getByText(inventoryData.za).isVisible()) {
      expect(titleFirst.localeCompare(titleSecond)).toBeGreaterThanOrEqual(0);
    }
  }

  async expectSortProductByPrice(): Promise<void> {
    const priceFirst = parseFloat((await this.priceFirst.innerText()).slice(1));
    const priceSecond = parseFloat((await this.priceSecond.innerText()).slice(1));

    if (await this.activeSortOption.getByText(inventoryData.lowHi).isVisible()) {
      expect(priceFirst).toBeLessThanOrEqual(priceSecond);
    }
    if (await this.activeSortOption.getByText(inventoryData.hiLow).isVisible()) {
      expect(priceFirst).toBeGreaterThanOrEqual(priceSecond);
    }
  }

  async expectSingleProductPage(title: string, desc: string, price: string, link: string): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory-item.html/);
    await expect(this.linkBackToProducts).toBeVisible();
    await expect(this.title).toContainText(title);
    await expect(this.desc).toContainText(desc);
    await expect(this.price).toContainText(price);
    await expect(this.imgDetail).toHaveAttribute('src', link);
    await expect(this.bAddToCart.or(this.bRemove)).toBeVisible();
  }

  async expectIncorrectImageOnProduct(link: string): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.img.first()).toHaveAttribute('src', link);
  }
}
