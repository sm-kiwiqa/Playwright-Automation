import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { ToolboxTalkPage } from '../src/pages/ToolboxTalkPage.js';
import { testUsers } from '../config/testConfig.js';

test('Toolbox Talk module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const toolboxPage = new ToolboxTalkPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await toolboxPage.navigate();
    await toolboxPage.verifyPage();

    await dashboardPage.clickLogout();
});
