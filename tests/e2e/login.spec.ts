import { test } from '@_src/fixtures/base';
import * as report from '@_src/test-data/report/allure.data.json';
import { authData } from '@_src/test-data/tests/e2e/auth.data';
import { loginData } from '@_src/test-data/tests/e2e/login.data';
import { Severity } from 'allure-js-commons';

const { allure } = require('allure-playwright');

let user: string = authData.standard;
let locked: string = authData.locked;
let problem: string = authData.problem;
let performance: string = authData.performance;
let error: string = authData.error;
let visual: string = authData.visual;

let password: string = authData.password;

test.describe('Login', { tag: [report.tags.regression] }, () => {
  test.beforeEach('Add running test title', async ({}, testInfo) => {
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.authentication);
    await allure.story(report.story.login);
    await allure.severity(Severity.CRITICAL);
    await allure.description(
      'This test attempts to log into the website using a login and a password. Fails if any error happens.\n\nNote that this test does not test 2-Factor Authentication.',
    );
    await allure.owner(report.owner.mrp);
    console.log(`Running ${testInfo.title}`);
  });

  test.afterEach('Close the page', async ({ base }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
    await base.closePage();
  });

  test.describe('Login to specific user', () => {
    test('Standard user', async ({ login, header }) => {
      // Arrange
      // Act
      await login.logIn(user, password);
      // Assert
      await header.expectLogo();
    });
    test('Locked user', async ({ login, base }) => {
      // Arrange
      const error = loginData.locked_user;
      // Act
      await login.logIn(locked, password);
      // Assert
      await base.catchError(error);
    });
    test('Problem user', async ({ login, header }) => {
      // Arrange
      // Act
      await login.logIn(problem, password);
      // Assert
      await header.expectLogo();
    });
    test('Performance user', async ({ login, header }) => {
      // Arrange
      // Act
      await login.logIn(performance, password);
      // Assert
      await header.expectLogo(); //?
    });
    test('Error user', async ({ login, header }) => {
      // Arrange
      // Act
      await login.logIn(error, password);
      // Assert
      await header.expectLogo(); //?
    });
    test('Visual user', async ({ login, header }) => {
      // Arrange
      // Act
      await login.logIn(visual, password);
      // Assert
      await header.expectLogo(); //?
    });
  });

  test.describe('Login with error status', () => {
    test.beforeEach('Add running test title', async ({}, testInfo) => {
      await allure.epic(report.epic.application);
      await allure.feature(report.feature.authentication);
      await allure.story(report.story.login);
      await allure.owner(report.owner.mrp);

      console.log(`Running ${testInfo.title}`);
    });

    test('Missing credentials', async ({ login, base }) => {
      // Arrange
      const error = loginData.requiredUsername;
      // Act
      await login.logInWithoutCredentials();
      // Assert
      await base.catchError(error);
    });

    test('Missing username', async ({ login, base }) => {
      // Arrange
      const error = loginData.requiredUsername;
      // Act
      await login.logInWithoutUsername(user);
      // Assert
      await base.catchError(error);
    });

    test('Missing password', async ({ login, base }) => {
      // Arrange
      const error = loginData.requiredPassword;
      // Act
      await login.logInWithoutPassword(password);
      // Assert
      await base.catchError(error);
    });

    test('Incorrect credentials', async ({ login, base }) => {
      // Arrange
      const error = loginData.incorrectCredentials;
      // Act
      await login.logIn('username', 'password');
      // Assert
      await base.catchError(error);
    });

    test('Incorrect username', async ({ login, base }) => {
      // Arrange
      const error = loginData.incorrectCredentials;
      // Act
      await login.logIn('username', password);
      // Assert
      await base.catchError(error);
    });

    test('Incorrect password', async ({ login, base }) => {
      // Arrange
      const error = loginData.incorrectCredentials;
      // Act
      await login.logIn(user, 'password');
      // Assert
      await base.catchError(error);
    });
  });
});
