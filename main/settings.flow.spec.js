import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { SettingsPage } from '../src/pages/SettingsPage.js';
import { testUsers } from '../config/testConfig.js';

test('Settings module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const settingsPage = new SettingsPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await settingsPage.navigate();
    await settingsPage.verifyPage();

    await dashboardPage.clickLogout();
});
