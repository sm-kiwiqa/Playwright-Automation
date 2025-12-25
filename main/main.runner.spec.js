import { test } from '@playwright/test';
import { login } from '../login/login1.spec';
import { goToSettings } from '../settings/settigns.spec';
// import { otherFeature } from '../features/other.feature';
import { logout } from '../login/logout.spec';

test('Full Application Flow', async ({ page }) => {

    await login(page);          // 1️⃣
    await goToSettings(page);  // 2️⃣
    // await otherFeature(page);  // 3️⃣
    await logout(page);        // 4️⃣

});
