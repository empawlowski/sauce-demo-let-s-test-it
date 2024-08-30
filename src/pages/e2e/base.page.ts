import { screenshotPath } from '../../../utils/screenshotPath';
import { HeaderComponent } from '../../components/header.component';
import { SideBarComponent } from '../../components/sidebar.component';
import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  readonly headerComponent: HeaderComponent;
  readonly sidebarComponent: SideBarComponent;

  readonly header: Locator;
  readonly error: Locator;

  constructor(protected page: Page) {
    this.headerComponent = new HeaderComponent(this.page);
    this.sidebarComponent = new SideBarComponent(this.page);
    //* Header
    this.header = this.page.getByTestId('title');
    //* Error
    this.error = this.page.getByTestId('error');
  }

  async toHaveURL(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  async catchError(error: string): Promise<void> {
    await expect(this.error).toContainText(error);
  }

  async scrollDown(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async scrollUp(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  //* Screenshot

  async takeScreenshot(screenshot: string): Promise<void> {
    await this.page.screenshot({
      path: `${screenshotPath}${screenshot}`,
      fullPage: true,
    });
  }

  async expectHaveScreenshot(screenshot: string): Promise<void> {
    await expect(this.page).toHaveScreenshot(screenshot, { fullPage: true });
  }

  //* Sidebar

  async resetApp(): Promise<void> {
    await this.headerComponent.clickSideBarMenu();
    await this.sidebarComponent.clickLinkResetAppState();
    await this.sidebarComponent.clickButtonCrossMenu();
  }

  async logoutFromApp(): Promise<void> {
    await this.headerComponent.clickSideBarMenu();
    await this.sidebarComponent.clickLinkLogout();
  }

  async closePage(): Promise<void> {
    await this.page.close();
  }
}
