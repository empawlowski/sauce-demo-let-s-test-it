import { authData } from '../../.env/.auth/auth.data';
import { expect, test } from '../../components/fixtures/base';
import * as report from '../../data/report/playwright.data.json';
import AxeBuilder from '@axe-core/playwright';

let user: string = authData.standard;
let password: string = authData.password;

test.skip('Main page - accessibility', { tag: [report.tags.accessibility] }, async ({ login, header, page }) => {
  // await allure.epic(report.epic.analysis);
  // await allure.feature(report.feature.tm);
  // await allure.tag(report.tag.dealer);

  // Arrange
  // Act
  await login.logIn(user, password);
  await header.expectLogo();

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).include('#navigation-menu-flyout').analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).exclude('#element-with-known-issue').analyze();
  // const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();
  console.log(accessibilityScanResults);
  // Assert
  expect(accessibilityScanResults.violations).toEqual([]);
});
