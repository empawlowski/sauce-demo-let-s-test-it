import { Page } from '@playwright/test';

export class SideBarComponent {
  constructor(private page: Page) {}

  bCrossMenu = this.page.locator('#react-burger-cross-btn');
  linkAllItems = this.page.locator('#inventory_sidebar_link');
  linkAbout = this.page.locator('#about_sidebar_link');
  linkLogout = this.page.locator('#logout_sidebar_link');
  linkResetAppState = this.page.locator('#reset_sidebar_link');

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
