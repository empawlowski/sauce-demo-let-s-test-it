import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { checkoutData } from '../../data/tests/e2e/checkout.data';

export class CheckoutPage {
  constructor(private page: Page) {}
  base = new BasePage(this.page);

  //* Body
  fieldFirstName = this.page.locator('#first-name');
  fieldLastName = this.page.locator('#last-name');
  fieldPostalCode = this.page.locator('#postal-code');

  //* Footer
  bCancel = this.page.locator('#cancel');
  bContinue = this.page.locator('#continue');

  //* Error
  error = this.page.getByTestId('error');

  async fillFieldFirstName(firstName: string): Promise<void> {
    await this.fieldFirstName.fill(firstName);
  }

  async fillFielLastName(lastName: string): Promise<void> {
    await this.fieldLastName.fill(lastName);
  }

  async fillFieldPostalCode(code: string): Promise<void> {
    await this.fieldPostalCode.fill(code);
  }

  async clickContinue(): Promise<void> {
    await this.bContinue.click();
  }

  async catchError(error: string): Promise<void> {
    await expect(this.error).toContainText(error);
  }

  async expectCheckoutPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    await expect(this.base.header).toContainText(checkoutData.header);
    await expect(this.fieldFirstName).toBeVisible();
    await expect(this.fieldLastName).toBeEditable();
    await expect(this.fieldPostalCode).toBeEditable();
    await expect(this.bCancel).toBeVisible();
    await expect(this.bContinue).toBeVisible();
  }
}
