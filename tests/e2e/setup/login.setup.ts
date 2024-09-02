import { Configuration } from '@_src/config/configuration';
import { test as setup } from '@_src/fixtures/base';

setup('Standard user', async ({ login, header }) => {
  // Act
  await login.logIn(Configuration.user, Configuration.password);
  // Assert
  await header.expectLogo();
});
