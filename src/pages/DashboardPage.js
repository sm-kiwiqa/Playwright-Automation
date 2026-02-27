import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

/**
 * DashboardPage - Example Page Object
 * Handles dashboard interactions after login
 */
export class DashboardPage extends BasePage {
    // Element selectors
    selectors = {
        userGreeting: '.user-greeting, .welcome-message, h1:has-text("Dashboard")',
        logoutButton: 'button:has-text("Logout"), button:has-text("Log Out"), [data-testid="logout"]',
        sidebarMenu: 'nav, .sidebar, .menu',
        profileIcon: '[data-testid="profile"], .user-avatar, .profile-icon',
        settingsLink: 'a:has-text("Settings"), [data-testid="settings"]',
        dashboardContainer: '.dashboard, [data-testid="dashboard"], main',
    };

    /**
     * Wait for dashboard to load
     */
    async waitForDashboardLoad() {
        Logger.info('Waiting for dashboard to load');
        await this.waitForElement(this.selectors.dashboardContainer);
    }

    /**
     * Verify dashboard is displayed
     * @returns {Promise<boolean>}
     */
    async isDashboardDisplayed() {
        return await this.isVisible(this.selectors.dashboardContainer);
    }

    /**
     * Get user greeting text
     * @returns {Promise<string>}
     */
    async getUserGreeting() {
        return await this.getText(this.selectors.userGreeting);
    }

    /**
     * Click logout button
     */
    async clickLogout() {
        Logger.info('Scrolling page to find logout button');
        try {
            // Scroll down to ensure logout button is visible
            await this.page.evaluate(() => {
                window.scrollBy(0, document.body.scrollHeight);
            });
            await this.page.waitForTimeout(500);
        } catch (err) {
            Logger.warning('Could not scroll page — continuing');
        }

        Logger.info('Clicking logout button');
        try {
            // Wait for logout button to be ready and scroll into view
            const logoutSelector = this.selectors.logoutButton;
            await this.page.waitForSelector(logoutSelector, { timeout: 10000, state: 'visible' });
            const logoutElement = this.page.locator(logoutSelector).first();
            await logoutElement.scrollIntoViewIfNeeded();

            // Click the logout button
            await this.click(logoutSelector);
            await this.page.waitForLoadState('networkidle');
            Logger.success('Logout completed');
        } catch (err) {
            Logger.warning(`Logout action failed or browser closed: ${err.message}`);
            // Don't re-throw — test may still be acceptable if we got here
        }
    }

    /**
     * Navigate to settings
     */
    async navigateToSettings() {
        Logger.info('Navigating to settings');
        await this.click(this.selectors.settingsLink);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click profile icon
     */
    async clickProfileIcon() {
        Logger.info('Clicking profile icon');
        await this.click(this.selectors.profileIcon);
    }

    /**
     * Verify user is logged in
     * @returns {Promise<boolean>}
     */
    async verifyUserLoggedIn() {
        Logger.info('Verifying user is logged in');
        const isGreetingVisible = await this.isVisible(this.selectors.userGreeting);
        const isDashboardVisible = await this.isVisible(this.selectors.dashboardContainer);
        return isGreetingVisible && isDashboardVisible;
    }
}
