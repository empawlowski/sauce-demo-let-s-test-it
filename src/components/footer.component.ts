import { footerData } from '@_src/assets/data/e2e/footer.data';
import { type Locator, type Page, expect } from '@playwright/test';

export class FooterComponent {
  private readonly page: Page;
  readonly linkTwitter: Locator;
  readonly linkFacebook: Locator;
  readonly linkLinkedIn: Locator;
  readonly copyFooter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkTwitter = page.getByTestId('social-twitter');
    this.linkFacebook = page.getByTestId('social-facebook');
    this.linkLinkedIn = page.getByTestId('social-linkedin');
    this.copyFooter = page.getByTestId('footer-copy');
  }

  async expectFooter(): Promise<void> {
    await expect(this.linkTwitter).toBeVisible();
    await expect(this.linkFacebook).toBeVisible();
    await expect(this.linkLinkedIn).toBeVisible();
    await expect(this.copyFooter).toContainText(footerData.footer);
  }

  async clickLinkTwitter(): Promise<void> {
    await this.linkTwitter.click();
  }

  async clickLinkFacebook(): Promise<void> {
    await this.linkFacebook.click();
  }

  async clickLinkLinkedIn(): Promise<void> {
    await this.linkLinkedIn.click();
  }
}
