import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { DPRPage } from '../src/pages/DPRPage.js';
import { testUsers } from '../config/testConfig.js';

test('DPR module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const dprPage = new DPRPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await dprPage.navigate();
    await dprPage.verifyPage();

    await dashboardPage.clickLogout();
});
