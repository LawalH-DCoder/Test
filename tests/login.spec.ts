import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  // beforeEach in Playwright uses the 'page' fixture
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('redirects student to /student/dashboard', async ({ page }) => {
    await page.getByTestId('login-email-input').fill('jumoke.adebayo@student.academy.com');
    await page.getByTestId('login-password-input').fill('Student123!');
    await page.getByTestId('login-submit-button').click();

    await expect(page).toHaveURL(/.*\/student\/dashboard/);
  });

  test('redirects admin to /admin/dashboard', async ({ page }) => {
    await page.getByTestId('login-email-input').fill('admin@academy.com');
    await page.getByTestId('login-password-input').fill('Admin1234!');
    await page.getByTestId('login-submit-button').click();

    await expect(page).toHaveURL(/.*\/admin\/dashboard/);
  });

  test('shows error message for wrong credentials', async ({ page }) => {
    // Cypress: cy.intercept -> Playwright: page.route
    await page.route('**/users?email=*', async (route) => {
      await route.fulfill({ body: JSON.stringify([]) });
    });

    await page.getByTestId('login-email-input').fill('wrong@email.com');
    await page.getByTestId('login-password-input').fill('wrongpass');
    await page.getByTestId('login-submit-button').click();

    // Check visibility
    const errorMessage = page.getByTestId('login-error');
    await expect(errorMessage).toBeVisible();
  });
});
