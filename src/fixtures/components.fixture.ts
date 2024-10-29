import { FooterComponent } from '@_src/components/footer.component';
import { HeaderComponent } from '@_src/components/header.component';
import { SideBarComponent } from '@_src/components/sidebar.component';
import { test as componentsTest } from '@playwright/test';

interface Components {
  header: HeaderComponent;
  sidebar: SideBarComponent;
  footer: FooterComponent;
}

export const components = componentsTest.extend<Components>({
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SideBarComponent(page));
  },
  footer: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },
});
