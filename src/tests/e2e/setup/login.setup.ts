import { Configuration } from '@_src/config/configuration';
import { test as setup } from '@_src/fixtures/base.fixture';

setup('Log in to standard user account', async ({ login, header, page }) => {
  // Act
  await login.logIn(Configuration.user, Configuration.password);
  // Assert
  await header.expectLogo();
  // Arrange
  await page.context().storageState({ path: '.auth/user.json' });
  await page.close();
});
