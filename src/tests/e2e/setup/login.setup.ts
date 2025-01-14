import * as report from '@_src/assets/data/report/allure.data.json';
import { Configuration } from '@_src/config/configuration';
import { test as setup } from '@_src/fixtures/base.fixture';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

setup('Log in to standard user account', async ({ login, header, page }) => {
  await allure.epic(report.epic.application);
  await allure.feature(report.feature.authentication);
  await allure.story(report.story.login);
  await allure.severity(Severity.BLOCKER);
  await allure.description(
    'This test attempts to log into the website using a login and a password. Authentication is saved to the storage state.',
  );
  await allure.owner(report.owner.mrp);
  // Act
  await login.logIn(Configuration.user, Configuration.password);
  // Assert
  await header.expectLogo();
  // Arrange
  await page.context().storageState({ path: '.auth/user.json' });
  await page.close();
});
