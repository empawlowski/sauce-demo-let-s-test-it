import { expect, test } from '../../src/components/fixtures/base';
import * as report from '../../src/test-data/report/playwright.data.json';
import { authData } from '../../src/test-data/tests/e2e/auth.data';
import { footerData } from '../../src/test-data/tests/e2e/footer.data';

let user: string = authData.standard;
let password: string = authData.password;

test.describe('Footer', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Login method', async ({ login, header }, testInfo) => {
    // await allure.epic(report.epic.analysis);
    // await allure.feature(report.feature.tm);
    // await allure.tag(report.tag.dealer);

    // Arrange
    console.log(`Running ${testInfo.title}`);
    // Act
    await login.logIn(user, password);
    // Assert
    await header.expectLogo();
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    await base.resetApp();
    await base.logoutFromApp();
    await base.closePage();
  });

  test('Check footer visibility', async ({ base, footer }) => {
    // Arrange
    // Act
    await base.scrollDown();
    // Assert
    await footer.expectFooter();
  });

  test.describe('Open the footer links', () => {
    test('Open "Twitter" page', async ({ context, base, footer }) => {
      // Arrange
      const pagePromise = context.waitForEvent('page');
      // Act
      await base.scrollDown();
      await footer.clickLinkTwitter();
      const newPage = await pagePromise;
      // Assert
      await expect(newPage).toHaveTitle(footerData.titleTwitter);
      await expect(newPage).toHaveURL(footerData.linkTwitter);
      await newPage.close();
    });

    test('Open "Facebook" page', async ({ context, base, footer }) => {
      // Arrange
      const pagePromise = context.waitForEvent('page');
      // Act
      await base.scrollDown();
      await footer.clickLinkFacebook();
      const newPage = await pagePromise;
      // Assert
      await expect(newPage).toHaveTitle(footerData.titleFacebook);
      await expect(newPage).toHaveURL(footerData.linkFacebook);
      await newPage.close();
    });

    test('Open "LinkedIn" page', async ({ context, base, footer }) => {
      // Arrange
      const pagePromise = context.waitForEvent('page');
      // Act
      await base.scrollDown();
      await footer.clickLinkLinkedIn();
      const newPage = await pagePromise;
      // Assert
      await expect(newPage).toHaveTitle(footerData.titleLinkedIn);
      await expect(newPage).toHaveURL(footerData.linkLinkedIn);
      await newPage.close();
    });
  });
});
