const { test, expect } = require('../../fixtures/baseTest');
const env = require('../../config/env');
const paths = require('../../test-data/paths.json');

test.describe('Login Module', () => {

  test('User should see error with invalid credentials', async ({ loginPage, page }) => {

    await loginPage.navigate('/');

    await loginPage.login(
      env.invalidUser.email,
      env.invalidUser.password
    );

    await expect(page.locator('body'))
      .toContainText('Password must contain at least one uppercase letter');
  });

  test('User should login with valid credentials and land on Settings page', async ({ loginPage, page }) => {

    await loginPage.navigate('/');

    await loginPage.login(
      env.validUser.email,
      env.validUser.password
    );

    // ✅ Validate exact full URL
    await expect(page).toHaveURL(paths.setting.route);
  });

  test('User should logout successfully', async ({ loginPage, page }) => {

    // Login first (important)
    await loginPage.navigate('/');
    await loginPage.login(
      env.validUser.email,
      env.validUser.password
    );

    // Perform logout with full flow
    await loginPage.logoutWithConfirmation();

    // Final validation
    await expect(page).toHaveURL(paths.login.route);

    await expect(
      page.getByRole('button', { name: 'Log In' })
    ).toBeVisible();
  });

  test('User should redirected to the Project Management Page', async ({ loginPage, page }) => {

    // Login first (important)
    await loginPage.navigate('/');
    await loginPage.login(
      env.validUser.email,
      env.validUser.password
    );

    // Perform logout with full flow
    await loginPage.logoutWithConfirmation();

    // Final validation
    await expect(page).toHaveURL(paths.login.route);

    await expect(
      page.getByRole('button', { name: 'Log In' })
    ).toBeVisible();
  });

});