import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class QHSECardsPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to QHSE Cards');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('QHSE Cards');
        await this.waitForURL(/\/client\/qhse-cards$/);
    }

    async verifyPage() {
        Logger.info('Verifying QHSE Cards page');
        const heading = this.page.locator('p').filter({ hasText: 'QHSE Cards' }).first();
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
