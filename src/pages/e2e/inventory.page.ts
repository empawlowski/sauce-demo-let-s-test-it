import { inventoryData } from '@_src/assets/data/e2e/inventory.data';
import { BasePage } from '@_src/pages/e2e/base.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class InventoryPage extends BasePage {
  private readonly url: string = inventoryData.url;
  private readonly urlItem: string = inventoryData.urlItem;
  private readonly itemRegExp: RegExp = /add-to-cart-.+/;

  readonly fProductSort: Locator;
  readonly activeSortOption: Locator;
  readonly tableInventoryList: Locator;

  readonly title: Locator;
  readonly desc: Locator;
  readonly price: Locator;
  readonly img: Locator;
  readonly bAddToCart: Locator;
  readonly bAddToCartRegEx: Locator;
  readonly bRemove: Locator;

  constructor(page: Page) {
    super(page);
    this.fProductSort = page.getByTestId('product-sort-container');
    this.activeSortOption = page.getByTestId('active-option');
    this.tableInventoryList = page.getByTestId('inventory-list');

    this.title = page.getByTestId('inventory-item-name');
    this.desc = page.getByTestId('inventory-item-desc');
    this.price = page.getByTestId('inventory-item-price');
    this.img = page.locator('img.inventory_item_img');
    this.bAddToCart = page.getByRole('button', { name: inventoryData.bAddToCart, exact: true });
    this.bAddToCartRegEx = page.getByTestId(this.itemRegExp);
    this.bRemove = page.getByRole('button', { name: inventoryData.bRemove, exact: true });
  }

  getFirstTitle(): Locator {
    return this.title.first();
  }

  getSecondTitle(): Locator {
    return this.title.nth(1);
  }

  getFirstPrice(): Locator {
    return this.price.first();
  }

  getSecondPrice(): Locator {
    return this.price.nth(1);
  }

  getProductTitle(name: string): Locator {
    return this.title.getByText(name, { exact: true });
  }

  getTestIdReduceTitle(title: string): Locator {
    const reduceTitle = title.replaceAll(' ', '-').replace(/[(.)]/g, '\\$&').toLowerCase();
    return this.page.locator(`#add-to-cart-${reduceTitle}`);
  }

  async clickOnProductTitleFirst(): Promise<void> {
    await this.getFirstTitle().click();
  }

  async clickOnProductTitleName(name: string): Promise<void> {
    await this.getProductTitle(name).click();
  }

  async addToCart(title: string): Promise<void> {
    await this.getTestIdReduceTitle(title).click();
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
    await this.toHaveURL(this.url);
    await expect(this.header).toContainText(inventoryData.header);
    await expect(this.fProductSort).toBeVisible();
    await expect(this.tableInventoryList).toBeVisible();
  }

  async expectSortProductByName(titleFirst: string, titleSecond: string): Promise<void> {
    if (await this.activeSortOption.getByText(inventoryData.az).isVisible()) {
      expect(titleFirst.localeCompare(titleSecond)).toBeLessThanOrEqual(0);
    }
    if (await this.activeSortOption.getByText(inventoryData.za).isVisible()) {
      expect(titleFirst.localeCompare(titleSecond)).toBeGreaterThanOrEqual(0);
    }
  }

  async expectSortProductByPrice(priceFirst: string, priceSecond: string): Promise<void> {
    const reducePriceFirst = parseFloat(priceFirst.slice(1));
    const reducePriceSecond = parseFloat(priceSecond.slice(1));

    if (await this.activeSortOption.getByText(inventoryData.lowHi).isVisible()) {
      expect(reducePriceFirst).toBeLessThanOrEqual(reducePriceSecond);
    }
    if (await this.activeSortOption.getByText(inventoryData.hiLow).isVisible()) {
      expect(reducePriceFirst).toBeGreaterThanOrEqual(reducePriceSecond);
    }
  }

  async expectIncorrectImageOnProduct(link: string): Promise<void> {
    await this.toHaveURL(this.url);
    await expect(this.img.first()).toHaveAttribute('src', link);
  }
}
