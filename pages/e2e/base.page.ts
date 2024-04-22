import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(private page: Page) {}

  //* Header
  header = this.page.getByTestId('title');

  //* Error
  error = this.page.getByTestId('error');

  async catchError(error: string): Promise<void> {
    await expect(this.error).toContainText(error);
  }
}
