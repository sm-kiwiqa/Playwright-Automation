import { test } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { FeedbackPage } from '../src/pages/FeedbackPage.js';
import { testUsers } from '../config/testConfig.js';

// each module test is independent: login -> scenario -> logout

test('Feedback module navigation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const feedbackPage = new FeedbackPage(page);

    // login
    await loginPage.navigateToLogin();
    await loginPage.login(testUsers.admin.username, testUsers.admin.password);

    // perform scenario
    await feedbackPage.navigate();
    await feedbackPage.verifyPage();

    // logout
    await dashboardPage.clickLogout();
});
