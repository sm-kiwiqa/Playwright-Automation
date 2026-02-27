import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { EquipmentManagementPage } from '../src/pages/EquipmentManagementPage.js';
import { testUsers } from '../config/testConfig.js';

test('Equipment Management module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const equipmentPage = new EquipmentManagementPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await equipmentPage.navigate();
    await equipmentPage.verifyPage();

    await dashboardPage.clickLogout();
});
