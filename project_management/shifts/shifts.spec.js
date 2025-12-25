import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateShifts(page) {
    await scrollSidebar(page, 'ul.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        page.waitForURL(/\/client\/setting$/),
        page.getByRole('link', { name: 'Shift Details' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/shifts$/);

    // Wait for the "Shifts" text to appear
    const shiftsHeading = page.getByText('Shifts', { exact: true });
    await expect(shiftsHeading).toBeVisible({ timeout: 10000 });

    console.log('✔️ Shifts page opened');

}
