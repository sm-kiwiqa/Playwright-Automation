import { expect } from '@playwright/test';
import { scrollSidebar } from '../../sidebar/sidebar.spec';

export async function navigateQHSECards(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        page.getByRole('link', { name: 'QHSE Cards' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/qhse-cards$/);
    // Wait for the "QHSE Cards" text to appear
    const qhseCardsHeading = page
        .locator('p')
        .filter({ hasText: 'QHSE Cards' })
        .first();

    await expect(qhseCardsHeading).toBeVisible();

    console.log('✔️ QHSE Cards page opened');

}
