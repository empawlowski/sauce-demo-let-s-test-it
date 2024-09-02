import { BasePage } from '@_src/pages/e2e/base.page';
import { inventoryData } from '@_src/test-data/tests/e2e/inventory.data';
import { Locator, Page, expect } from '@playwright/test';

export class InventoryPage extends BasePage {
  readonly url: string = inventoryData.url;
  readonly urlItem: string = inventoryData.urlItem;
  readonly fProductSort: Locator;
  readonly activeSortOption: Locator;
  readonly tableInventoryList: Locator;

  readonly title: Locator;
  readonly desc: Locator;
  readonly price: Locator;
  readonly img: Locator;
  readonly bAddToCart: Locator;
  readonly bRemove: Locator;

  readonly titleFirst: Locator;
  readonly titleSecond: Locator;
  readonly priceFirst: Locator;
  readonly priceSecond: Locator;

  readonly linkBackToProducts: Locator = this.page.locator('#back-to-products');
  readonly imgDetail: Locator = this.page.locator('.inventory_details_img');

  constructor(page: Page) {
    super(page);
    this.fProductSort = this.page.getByTestId('product-sort-container');
    this.activeSortOption = this.page.getByTestId('active-option');
    this.tableInventoryList = this.page.getByTestId('inventory-list');

    this.title = this.page.getByTestId('inventory-item-name');
    this.desc = this.page.getByTestId('inventory-item-desc');
    this.price = this.page.getByTestId('inventory-item-price');
    this.img = this.page.locator('img.inventory_item_img');
    this.bAddToCart = this.page.getByRole('button', {
      name: inventoryData.bAddToCart,
      exact: true,
    });
    this.bRemove = this.page.getByRole('button', {
      name: inventoryData.bRemove,
      exact: true,
    });

    this.titleFirst = this.title.first();
    this.titleSecond = this.title.nth(1);
    this.priceFirst = this.price.first();
    this.priceSecond = this.price.nth(1);

    this.linkBackToProducts = this.page.locator('#back-to-products');
    this.imgDetail = this.page.locator('.inventory_details_img');
  }

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
    await this.toHaveURL(this.url);
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
    await this.toHaveURL(new RegExp(this.urlItem));
    await expect(this.linkBackToProducts).toBeVisible();
    await expect(this.title).toContainText(title);
    await expect(this.desc).toContainText(desc);
    await expect(this.price).toContainText(price);
    await expect(this.imgDetail).toHaveAttribute('src', link);
    await expect(this.bAddToCart.or(this.bRemove)).toBeVisible();
  }

  async expectIncorrectImageOnProduct(link: string): Promise<void> {
    await this.toHaveURL(this.url);
    await expect(this.img.first()).toHaveAttribute('src', link);
  }
}
