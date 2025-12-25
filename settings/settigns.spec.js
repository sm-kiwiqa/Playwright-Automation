import { expect } from '@playwright/test';
import { scrollSidebar } from '../sidebar/sidebar.spec';

export async function navigateSettings(page) {
    await scrollSidebar(page);

    await Promise.all([
        page.waitForURL(/\/client\/setting$/),
        page.getByRole('link', { name: 'Settings' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/setting$/);

    // Semantic UI validation
    await expect(
        page.getByRole('heading', { name: 'Project Management' })
    ).toBeVisible();

    console.log('✔️ Settings page opened');

}
