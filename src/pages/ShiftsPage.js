import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class ShiftsPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to Shifts');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('Shift Details');
        await this.waitForURL(/\/client\/shifts$/);
    }

    async verifyPage() {
        Logger.info('Verifying Shifts page');
        const heading = this.page.getByText('Shifts', { exact: true });
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
