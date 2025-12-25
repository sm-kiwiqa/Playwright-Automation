import { test } from '@playwright/test';
import { login } from '../login/login1.spec';
import { navigateSettings } from '../settings/settings.spec';
import { navigateShifts } from '../project_management/shifts/shifts.spec';
// import { otherFeature } from '../features/other.feature';
import { logout } from '../login/logout.spec';

test('Full Application Flow', async ({ page }) => {

    await login(page);          // 1️⃣
    await navigateSettings(page);  // 2️⃣
    await navigateShifts(page);  // 3️⃣
    await logout(page);        // 4️⃣

});
