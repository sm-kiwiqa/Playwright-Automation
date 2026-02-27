import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class ReportPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to Report');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('Report');
        await this.waitForURL(/\/client\/report$/);
    }

    async verifyPage() {
        Logger.info('Verifying Report page');
        const heading = this.page.locator('p', { hasText: 'Report' });
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
