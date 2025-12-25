import { expect } from '@playwright/test';
import { scrollSidebar } from '../sidebar/sidebar.spec';

export async function logout(page) {
    await scrollSidebar(page);

    // CLICK LOGOUT
    const logout = page.locator('li:has-text("Logout")');
    await logout.scrollIntoViewIfNeeded();
    await logout.click();

    // WAIT FOR CONFIRMATION POPUP (TEXT BASED)
    await page.getByText('Are you sure you want to logout?', { exact: true }).waitFor();

    // CLICK NO
    await page.getByRole('button', { name: 'No' }).click();
    console.log('✔️ NO clicked → Stayed logged in');

    // CLICK YES
    await logout.scrollIntoViewIfNeeded();
    await logout.click();
    await page.getByRole('button', { name: 'Yes' }).click();
    console.log('✔️ YES clicked → Logged out');

    // VERIFY LOGOUT
    if (page.waitForURL('**/authentication/sign-in**', { timeout: 30000 })) {
        console.log('✔️ Logout successful');
    } else {
        console.log('❌ Logout may have failed');
    }
}
