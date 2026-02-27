import { expect } from '@playwright/test';
import { Logger } from './logger.js';

/**
 * Custom assertions for improved test readability
 */

export class CustomAssert {
    /**
     * Assert element is visible
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     * @param {string} message - Custom message
     */
    static async isVisible(page, selector, message = '') {
        const isVisible = await page.isVisible(selector);
        Logger.success(`Element is visible: ${selector}`);
        expect(isVisible).toBeTruthy();
    }

    /**
     * Assert element is not visible
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     * @param {string} message - Custom message
     */
    static async notVisible(page, selector, message = '') {
        const isVisible = await page.isVisible(selector);
        Logger.success(`Element is not visible: ${selector}`);
        expect(isVisible).toBeFalsy();
    }

    /**
     * Assert element text matches
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     * @param {string} expectedText - Expected text
     */
    static async textMatches(page, selector, expectedText) {
        const text = await page.textContent(selector);
        Logger.success(`Text matches: "${expectedText}"`);
        expect(text).toContain(expectedText);
    }

    /**
     * Assert URL matches
     * @param {Page} page - Page object
     * @param {RegExp|string} urlPattern - URL pattern
     */
    static async urlMatches(page, urlPattern) {
        const url = page.url();
        Logger.success(`URL matches: ${url}`);
        expect(url).toMatch(urlPattern);
    }

    /**
     * Assert element has class
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     * @param {string} className - Class name
     */
    static async hasClass(page, selector, className) {
        const element = await page.$(selector);
        const classes = await element.getAttribute('class');
        Logger.success(`Element has class: ${className}`);
        expect(classes).toContain(className);
    }

    /**
     * Assert element has attribute
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     * @param {string} attrName - Attribute name
     * @param {string} attrValue - Attribute value (optional)
     */
    static async hasAttribute(page, selector, attrName, attrValue = null) {
        const value = await page.getAttribute(selector, attrName);
        Logger.success(`Element has attribute: ${attrName}`);
        expect(value).not.toBeNull();
        if (attrValue) {
            expect(value).toBe(attrValue);
        }
    }

    /**
     * Assert element is enabled
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     */
    static async isEnabled(page, selector) {
        const isEnabled = await page.isEnabled(selector);
        Logger.success(`Element is enabled: ${selector}`);
        expect(isEnabled).toBeTruthy();
    }

    /**
     * Assert element is disabled
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     */
    static async isDisabled(page, selector) {
        const isEnabled = await page.isEnabled(selector);
        Logger.success(`Element is disabled: ${selector}`);
        expect(isEnabled).toBeFalsy();
    }

    /**
     * Assert element count matches
     * @param {Page} page - Page object
     * @param {string} selector - Element selector
     * @param {number} expectedCount - Expected count
     */
    static async elementCount(page, selector, expectedCount) {
        const count = await page.locator(selector).count();
        Logger.success(`Element count matches: ${expectedCount}`);
        expect(count).toBe(expectedCount);
    }

    /**
     * Assert page title matches
     * @param {Page} page - Page object
     * @param {string} expectedTitle - Expected title
     */
    static async titleMatches(page, expectedTitle) {
        const title = await page.title();
        Logger.success(`Page title matches: "${expectedTitle}"`);
        expect(title).toContain(expectedTitle);
    }

    /**
     * Assert value equals
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     * @param {string} message - Custom message
     */
    static equals(actual, expected, message = '') {
        Logger.success(`Values match: ${expected}`);
        expect(actual).toBe(expected);
    }

    /**
     * Assert value contains
     * @param {string} actual - Actual value
     * @param {string} expected - Expected substring
     * @param {string} message - Custom message
     */
    static contains(actual, expected, message = '') {
        Logger.success(`Value contains: "${expected}"`);
        expect(actual).toContain(expected);
    }
}
