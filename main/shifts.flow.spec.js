import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { ShiftsPage } from '../src/pages/ShiftsPage.js';
import { testUsers } from '../config/testConfig.js';

test('Shifts module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const shiftsPage = new ShiftsPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await shiftsPage.navigate();
    await shiftsPage.verifyPage();

    await dashboardPage.clickLogout();
});
