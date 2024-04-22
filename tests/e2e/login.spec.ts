import { authData } from '../../.env/.auth/auth.data';
import { test } from '../../components/fixtures/base';
import { loginData } from '../../data/tests/e2e/login.data';

let user: string = authData.standard;
let locked: string = authData.locked;
let problem: string = authData.problem;
let performance: string = authData.performance;
let error: string = authData.error;
let visual: string = authData.visual;

let password: string = authData.password;

test.describe('Login', { tag: '@reg' }, () => {
  test.afterEach('Close the page', async ({ page }) => {
    await page.close();
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
      await login.logIn(user, password);
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
});
