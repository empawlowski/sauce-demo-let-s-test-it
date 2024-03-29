import { Page } from '@playwright/test';

export class BasePage {
  constructor(private page: Page) {}

  header = this.page.getByTestId('title');
}
