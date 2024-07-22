import { test } from '../../components/fixtures/base';
import * as report from '../../data/report/playwright.data.json';
import { authData } from '../../src/test-data/auth.data';

test.describe('Load tests', { tag: [report.tags.load] }, async () => {
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
});
