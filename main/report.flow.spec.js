import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { ReportPage } from '../src/pages/ReportPage.js';
import { testUsers } from '../config/testConfig.js';

test('Report module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reportPage = new ReportPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await reportPage.navigate();
    await reportPage.verifyPage();

    await dashboardPage.clickLogout();
});
