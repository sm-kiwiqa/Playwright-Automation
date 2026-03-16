const { test, expect } = require('../../../fixtures/baseTest');
const env = require('../../../config/env');
const paths = require('../../../test-data/paths.json');

test('User should navigate to Settings page', async ({ page, loginPage, settingsPage }) => {
  // Login first (important)
  await loginPage.navigate('/');

  await loginPage.login(
    env.validUser.email,
    env.validUser.password
  );

  await settingsPage.navigateToSettings();

  // Perform logout with full flow
  await loginPage.logoutWithConfirmation();

  // Final validation
  await expect(page).toHaveURL(paths.login.route);

  await expect(
    page.getByRole('button', { name: 'Log In' })
  ).toBeVisible();
});