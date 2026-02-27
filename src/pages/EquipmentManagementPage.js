import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class EquipmentManagementPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to Equipment Management');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('Equipment Management');
        await this.waitForURL(/\/client\/equipment-management$/);
    }

    async verifyPage() {
        Logger.info('Verifying Equipment Management page');
        const heading = this.page.locator('p').filter({ hasText: 'Equipment Management' }).first();
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
