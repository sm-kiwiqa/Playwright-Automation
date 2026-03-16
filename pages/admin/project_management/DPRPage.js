const { expect } = require('@playwright/test');
const paths = require('../../../test-data/paths.json');
const BasePage = require('../../common/BasePage.js');

class DPRPage extends BasePage {
    constructor(page) {
        super(page);

        this.sidebar = page.locator('.MuiDrawer-paper').first();
        this.dprUrl = paths.dpr.route;
        this.dprTitle = paths.dpr.title;
        this.dprLink = page.getByRole('link', { name: this.dprTitle });
        this.dprHeading = page.locator('p').filter({ hasText: this.dprTitle }).first();
    }

    async navigateToDPR() {

        // Scroll sidebar to top (if needed)
        await this.dprLink.scrollIntoViewIfNeeded();

        // Click DPR
        await this.dprLink.click();

        // URL validation
        await expect(this.page).toHaveURL(this.dprUrl);

        // Heading validation
        await expect(this.dprHeading).toBeVisible();
    }
}

module.exports = DPRPage;