import { footerData } from '@_src/test-data/tests/e2e/footer.data';
import { Page, expect } from '@playwright/test';

export class FooterComponent {
  constructor(private page: Page) {}

  linkTwitter = this.page.getByTestId('social-twitter');
  linkFacebook = this.page.getByTestId('social-facebook');
  linkLinkedIn = this.page.getByTestId('social-linkedin');
  copyFooter = this.page.getByTestId('footer-copy');

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
