import { HeaderComponent } from '@_src/components/header.component';
import { SideBarComponent } from '@_src/components/sidebar.component';
import { ScreenshotPath } from '@_src/utils/paths.util';
import { type Locator, type Page, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  private readonly rootLocator: Locator;
  readonly header: HeaderComponent;
  readonly sidebar: SideBarComponent;

  readonly headerTitle: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rootLocator = page.locator('#root');
    this.header = new HeaderComponent(this.page);
    this.sidebar = new SideBarComponent(this.page);

    this.headerTitle = page.getByTestId('title');
    this.error = page.getByTestId('error');
  }

  async goTo(url: string = '/'): Promise<void> {
    await this.page.goto(url);
  }

  async toHaveUrl(url: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(url);
  }

  async catchError(error: string): Promise<void> {
    await expect(this.error).toContainText(error);
  }

  //* Sidebar
  async resetApp(): Promise<void> {
    await this.header.clickSideBarMenu();
    await this.sidebar.clickLinkResetAppState();
    await this.sidebar.clickButtonCrossMenu();
  }

  async logoutFromApp(): Promise<void> {
    await this.header.clickSideBarMenu();
    await this.sidebar.clickLinkLogout();
  }

  async closePage(): Promise<void> {
    await this.page.close();
  }

  //* Scrolls
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
      path: `${ScreenshotPath}${screenshot}.png`,
      fullPage: true,
    });
  }

  async expectHaveScreenshot(screenshot: string): Promise<void> {
    await expect(this.page).toHaveScreenshot(`${screenshot}.png`, { fullPage: true });
  }

  //* ARIA
  async toMatchAriaSnapshot(aria: string): Promise<void> {
    await expect(this.rootLocator).toMatchAriaSnapshot({ name: `${aria}.aria.yml` });
  }
}
