import { HeaderComponent } from '../../components/header.component';
import { SideBarComponent } from '../../components/sidebar.component';
import { screenshotPath } from '../../utils/screenshotPath';
import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(private page: Page) {}
  headerComponent = new HeaderComponent(this.page);
  sidebar = new SideBarComponent(this.page);

  //* Header
  header = this.page.getByTestId('title');

  //* Error
  error = this.page.getByTestId('error');

  //* Page
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
    await this.page.screenshot({ path: `${screenshotPath}${screenshot}`, fullPage: true });
  }

  async expectHaveScreenshot(screenshot: string): Promise<void> {
    await expect(this.page).toHaveScreenshot(screenshot, { fullPage: true });
  }

  //* Sidebar

  async resetApp(): Promise<void> {
    await this.headerComponent.clickSideBarMenu();
    await this.sidebar.clickLinkResetAppState();
    await this.sidebar.clickButtonCrossMenu();
  }

  async logoutFromApp(): Promise<void> {
    await this.headerComponent.clickSideBarMenu();
    await this.sidebar.clickLinkLogout();
  }

  async closePage(): Promise<void> {
    await this.page.close();
  }
}
