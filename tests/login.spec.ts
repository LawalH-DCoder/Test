import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('redirects student to /student/dashboard', async ({ page }) => {
    await page.getByTestId('login-email-input').fill('jumoke.adebayo@student.academy.com');
    await page.getByTestId('login-password-input').fill('Student123!');

    await Promise.all([
      page.waitForURL('**/student/dashboard'),
      page.getByTestId('login-submit-button').click(),
    ]);
  });

  test('redirects admin to /admin/dashboard', async ({ page }) => {
    await page.getByTestId('login-email-input').fill('admin@academy.com');
    await page.getByTestId('login-password-input').fill('Admin1234!');

    await Promise.all([
      page.waitForURL('**/admin/dashboard'),
      page.getByTestId('login-submit-button').click(),
    ]);
  });

  test('shows error message for wrong credentials', async ({ page }) => {
    await page.route('**/users?email=*', async (route) => {
      await route.fulfill({ body: JSON.stringify([]) });
    });

    await page.getByTestId('login-email-input').fill('wrong@email.com');
    await page.getByTestId('login-password-input').fill('wrongpass');
    await page.getByTestId('login-submit-button').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
  });
});
