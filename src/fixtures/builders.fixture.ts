import { AxeBuilderHelper } from '@_src/helpers/axe.helper';
import AxeBuilder from '@axe-core/playwright';
import { test as buildersTest } from '@playwright/test';

interface Builders {
  a11y: () => AxeBuilder;
}

export const builders = buildersTest.extend<Builders>({
  a11y: async ({ page }, use) => {
    // const a11y = AxeBuilderHelper(page); // Use the imported fixture
    await use(AxeBuilderHelper(page));
  },
});
