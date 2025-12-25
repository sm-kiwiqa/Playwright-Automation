import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateDPR(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        page.getByRole('link', { name: 'DPR' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/dpr$/);

    // Page heading validation (stable & user-facing)
    const dprHeading = page.locator('p').filter({ hasText: 'DPR' }).first();
    await expect(dprHeading).toBeVisible();

    console.log('✔️ DPR page opened');

}
