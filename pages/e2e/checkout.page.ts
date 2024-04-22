import { checkoutData } from '../../data/tests/e2e/checkout.data';
import { BasePage } from './base.page';
import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}
  base = new BasePage(this.page);

  //* Body
  //? Step One
  fieldFirstName = this.page.locator('#first-name');
  fieldLastName = this.page.locator('#last-name');
  fieldPostalCode = this.page.locator('#postal-code');
  //? Step Two
  labelPaymentValue = this.page.getByTestId('payment-info-value');
  labelShippingValue = this.page.getByTestId('shipping-info-value');
  labelSubTotalValue = this.page.getByTestId('subtotal-label');
  labelTaxValue = this.page.getByTestId('tax-label');
  labelTotalValue = this.page.getByTestId('total-label');
  //? Complete
  completeHeader = this.page.getByTestId('complete-header');
  completeText = this.page.getByTestId('complete-text');

  //* Footer
  bCancel = this.page.locator('#cancel');
  bContinue = this.page.locator('#continue');
  //? Step Two
  bFinish = this.page.locator('#finish');
  //? Complete
  bBackHome = this.page.locator('#back-to-products');

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

  async clickCancel(): Promise<void> {
    await this.bCancel.click();
  }

  async catchError(error: string): Promise<void> {
    await expect(this.error).toContainText(error);
  }

  async summaryTotalValue(sub: number, tax: number, total: number): Promise<void> {
    // const sub = parseFloat((await this.labelSubTotalValue.innerText()).slice(13));
    // const tax = parseFloat((await this.labelTaxValue.innerText()).slice(6));
    // const total = parseFloat((await this.labelTotalValue.innerText()).slice(8));
    expect(sub + tax).toEqual(total);
  }

  async clickFinish(): Promise<void> {
    await this.bFinish.click();
  }

  async clickBackHome(): Promise<void> {
    await this.bBackHome.click();
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

  async expectCheckoutStepTwoPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
    await expect(this.base.header).toContainText(checkoutData.headerStepTwo);
    await expect(this.labelPaymentValue).toContainText(checkoutData.paymentInformation);
    await expect(this.labelShippingValue).toContainText(checkoutData.shippingInformation);
    await expect(this.labelSubTotalValue).toContainText(checkoutData.priceTotal);
    await expect(this.labelTaxValue).toContainText(checkoutData.tax);
    await expect(this.labelTotalValue).toContainText(checkoutData.total);
    await expect(this.bFinish).toBeEnabled();
  }

  async expectCheckoutCompletePage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.base.header).toContainText(checkoutData.headerComplete);
    await expect(this.completeHeader).toContainText(checkoutData.completeHeader);
    await expect(this.completeText).toContainText(checkoutData.completeText);
    await expect(this.bBackHome).toBeEnabled();
  }
}
