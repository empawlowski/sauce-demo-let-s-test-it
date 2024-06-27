import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  fieldUsername = this.page.locator('#user-name');
  fieldPassword = this.page.locator('#password');
  bLogin = this.page.locator('#login-button');

  async fillUsername(user: string): Promise<void> {
    await this.fieldUsername.fill(user);
  }

  async fillPassword(password: string): Promise<void> {
    await this.fieldPassword.fill(password);
  }

  async logIn(user: string, password: string): Promise<void> {
    await this.page.goto('/');
    await this.fillUsername(user);
    await this.fillPassword(password);
    await this.bLogin.click();
  }

  async logInWithoutCredentials(): Promise<void> {
    await this.page.goto('/');
    await this.bLogin.click();
  }

  async logInWithoutUsername(password: string): Promise<void> {
    await this.page.goto('/');
    await this.fillPassword(password);
    await this.bLogin.click();
  }

  async logInWithoutPassword(user: string): Promise<void> {
    await this.page.goto('/');
    await this.fillUsername(user);
    await this.bLogin.click();
  }
}
