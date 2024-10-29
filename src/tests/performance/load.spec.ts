import { authData } from '@_src/assets/data/e2e/auth.data';
import * as report from '@_src/assets/data/report/allure.data.json';
import { test } from '@_src/fixtures/base.fixture';

const { allure } = require('allure-playwright');

test.describe.skip('Load tests', { tag: [report.tags.load] }, async () => {
  for (let i = 0; i < 25; i++) {
    test(`Simple login to page - Run ${i + 1}`, async ({ login, header }) => {
      await allure.epic(report.epic.performance);
      await allure.epic(report.feature.performance);
      await allure.epic(report.story.load);

      await login.logIn(authData.standard, authData.password);
      await header.expectLogo();
    });
  }
});
