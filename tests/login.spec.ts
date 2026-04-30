import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('redirects student to /student/dashboard', async ({ page }) => {
    await page
      .getByTestId('login-email-input')
      .pressSequentially('jumoke.adebayo@student.academy.com');
    await page.getByTestId('login-password-input').pressSequentially('Student123!');
    await page.getByTestId('login-submit-button').click();
    await expect(page).toHaveURL(/student\/dashboard/, { timeout: 15000 });
  });

  test('redirects admin to /admin/dashboard', async ({ page }) => {
    await page.getByTestId('login-email-input').pressSequentially('admin@academy.com');
    await page.getByTestId('login-password-input').pressSequentially('Admin1234!');
    await page.getByTestId('login-submit-button').click();
    await expect(page).toHaveURL(/admin\/dashboard/, { timeout: 15000 });
  });

  test('shows error message for wrong credentials', async ({ page }) => {
    await page.route('**/users?email=*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.getByTestId('login-email-input').pressSequentially('wrong@email.com');
    await page.getByTestId('login-password-input').pressSequentially('wrongpass');
    await page.getByTestId('login-submit-button').click();

    await expect(page.getByTestId('login-error')).toBeVisible({ timeout: 10000 });
  });
});
