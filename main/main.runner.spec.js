import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { SettingsPage } from '../src/pages/SettingsPage.js';
import { ShiftsPage } from '../src/pages/ShiftsPage.js';
import { ToolboxTalkPage } from '../src/pages/ToolboxTalkPage.js';
import { ReportPage } from '../src/pages/ReportPage.js';
import { DPRPage } from '../src/pages/DPRPage.js';
import { QHSEManagementPage } from '../src/pages/QHSEManagementPage.js';
import { QHSECardsPage } from '../src/pages/QHSECardsPage.js';
import { FeedbackPage } from '../src/pages/FeedbackPage.js';
import { EquipmentManagementPage } from '../src/pages/EquipmentManagementPage.js';
import { testUsers } from '../config/testConfig.js';

// full-flow runner (can still be used but individual specs exist)

test('Full Application Flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const settingsPage = new SettingsPage(page);
    const shiftsPage = new ShiftsPage(page);
    const toolboxPage = new ToolboxTalkPage(page);
    const reportPage = new ReportPage(page);
    const dprPage = new DPRPage(page);
    const qhsePage = new QHSEManagementPage(page);
    const qhseCardsPage = new QHSECardsPage(page);
    const feedbackPage = new FeedbackPage(page);
    const equipmentPage = new EquipmentManagementPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    await settingsPage.navigate();
    await shiftsPage.navigate();
    await toolboxPage.navigate();
    await reportPage.navigate();
    await dprPage.navigate();
    await qhsePage.navigate();
    await qhseCardsPage.navigate();
    await feedbackPage.navigate();
    await equipmentPage.navigate();

    await dashboardPage.clickLogout();
});
