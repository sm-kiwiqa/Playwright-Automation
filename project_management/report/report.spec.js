import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateReport(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        page.getByRole('link', { name: 'Report' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/report$/);

    // Wait for page heading specifically
    const toolboxtalkheading = page.locator('p', { hasText: 'Report' });
    await expect(toolboxtalkheading).toBeVisible({ timeout: 10000 });

    console.log('✔️ Report page opened');

}
