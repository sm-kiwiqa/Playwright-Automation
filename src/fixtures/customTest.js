import { test as base } from '@playwright/test';
import { Logger } from '../utils/logger.js';

/**
 * Custom test fixture with enhanced setup and teardown
 */

export const test = base.extend({
    /**
     * Enhanced page fixture with logging
     */
    page: async ({ page }, use) => {
        Logger.section('Test Started');
        Logger.info(`Browser: ${page.context().browser().browserType().name()}`);
        
        // Add request listener
        page.on('request', request => {
            Logger.debug(`Request: ${request.method()} ${request.url()}`);
        });

        // Add response listener
        page.on('response', response => {
            Logger.debug(`Response: ${response.status()} ${response.url()}`);
        });

        // Add error listener
        page.on('pageerror', error => {
            Logger.error(`Page error: ${error.message}`);
        });

        await use(page);

        Logger.section('Test Completed');
    },

    /**
     * Custom timeout fixture
     */
    testTimeout: async ({ }, use) => {
        await use(30000);
    },

    /**
     * Screenshot on failure fixture
     */
    screenshotOnFailure: async ({ page }, use) => {
        const screenshotDir = 'test-results/screenshots';
        await use(async (name) => {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `${screenshotDir}/${name}-${timestamp}.png`;
            await page.screenshot({ path: filename, fullPage: true });
            Logger.info(`Screenshot saved: ${filename}`);
        });
    }
});

export { expect } from '@playwright/test';
