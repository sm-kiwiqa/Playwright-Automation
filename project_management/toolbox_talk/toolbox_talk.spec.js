import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateToolboxTalk(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        // page.waitForURL(/\/client\/setting$/),
        page.getByRole('link', { name: 'Toolbox Talk' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/toolbox-talk$/);

    // Wait for page heading specifically
    const toolboxtalkheading = page.locator('p', { hasText: 'Toolbox Talk' });
    await expect(toolboxtalkheading).toBeVisible({ timeout: 10000 });

    console.log('✔️ Toolbox Talk page opened');

}
