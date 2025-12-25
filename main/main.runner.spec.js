import { test } from '@playwright/test';
import { login } from '../login/login1.spec';
import { navigateSettings } from '../settings/settings.spec';
// import { navigateShifts } from '../project_management/shifts/shifts.spec';
// import { navigateToolboxTalk } from '../project_management/toolbox_talk/toolbox_talk.spec';
// import { navigateReport } from '../project_management/report/report.spec';
// import { navigateDPR } from '../project_management/dpr/dpr.spec';
import { navigateQHSEManagement } from '../qhse_management/qhse/qhse_management.spec';
import { navigateQHSECards } from '../qhse_management/qhse_cards/qhse_cards.spec';
import { logout } from '../login/logout.spec';

test('Full Application Flow', async ({ page }) => {

    await login(page);          // 1️⃣
    await navigateSettings(page);  // 2️⃣
    // await navigateShifts(page);  // 3️⃣
    // await navigateToolboxTalk(page);  // 4️⃣
    // await navigateReport(page);  // 5️⃣
    // await navigateDPR(page);  // 6️⃣
    await navigateQHSEManagement(page);  // 7️⃣
    await navigateQHSECards(page);  // 8️⃣
    await logout(page);        // 9️⃣

});
