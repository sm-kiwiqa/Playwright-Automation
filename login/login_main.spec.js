require('dotenv').config();
const { chromium } = require('playwright');

(async () => {
    // 1. Launch browser
    const browser = await chromium.launch({ headless: false }); // Set to true to run in headless mode
    const context = await browser.newContext();
    const page = await context.newPage();

    const URL = process.env.LOGIN_URL;
    // 2. Go to the Login Page
    await page.goto(URL);

    // 3. Fill in Credentials (replace with valid credentials)
    await page.fill('xpath=//*[@type="email"]', process.env.TEST_EMAIL);
    await page.fill('xpath=//*[@type="password"]', process.env.TEST_PASSWORD);

    // 4. Submit the form
    await page.click('xpath=//button[contains(text(),"Log In")]');
    //button[@type="submit" and (@class="login" or contains(@class, "login"))]

    // 5. Wait for navigation after login
    await page.waitForURL('**/client/setting**', { timeout: 60000 });

    // 6. Optional: Confirm success by checking for a selector on the landing page
    if (page.url().includes('/client/setting')) {
        console.log('✔️ Login successful');
    } else {
        console.log('❌ Login may have failed');
    }

    // 7. WAIT FOR 3 SECONDS BEFORE LOGOUT
    await page.waitForTimeout(3000);
    
    // 8. LOGOUT PROCESS
    // 8.1 SCROLL SIDEBAR (STRICT MODE SAFE)
    const sidebar = page.locator('.MuiDrawer-paper .MuiList-root').first();
    await sidebar.evaluate(el => {
        el.scrollTop = el.scrollHeight;
    });

    // 8.2 CLICK LOGOUT
    const logout = page.locator('li:has-text("Logout")');
    await logout.scrollIntoViewIfNeeded();
    await logout.click();

    // 8.3 WAIT FOR CONFIRMATION POPUP (TEXT BASED)
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

    // 6. Close browser
    await browser.close();
})();
