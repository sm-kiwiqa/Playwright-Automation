import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class ToolboxTalkPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to Toolbox Talk');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('Toolbox Talk');
        await this.waitForURL(/\/client\/toolbox-talk$/);
    }

    async verifyPage() {
        Logger.info('Verifying Toolbox Talk page');
        const heading = this.page.locator('p', { hasText: 'Toolbox Talk' });
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
