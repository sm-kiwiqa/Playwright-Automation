import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class DPRPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to DPR');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('DPR');
        await this.waitForURL(/\/client\/dpr$/);
    }

    async verifyPage() {
        Logger.info('Verifying DPR page');
        const heading = this.page.locator('p').filter({ hasText: 'DPR' }).first();
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
