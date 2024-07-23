import { test } from '../../src/components/fixtures/base';
import * as report from '../../src/test-data/report/playwright.data.json';
import { authData } from '../../src/test-data/tests/e2e/auth.data';

test.describe.skip('Load tests', { tag: [report.tags.load] }, async () => {
  for (let i = 0; i < 25; i++) {
    test(`Simple login to page - Run ${i + 1}`, async ({ login, header }) => {
      await login.logIn(authData.standard, authData.password);
      await header.expectLogo();
    });
  }
});
