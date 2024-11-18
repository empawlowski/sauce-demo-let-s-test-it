import { BasePage } from '@_src/pages/e2e/base.page';
import { InventoryPage } from '@_src/pages/e2e/inventory.page';
import { type Locator, type Page } from '@playwright/test';

export class LoginPage extends BasePage {
  protected readonly page: Page;
  readonly fieldUsername: Locator;
  readonly fieldPassword: Locator;
  readonly bLogin: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.fieldUsername = this.page.locator('#user-name');
    this.fieldPassword = this.page.locator('#password');
    this.bLogin = this.page.locator('#login-button');
  }

  async fillUsername(user: string): Promise<void> {
    await this.fieldUsername.fill(user);
  }

  async fillPassword(password: string): Promise<void> {
    await this.fieldPassword.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.bLogin.click();
  }

  async logIn(user: string, password: string): Promise<InventoryPage> {
    await this.goTo();
    await this.fillUsername(user);
    await this.fillPassword(password);
    await this.clickLogin();
    return new InventoryPage(this.page);
  }

  async logInWithoutCredentials(): Promise<void> {
    await this.goTo();
    await this.clickLogin();
  }

  async logInWithoutUsername(password: string): Promise<void> {
    await this.goTo();
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async logInWithoutPassword(user: string): Promise<void> {
    await this.goTo();
    await this.fillUsername(user);
    await this.clickLogin();
  }
}
