import { authData } from '../../.env/.auth/auth.data';
import { test } from '../../components/fixtures/base';

test('Simple login to page', async ({ login, header }) => {
  await login.logIn(authData.standard, authData.password);
  await header.expectLogo();
});

for (let i = 0; i < 25; i++) {
  test(`Run ${i + 1}`, async ({ login, header }) => {
    await login.logIn(authData.standard, authData.password);
    await header.expectLogo();
  });
}
