const { expect } = require('@playwright/test');
const paths = require('../../../test-data/paths.json');
const BasePage = require('../../common/BasePage.js');

class SettingsPage extends BasePage {
    constructor(page) {
        super(page);

        this.sidebar = page.locator('.MuiDrawer-paper').first();
        this.settingsUrl = paths.settings.route;
        this.settingsTitle = paths.settings.title;
        this.settingsLink = page.getByRole('link', { name: this.settingsTitle });
        this.settingsHeading = page.locator('p').filter({ hasText: this.settingsTitle }).first();
    }

    async navigateToSettings() {

        // Scroll sidebar to top (if needed)
        await this.settingsLink.scrollIntoViewIfNeeded();

        // Click Settings
        await this.settingsLink.click();

        // URL validation
        await expect(this.page).toHaveURL(this.settingsUrl);

        // Heading validation
        await expect(this.settingsHeading).toBeVisible();
    }
}

module.exports = SettingsPage;