import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class QHSEManagementPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to QHSE Management');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('QHSE Management');
        await this.waitForURL(/\/client\/qhse-management$/);
    }

    async verifyPage() {
        Logger.info('Verifying QHSE Management page');
        const heading = this.page.locator('p').filter({ hasText: 'QHSE Management' }).first();
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
