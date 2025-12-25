import { expect } from '@playwright/test';

export async function login(page) {
    await page.goto(process.env.LOGIN_URL);

    await page.fill('input[type="email"]', process.env.TEST_EMAIL);
    await page.fill('input[type="password"]', process.env.TEST_PASSWORD);

    await page.click('button:has-text("Log In")');

    await expect(page).toHaveURL(/client\/setting/);
    console.log('✔️ Login done');
}
