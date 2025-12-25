import { expect } from '@playwright/test';
import { scrollSidebar } from '../sidebar/sidebar.spec';

export async function navigateFeedback(page) {
    await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');

    await Promise.all([
        page.getByRole('link', { name: 'Feedback' }).click(),
    ]);

    // Primary validation
    await expect(page).toHaveURL(/\/client\/feedback$/);
    // Wait for the "Feedback" text to appear
    const feedbackHeading = page
        .locator('p')
        .filter({ hasText: 'Feedback' })
        .first();

    await expect(feedbackHeading).toBeVisible();

    console.log('✔️ Feedback page opened');

}
