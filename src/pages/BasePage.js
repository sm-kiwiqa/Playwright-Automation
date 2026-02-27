/**
 * BasePage - Parent class for all Page Objects
 * Provides common methods and utilities for page interaction
 */
export class BasePage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param {string} path - The path to navigate to
     */
    async navigateTo(path = '') {
        await this.page.goto(path, { waitUntil: 'networkidle' });
    }

    /**
     * Click on an element
     * @param {string} selector - CSS selector or XPath
     */
    async click(selector) {
        await this.page.click(selector);
    }

    /**
     * Fill text input
     * @param {string} selector - CSS selector or XPath
     * @param {string} text - Text to fill
     */
    async fill(selector, text) {
        await this.page.fill(selector, text);
    }

    /**
     * Get text from element
     * @param {string} selector - CSS selector or XPath
     * @returns {Promise<string>} The text content
     */
    async getText(selector) {
        return await this.page.textContent(selector);
    }

    /**
     * Check if element is visible
     * @param {string} selector - CSS selector or XPath
     * @returns {Promise<boolean>}
     */
    async isVisible(selector) {
        return await this.page.isVisible(selector);
    }

    /**
     * Wait for element to be visible
     * @param {string} selector - CSS selector or XPath
     * @param {number} timeout - Timeout in ms
     */
    async waitForElement(selector, timeout = 5000) {
        await this.page.waitForSelector(selector, { timeout });
    }

    /**
     * Pause execution
     * @param {number} ms - Milliseconds to wait
     */
    async pause(ms = 1000) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get URL
     * @returns {Promise<string>}
     */
    async getURL() {
        return this.page.url();
    }

    /**
     * Wait for URL to match
     * @param {RegExp|string} urlOrPredicate
     */
    async waitForURL(urlOrPredicate) {
        await this.page.waitForURL(urlOrPredicate);
    }

    /**
     * Take screenshot
     * @param {string} filePath - Path to save screenshot
     */
    async takeScreenshot(filePath) {
        await this.page.screenshot({ path: filePath });
    }

    /**
     * Get element attribute
     * @param {string} selector - CSS selector or XPath
     * @param {string} attribute - Attribute name
     * @returns {Promise<string>}
     */
    async getAttribute(selector, attribute) {
        return await this.page.getAttribute(selector, attribute);
    }

    /**
     * Double click on element
     * @param {string} selector - CSS selector or XPath
     */
    async doubleClick(selector) {
        await this.page.dblclick(selector);
    }

    /**
     * Right click on element
     * @param {string} selector - CSS selector or XPath
     */
    async rightClick(selector) {
        await this.page.click(selector, { button: 'right' });
    }

    /**
     * Select option from dropdown
     * @param {string} selector - CSS selector or XPath
     * @param {string} value - Option value to select
     */
    async selectOption(selector, value) {
        await this.page.selectOption(selector, value);
    }

    /**
     * Check element visibility with custom timeout
     * @param {string} selector - CSS selector or XPath
     * @param {boolean} shouldBeVisible - Expected visibility state
     * @param {number} timeout - Custom timeout
     */
    async verifyVisibility(selector, shouldBeVisible = true, timeout = 5000) {
        try {
            await this.page.waitForSelector(selector, { 
                state: shouldBeVisible ? 'visible' : 'hidden', 
                timeout 
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}
