import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

/**
 * LoginPage - Example Page Object
 * Handles all login-related interactions
 */
export class LoginPage extends BasePage {
    // Element selectors
    selectors = {
        usernameInput: 'input[placeholder*="email" i], input[name*="username" i]',
        passwordInput: 'input[type="password"]',
        loginButton: 'button[type="submit"], button:has-text("Log In"), button:has-text("Login")',
        errorMessage: '.error-message, .alert-danger, [role="alert"]',
        forgetPasswordLink: 'a:has-text("Forgot")',
        rememberMeCheckbox: 'input[type="checkbox"]',
    };

    /**
     * Navigate to login page
     * @param {string} url - Optional URL to navigate to
     */
    async navigateToLogin(url = process.env.LOGIN_URL) {
        Logger.step(1, `Navigate to login page: ${url}`);
        await this.navigateTo(url);
        await this.waitForElement(this.selectors.usernameInput);
    }

    /**
     * Enter username
     * @param {string} username - Username value
     */
    async enterUsername(username) {
        Logger.step(2, `Enter username: ${username}`);
        await this.fill(this.selectors.usernameInput, username);
    }

    /**
     * Enter password
     * @param {string} password - Password value
     */
    async enterPassword(password) {
        Logger.step(3, 'Enter password');
        await this.fill(this.selectors.passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        Logger.step(4, 'Click login button');
        await this.click(this.selectors.loginButton);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Perform login action
     * @param {string} username - Username
     * @param {string} password - Password
     */
    async login(username, password) {
        Logger.section('Performing Login');
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
        Logger.success('Login action completed');
    }

    /**
     * Check if error message is visible
     * @returns {Promise<boolean>}
     */
    async isErrorMessageVisible() {
        return await this.isVisible(this.selectors.errorMessage);
    }

    /**
     * Get error message text
     * @returns {Promise<string>}
     */
    async getErrorMessage() {
        return await this.getText(this.selectors.errorMessage);
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        Logger.info('Clicking forgot password link');
        await this.click(this.selectors.forgetPasswordLink);
    }

    /**
     * Check remember me checkbox
     */
    async checkRememberMe() {
        Logger.info('Checking remember me checkbox');
        const isChecked = await this.page.isChecked(this.selectors.rememberMeCheckbox);
        if (!isChecked) {
            await this.click(this.selectors.rememberMeCheckbox);
        }
    }

    /**
     * Verify login page is loaded
     */
    async verifyLoginPageLoaded() {
        Logger.info('Verifying login page is loaded');
        await this.waitForElement(this.selectors.usernameInput);
        return await this.isVisible(this.selectors.usernameInput);
    }
}
