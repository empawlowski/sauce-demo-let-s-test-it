import { HeaderComponent } from '../../components/header.component';
import { SideBarComponent } from '../../components/sidebar.component';
import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(private page: Page) {}
  headerComponent = new HeaderComponent(this.page);
  sidebar = new SideBarComponent(this.page);

  //* Header
  header = this.page.getByTestId('title');

  //* Error
  error = this.page.getByTestId('error');

  async catchError(error: string): Promise<void> {
    await expect(this.error).toContainText(error);
  }

  async takeScreenshot(page: string): Promise<void> {
    await this.page.screenshot({ path: `${page}`, fullPage: true });
  }

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
