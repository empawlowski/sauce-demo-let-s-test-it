import { builders } from '@_src/fixtures/builders.fixture';
import { pages } from '@_src/fixtures/pages.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pages, builders);

export { expect } from '@playwright/test';
