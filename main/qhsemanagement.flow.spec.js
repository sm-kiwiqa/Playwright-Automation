import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { QHSEManagementPage } from '../src/pages/QHSEManagementPage.js';
import { testUsers } from '../config/testConfig.js';

test('QHSE Management module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const qhsePage = new QHSEManagementPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await qhsePage.navigate();
    await qhsePage.verifyPage();

    await dashboardPage.clickLogout();
});
