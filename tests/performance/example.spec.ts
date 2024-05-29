import { expect, test } from '@playwright/test';

test('Simple login to page', async ({ page }) => {
  await page.goto('https://www.example-page.com');
  await page.getByLabel('User name *').fill('admin');
  await page.getByLabel('Password *').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Log-out')).toBeVisible();
});

for (let i = 0; i < 100; i++) {
  test(`Run ${i + 1}`, async ({ page }) => {
    await page.goto('https://www.example-page.com');
    await page.getByLabel('User name *').fill('admin');
    await page.getByLabel('Password *').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Log-out')).toBeVisible();
  });
}
