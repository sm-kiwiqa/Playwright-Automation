/**
 * Example Test File - Demonstrates best practices
 * This file shows how to properly structure tests using the framework
 */

import { test, expect } from '../src/fixtures/customTest.js';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { testData } from '../test-data/testData.js';
import { Logger } from '../src/utils/logger.js';
import { CustomAssert } from '../src/utils/assertions.js';

test.describe('Authentication Flow @critical', () => {
    let loginPage;
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        Logger.section('Test Setup');
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        
        Logger.info('Navigating to login page');
        await loginPage.navigateToLogin();
    });

    test('should successfully login with valid credentials @smoke @critical', async ({ page, screenshotOnFailure }) => {
        Logger.section('Test: Valid Login');
        
        // Arrange
        const username = testData.users.admin.username;
        const password = testData.users.admin.password;

        // Act
        Logger.step(1, 'Perform login');
        await loginPage.login(username, password);

        // Assert
        Logger.step(2, 'Verify dashboard is displayed');
        await dashboardPage.waitForDashboardLoad();
        await CustomAssert.isVisible(page, dashboardPage.selectors.dashboardContainer);
        Logger.success('User successfully logged in');
    });

    test('should display error message with invalid credentials @regression', async ({ page }) => {
        Logger.section('Test: Invalid Login');
        
        // Arrange
        const invalidUsername = 'invalid@example.com';
        const invalidPassword = 'WrongPassword123';

        // Act
        Logger.step(1, 'Attempt login with invalid credentials');
        await loginPage.login(invalidUsername, invalidPassword);
        
        // Assert
        Logger.step(2, 'Verify error message is displayed');
        await CustomAssert.isVisible(page, loginPage.selectors.errorMessage);
        
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain(testData.errorMessages.invalidCredentials);
        Logger.success('Error message displayed as expected');
    });

    test('should display error when credentials are empty @regression', async ({ page }) => {
        Logger.section('Test: Empty Credentials');
        
        // Act
        Logger.step(1, 'Click login without entering credentials');
        await loginPage.clickLogin();
        
        // Assert
        Logger.step(2, 'Verify error is shown');
        await CustomAssert.isVisible(page, loginPage.selectors.errorMessage);
        Logger.success('Validation error shown for empty credentials');
    });

    test('should remain on login page after failed login @regression', async ({ page }) => {
        Logger.section('Test: Page Persistence After Failed Login');
        
        const initialUrl = await loginPage.getURL();
        
        // Act
        await loginPage.login('invalid@example.com', 'wrongpassword');
        
        // Assert
        const currentUrl = await loginPage.getURL();
        expect(currentUrl).toBe(initialUrl);
        Logger.success('User remains on login page after failed login');
    });

    test('should navigate to dashboard after successful login @smoke', async ({ page }) => {
        Logger.section('Test: Dashboard Navigation');
        
        // Act
        await loginPage.login(testData.users.admin.username, testData.users.admin.password);
        
        // Assert
        await CustomAssert.urlMatches(page, /dashboard|home/i);
        Logger.success('Successfully navigated to dashboard');
    });
});

test.describe('Login Page UI @regression', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('should display all login page elements', async ({ page }) => {
        Logger.section('Test: Login Page Elements');
        
        Logger.step(1, 'Verify username input is visible');
        await CustomAssert.isVisible(page, loginPage.selectors.usernameInput);
        
        Logger.step(2, 'Verify password input is visible');
        await CustomAssert.isVisible(page, loginPage.selectors.passwordInput);
        
        Logger.step(3, 'Verify login button is visible');
        await CustomAssert.isVisible(page, loginPage.selectors.loginButton);
        
        Logger.success('All login page elements are displayed');
    });

    test('should display forget password link', async ({ page }) => {
        Logger.section('Test: Forgot Password Link');
        
        await CustomAssert.isVisible(page, loginPage.selectors.forgetPasswordLink);
        Logger.success('Forgot password link is displayed');
    });

    test('should have correct page title', async ({ page }) => {
        Logger.section('Test: Page Title');
        
        await CustomAssert.titleMatches(page, 'Login');
        Logger.success('Page title is correct');
    });
});

test.describe('Remember Me Functionality @regression', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('should have remember me checkbox', async ({ page }) => {
        Logger.section('Test: Remember Me Checkbox');
        
        await CustomAssert.isVisible(page, loginPage.selectors.rememberMeCheckbox);
        Logger.success('Remember me checkbox is visible');
    });
});

export { LoginPage, DashboardPage };
