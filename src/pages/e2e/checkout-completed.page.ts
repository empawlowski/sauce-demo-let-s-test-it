import { checkoutData } from '@_src/assets/data/e2e/checkout.data';
import { BasePage } from '@_src/pages/e2e/base.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class CheckoutCompletedPage extends BasePage {
  protected readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly bBackHome: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.completeHeader = page.getByTestId('complete-header');
    this.completeText = page.getByTestId('complete-text');
    this.bBackHome = page.locator('#back-to-products');
  }

  async clickBackHome(): Promise<InventoryPage> {
    await this.bBackHome.click();
    return new InventoryPage(this.page);
  }

  async expectCheckoutCompletePage(url: string): Promise<void> {
    await this.toHaveURL(url);
    await expect(this.headerTitle).toContainText(checkoutData.headerComplete);
    await expect(this.completeHeader).toContainText(checkoutData.completeHeader);
    await expect(this.completeText).toContainText(checkoutData.completeText);
    await expect(this.bBackHome).toBeEnabled();
  }
}
