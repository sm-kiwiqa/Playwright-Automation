import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateEquipmentManagement(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        page.getByRole('link', { name: 'Equipment Management' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/equipment-management$/);

    // Wait for the "Equipment Management" text to appear
    const equipmentManagementHeading = page
        .locator('p')
        .filter({ hasText: 'Equipment Management' })
        .first();
    await expect(equipmentManagementHeading).toBeVisible();

    console.log('✔️ Equipment Management page opened');
}
