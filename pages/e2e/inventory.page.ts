import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { inventoryData } from '../../data/tests/e2e/inventory.data';

export class InventoryPage {
  constructor(private page: Page) {}
  base = new BasePage(this.page);

  //* Header
  fProductSort = this.page.getByTestId('product-sort-container');
  activeSortOption = this.page.getByTestId('active-option');

  //* Product body
  tableInventoryList = this.page.getByTestId('inventory-list');
  title = this.page.getByTestId('inventory-item-name');
  desc = this.page.getByTestId('inventory-item-desc');
  price = this.page.getByTestId('inventory-item-price');
  bAddToCart = this.page.getByRole('button', { name: inventoryData.bAddToCart, exact: true });

  async addToCart(title: string): Promise<void> {
    await this.page.locator(`#add-to-cart-${title}`);
  }

  async sortProduct(sort: string): Promise<void> {
    await this.fProductSort.selectOption(sort);
  }

  async expectInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.base.header).toContainText(inventoryData.header);
    await expect(this.fProductSort).toBeVisible();
    await expect(this.tableInventoryList).toBeVisible();
  }

  async expectSortProduct(): Promise<void> {
    const titleFirst = await this.title.first().innerText();
    const titleSecond = await this.title.nth(1).innerText();
    const priceFirst = await this.price.first().innerText();
    const priceSecond = await this.price.nth(1).innerText();

    if (await this.activeSortOption.getByText(inventoryData.az).isVisible()) {
      const sorting = titleFirst.localeCompare(titleSecond) <= 0;
      expect(sorting).toBeTruthy();
    }

    if (await this.activeSortOption.getByText(inventoryData.za).isVisible()) {
      const sorting = titleFirst.localeCompare(titleSecond) >= 0;
      expect(sorting).toBeTruthy();
    }

    if (await this.activeSortOption.getByText(inventoryData.lowHi).isVisible()) {
      const summary = parseFloat(priceFirst.slice(1)) <= parseFloat(priceSecond.slice(1));
      expect(summary).toBeTruthy();
    }

    if (await this.activeSortOption.getByText(inventoryData.hiLow).isVisible()) {
      const summary = parseFloat(priceFirst.slice(1)) >= parseFloat(priceSecond.slice(1));
      expect(summary).toBeTruthy();
    }
  }
}
