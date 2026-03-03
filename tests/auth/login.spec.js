const { test, expect } = require('../../fixtures/baseTest');
const env = require('../../config/env');
const paths = require('../../test-data/paths.json');

test.describe('Login Module', () => {

  test('User should login with valid credentials and land on Settings page', async ({ loginPage, page }) => {

    await loginPage.navigate('/');

    await loginPage.login(
      env.validUser.email,
      env.validUser.password
    );

    // ✅ Validate exact full URL
    await expect(page).toHaveURL(paths.setting.url);

    // ✅ Validate page content (More reliable than only URL)
    await expect(page.getByText(paths.setting.title)).toBeVisible();
  });


  test('User should see error with invalid credentials', async ({ loginPage, page }) => {

    await loginPage.navigate('/');

    await loginPage.login(
      env.invalidUser.email,
      env.invalidUser.password
    );

    await expect(page.locator('body'))
      .toContainText('Password must contain at least one uppercase letter');
  });

  test('User should logout successfully', async ({ loginPage, page }) => {

    // Perform Logout
    await loginPage.logout();

    // ✅ Validate redirected to login page
    await expect(page).toHaveURL(
      `${env.baseURL}${env.paths.login}`
    );

    // ✅ Validate login button visible again
    await expect(
      page.getByRole('button', { name: /login/i })
    ).toBeVisible();
  });


});