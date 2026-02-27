import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { QHSECardsPage } from '../src/pages/QHSECardsPage.js';
import { testUsers } from '../config/testConfig.js';

test('QHSE Cards module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const qhseCardsPage = new QHSECardsPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await qhseCardsPage.navigate();
    await qhseCardsPage.verifyPage();

    await dashboardPage.clickLogout();
});
