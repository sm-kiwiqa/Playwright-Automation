import { BasePage } from './BasePage';
import { Logger } from '../utils/logger.js';

/**
 * SidebarPage - encapsulates sidebar interactions
 */
export class SidebarPage extends BasePage {
    constructor(page) {
        super(page);
        this.selector = '.MuiList-root';
    }

    /**
     * Scroll sidebar to bottom
     */
    async scrollToBottom() {
        Logger.info('Scrolling sidebar to bottom');
        try {
            await this.page.waitForSelector(this.selector, { timeout: 15000 });
            const sidebar = this.page.locator(this.selector).first();
            await sidebar.scrollIntoViewIfNeeded();
            await sidebar.evaluate(el => (el.scrollTop = el.scrollHeight));
        } catch (err) {
            Logger.warning('Sidebar not found to scroll to bottom — continuing without scroll');
        }
    }

    /**
     * Scroll sidebar to top
     */
    async scrollToTop() {
        try {
            Logger.info('Scrolling sidebar to top');
            await this.page.waitForSelector(this.selector, { timeout: 15000 });
            const sidebar = this.page.locator(this.selector).first();
            await sidebar.scrollIntoViewIfNeeded();
            await sidebar.evaluate(el => (el.scrollTop = 0));
        } catch (err) {
            Logger.warning('Sidebar not found to scroll to top — continuing without scroll');
        }
    }

    /**
     * Click a link in sidebar by visible name
     * @param {string} name
     */
    async clickLink(name) {
        Logger.info(`Clicking sidebar link: ${name}`);
        await this.page.getByRole('link', { name }).click();
    }
}
