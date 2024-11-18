import { checkoutData } from '@_src/assets/data/e2e/checkout.data';
import { CheckoutUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/e2e/base.page';
import { CartPage } from '@_src/pages/e2e/cart.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
import { type Locator, type Page, expect } from '@playwright/test';

export class CheckoutPage extends BasePage {
  protected readonly page: Page;
  readonly fieldFirstName: Locator;
  readonly fieldLastName: Locator;
  readonly fieldPostalCode: Locator;
  readonly labelPaymentValue: Locator;
  readonly labelShippingValue: Locator;
  readonly labelSubTotalValue: Locator;
  readonly labelTaxValue: Locator;
  readonly labelTotalValue: Locator;

  readonly bCancel: Locator;
  readonly bContinue: Locator;
  readonly bFinish: Locator;

  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.fieldFirstName = this.page.locator('#first-name');
    this.fieldLastName = this.page.locator('#last-name');
    this.fieldPostalCode = this.page.locator('#postal-code');
    this.labelPaymentValue = this.page.getByTestId('payment-info-value');
    this.labelShippingValue = this.page.getByTestId('shipping-info-value');
    this.labelSubTotalValue = this.page.getByTestId('subtotal-label');
    this.labelTaxValue = this.page.getByTestId('tax-label');
    this.labelTotalValue = this.page.getByTestId('total-label');
    this.bCancel = this.page.locator('#cancel');
    this.bContinue = this.page.locator('#continue');
    this.bFinish = this.page.locator('#finish');
    this.error = this.page.getByTestId('error');
  }

  async fillFieldFirstName(firstName: string): Promise<void> {
    await this.fieldFirstName.fill(firstName);
  }

  async fillFielLastName(lastName: string): Promise<void> {
    await this.fieldLastName.fill(lastName);
  }

  async fillFieldPostalCode(code: string): Promise<void> {
    await this.fieldPostalCode.fill(code);
  }

  async clickContinue(): Promise<InventoryPage> {
    await this.bContinue.click();
    return new InventoryPage(this.page);
  }

  async clickCancel(): Promise<CartPage> {
    await this.bCancel.click();
    return new CartPage(this.page);
  }

  async fillCheckoutFields(userCheckout: CheckoutUserModel): Promise<void> {
    await this.fillFieldFirstName(userCheckout.firstName);
    await this.fillFielLastName(userCheckout.lastName);
    await this.fillFieldPostalCode(userCheckout.postalCode);
    await this.clickContinue();
  }

  async summaryTotalValue(sub: string, tax: string, total: string): Promise<void> {
    const sliceSub = parseFloat(sub.slice(13));
    const sliceTax = parseFloat(tax.slice(6));
    const sliceTotal = parseFloat(total.slice(8));
    expect(sliceSub + sliceTax).toBe(sliceTotal);
  }

  async clickFinish(): Promise<void> {
    await this.bFinish.click();
  }

  async expectCheckoutPage(url: string): Promise<void> {
    await this.toHaveURL(url);
    await expect(this.headerTitle).toContainText(checkoutData.header);
    await expect(this.fieldFirstName).toBeVisible();
    await expect(this.fieldLastName).toBeEditable();
    await expect(this.fieldPostalCode).toBeEditable();
    await expect(this.bCancel).toBeVisible();
    await expect(this.bContinue).toBeVisible();
  }

  async expectCheckoutStepTwoPage(url: string): Promise<void> {
    await this.toHaveURL(url);
    await expect(this.headerTitle).toContainText(checkoutData.headerStepTwo);
    await expect(this.labelPaymentValue).toContainText(checkoutData.paymentInformation);
    await expect(this.labelShippingValue).toContainText(checkoutData.shippingInformation);
    await expect(this.labelSubTotalValue).toContainText(checkoutData.priceTotal);
    await expect(this.labelTaxValue).toContainText(checkoutData.tax);
    await expect(this.labelTotalValue).toContainText(checkoutData.total);
    await expect(this.bFinish).toBeEnabled();
  }
}
