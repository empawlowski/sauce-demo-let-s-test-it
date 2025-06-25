import { Page } from '@playwright/test';

export class BaseView {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
