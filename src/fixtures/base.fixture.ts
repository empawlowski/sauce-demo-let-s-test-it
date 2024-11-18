import { builders } from '@_src/fixtures/builders.fixture';
import { components } from '@_src/fixtures/components.fixture';
import { pages } from '@_src/fixtures/pages.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pages, builders, components);

export { expect, type Locator } from '@playwright/test';
