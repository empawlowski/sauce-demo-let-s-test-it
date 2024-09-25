import { CheckoutUserModel } from '@_src/models/user.model';
import { BasePage } from '@_src/pages/e2e/base.page';
import { CartPage } from '@_src/pages/e2e/cart.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
import { checkoutData } from '@_src/test-data/tests/e2e/checkout.data';
import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage extends BasePage {
  readonly fieldFirstName: Locator;
  readonly fieldLastName: Locator;
  readonly fieldPostalCode: Locator;
  readonly labelPaymentValue: Locator;
  readonly labelShippingValue: Locator;
  readonly labelSubTotalValue: Locator;
  readonly labelTaxValue: Locator;
  readonly labelTotalValue: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  readonly bCancel: Locator;
  readonly bContinue: Locator;
  readonly bFinish: Locator;
  // readonly bBackHome: Locator;

  readonly error = this.page.getByTestId('error');

  constructor(page: Page) {
    super(page);
    this.fieldFirstName = this.page.locator('#first-name');
    this.fieldLastName = this.page.locator('#last-name');
    this.fieldPostalCode = this.page.locator('#postal-code');
    this.labelPaymentValue = this.page.getByTestId('payment-info-value');
    this.labelShippingValue = this.page.getByTestId('shipping-info-value');
    this.labelSubTotalValue = this.page.getByTestId('subtotal-label');
    this.labelTaxValue = this.page.getByTestId('tax-label');
    this.labelTotalValue = this.page.getByTestId('total-label');
    // this.completeHeader = this.page.getByTestId('complete-header');
    // this.completeText = this.page.getByTestId('complete-text');
    this.bCancel = this.page.locator('#cancel');
    this.bContinue = this.page.locator('#continue');
    this.bFinish = this.page.locator('#finish');
    // this.bBackHome = this.page.locator('#back-to-products');
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

  async summaryTotalValue(sub: number, tax: number, total: number): Promise<void> {
    // const sub = parseFloat((await this.labelSubTotalValue.innerText()).slice(13));
    // const tax = parseFloat((await this.labelTaxValue.innerText()).slice(6));
    // const total = parseFloat((await this.labelTotalValue.innerText()).slice(8));
    await expect(sub + tax).toEqual(total);
  }

  async clickFinish(): Promise<void> {
    await this.bFinish.click();
  }

  // async clickBackHome(): Promise<InventoryPage> {
  //   await this.bBackHome.click();
  //   return new InventoryPage(this.page);
  // }

  async expectCheckoutPage(url: string): Promise<void> {
    await this.toHaveURL(url);
    await expect(this.header).toContainText(checkoutData.header);
    await expect(this.fieldFirstName).toBeVisible();
    await expect(this.fieldLastName).toBeEditable();
    await expect(this.fieldPostalCode).toBeEditable();
    await expect(this.bCancel).toBeVisible();
    await expect(this.bContinue).toBeVisible();
  }

  async expectCheckoutStepTwoPage(url: string): Promise<void> {
    await this.toHaveURL(url);
    await expect(this.header).toContainText(checkoutData.headerStepTwo);
    await expect(this.labelPaymentValue).toContainText(checkoutData.paymentInformation);
    await expect(this.labelShippingValue).toContainText(checkoutData.shippingInformation);
    await expect(this.labelSubTotalValue).toContainText(checkoutData.priceTotal);
    await expect(this.labelTaxValue).toContainText(checkoutData.tax);
    await expect(this.labelTotalValue).toContainText(checkoutData.total);
    await expect(this.bFinish).toBeEnabled();
  }

  // async expectCheckoutCompletePage(url: string): Promise<void> {
  //   await this.toHaveURL(url);
  //   await expect(this.header).toContainText(checkoutData.headerComplete);
  //   await expect(this.completeHeader).toContainText(checkoutData.completeHeader);
  //   await expect(this.completeText).toContainText(checkoutData.completeText);
  //   await expect(this.bBackHome).toBeEnabled();
  // }
}
