import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  fieldUsername = this.page.locator('#user-name');
  fieldPassword = this.page.locator('#password');
  bLogin = this.page.locator('#login-button');

  async logIn(user: string, password: string): Promise<void> {
    await this.page.goto('/');
    await this.fieldUsername.fill(user);
    await this.fieldPassword.fill(password);
    await this.bLogin.click();
  }
}
