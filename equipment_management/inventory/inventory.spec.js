import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateInventory(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await page.getByRole('link', { name: 'Inventory', exact: true }).click();

    // Primary validation
    await expect(page).toHaveURL(/\/client\/inventory-summary$/);

    // Wait for the "Inventory Summary" text to appear
    const inventoryHeading = page
        .locator('p')
        .filter({ hasText: 'Inventory Summary' })
        .first();
    await expect(inventoryHeading).toBeVisible();

    console.log('✔️ Inventory Summary page opened');
}
