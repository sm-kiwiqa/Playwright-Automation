import { BasePage } from './BasePage';
import { SidebarPage } from './SidebarPage.js';
import { Logger } from '../utils/logger.js';

export class FeedbackPage extends BasePage {
    constructor(page) {
        super(page);
        this.sidebar = new SidebarPage(page);
    }

    async navigate() {
        Logger.section('Navigate to Feedback');
        await this.sidebar.scrollToTop();
        await this.sidebar.clickLink('Feedback');
        await this.waitForURL(/\/client\/feedback$/);
    }

    async verifyPage() {
        Logger.info('Verifying Feedback page');
        const heading = this.page.locator('p').filter({ hasText: 'Feedback' }).first();
        await heading.waitFor({ timeout: 10000 });
        return true;
    }
}
