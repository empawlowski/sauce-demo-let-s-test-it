import { type Locator, type Page } from '@playwright/test';

export class SideBarComponent {
  private readonly page: Page;
  readonly bCrossMenu: Locator;
  readonly linkAllItems: Locator;
  readonly linkAbout: Locator;
  readonly linkLogout: Locator;
  readonly linkResetAppState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bCrossMenu = this.page.locator('#react-burger-cross-btn');
    this.linkAllItems = this.page.locator('#inventory_sidebar_link');
    this.linkAbout = this.page.locator('#about_sidebar_link');
    this.linkLogout = this.page.locator('#logout_sidebar_link');
    this.linkResetAppState = this.page.locator('#reset_sidebar_link');
  }

  async clickButtonCrossMenu(): Promise<void> {
    await this.bCrossMenu.click();
  }

  async clickLinkLogout(): Promise<void> {
    await this.linkLogout.click();
  }

  async clickLinkResetAppState(): Promise<void> {
    await this.linkResetAppState.click();
  }
}
