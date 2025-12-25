import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateQHSEManagement(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        page.getByRole('link', { name: 'QHSE Management' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/qhse-management$/);
    // Wait for the "QHSE Management" text to appear
    const qhseManagementHeading = page
        .locator('p')
        .filter({ hasText: 'QHSE Management' })
        .first();

    await expect(qhseManagementHeading).toBeVisible();

    console.log('✔️ QHSE Management page opened');

}
