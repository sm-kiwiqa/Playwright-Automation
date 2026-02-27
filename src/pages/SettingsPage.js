import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class SettingsPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to Settings');
        await this.sidebar.scrollToBottom();
        await this.sidebar.clickLink('Settings');
        await this.waitForURL(/\/client\/setting$/);
    }

    async verifyPage() {
        Logger.info('Verifying Settings page');
        await this.page.getByRole('heading', { name: 'Project Management' }).waitFor({ timeout: 10000 });
        return true;
    }
}
