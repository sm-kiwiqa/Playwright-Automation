# Quick Start Guide

Get up and running with the Playwright framework in 5 minutes!

## 1. Initial Setup (Run Once)

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment file
cp .env.example .env
```

## 2. Update Configuration (Optional)

Edit `.env` if your application isn't at `http://localhost:3000`:

```env
BASE_URL=http://your-app-url:port
ADMIN_USERNAME=your-admin-email
ADMIN_PASSWORD=your-admin-password
```

## 3. Run Tests

### Quick Test (All tests, headless)
```bash
npm test
```

### Test with Browser Visible
```bash
npm run test:headed
```

### Run in Debug Mode
```bash
npm run test:debug
```

### Run Specific Tests
```bash
# Smoke tests only
npm run test:smoke

# Regression tests
npm run test:regression

# Critical tests  
npm run test:critical
```

### Run on Specific Browser
```bash
npm run test:chrome      # Chromium
npm run test:firefox     # Firefox
npm run test:webkit      # Safari
```

## 4. View Results

```bash
npm run test:report    # Open HTML report
```

## 5. Create New Tests

### Option A: Using Code Generator
```bash
npm run test:codegen
# Navigate your app, Playwright records your actions
```

### Option B: Write Tests Manually

1. **Create a new test file** (e.g., `main/myfeature.spec.js`):

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';

test('my test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('admin@example.com', 'password123');
    
    expect(page.url()).toContain('dashboard');
});
```

2. **Run your test**:
```bash
npm test main/myfeature.spec.js
```

## 6. Create Page Objects

Page Objects are classes that represent pages/features in your app.

1. **Create a page object** (e.g., `src/pages/SettingsPage.js`):

```javascript
import { BasePage } from './BasePage.js';

export class SettingsPage extends BasePage {
    selectors = {
        saveButton: 'button[type="submit"]',
        settingsForm: 'form.settings',
    };

    async fillSettings(data) {
        await this.fill('input[name="name"]', data.name);
    }

    async clickSave() {
        await this.click(this.selectors.saveButton);
    }
}
```

2. **Use it in tests**:

```javascript
import { SettingsPage } from '../src/pages/SettingsPage.js';

test('update settings', async ({ page }) => {
    const settingsPage = new SettingsPage(page);
    await settingsPage.fillSettings({ name: 'New Name' });
    await settingsPage.clickSave();
});
```

## 7. Common Tasks

### Add Logging
```javascript
import { Logger } from '../src/utils/logger';

Logger.section('My Test Section');
Logger.step(1, 'Do something');
Logger.success('Test passed');
Logger.error('Something failed');
```

### Use Custom Assertions
```javascript
import { CustomAssert } from '../src/utils/assertions';

await CustomAssert.isVisible(page, selector);
await CustomAssert.textMatches(page, selector, 'expected text');
await CustomAssert.urlMatches(page, /dashboard/);
```

### Wait for Elements
```javascript
// Wait for element to appear
await page.waitForSelector(selector, { timeout: 5000 });

// Wait for condition
await page.waitForFunction(() => {
    return document.querySelectorAll('button').length > 5;
});
```

### Generate Random Data
```javascript
import { generateRandomEmail, generateRandomString } from '../src/utils/testHelpers';

const email = generateRandomEmail(); // test_abc123@example.com
const randomStr = generateRandomString(10); // random 10-char string
```

### Retry on Failure
```javascript
import { retryAsync } from '../src/utils/testHelpers';

await retryAsync(async () => {
    await page.click(selector);
}, 3, 1000); // 3 retries, 1 second delay
```

## 8. Test Tags

Use tags to organize and run specific tests:

```javascript
// Tag your tests
test('should login @smoke @critical', async () => {
    // ...
});

test('should logout @regression', async () => {
    // ...
});

test('configuration @manual', async () => {
    // ...
});
```

Run specific tags:
```bash
npm run test:smoke      # Run @smoke tests
npm run test:regression # Run @regression tests  
npm run test:critical   # Run @critical tests
```

## 9. Debugging

### Visual Debugging
```bash
npm run test:debug
# Inspector opens - step through actions
```

### UI Mode (Recommended)
```bash
npm run test:ui
# Run tests in interactive UI mode
```

### View Test Trace
```bash
npm run test:trace
# Opens timeline of test execution
```

### Enable Debug Logging
```bash
DEBUG=true npm test
```

### Take Screenshots
```javascript
import { Logger } from '../src/utils/logger';

// In your page object
async takeScreenshot(name) {
    await this.page.screenshot({ 
        path: `test-results/${name}.png`,
        fullPage: true 
    });
    Logger.info(`Screenshot saved: ${name}.png`);
}
```

## 10. Parallel Execution

### Run with Multiple Workers
```bash
npm run test:parallel   # 4 workers (fast)
npm run test:serial     # 1 worker (slow, but stable)
```

Configure in `.env`:
```env
WORKERS=4
```

## 11. Browser Options

### Headed (See Browser)
```bash
npm run test:headed
```

### Headless (Hidden)
```bash
npm test
```

### Slow Motion (Debug)
```env
# In .env
SLOW_MO=500  # 500ms delay between actions
```

## 12. Screenshots & Videos

### Automatic on Failure
```env
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure
```

### Always Capture
```env
SCREENSHOT=always
VIDEO=always
```

### Manual Capture
```javascript
await page.screenshot({ path: 'screenshot.png' });
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests timeout | Increase `TIMEOUT` in `.env` |
| Selector not found | Use inspector tool or codegen to find selector |
| Flaky tests | Add appropriate waits or use `retryAsync` |
| Port in use | Change `BASE_URL` port in `.env` |
| Browsers not found | Run `npx playwright install` |
| Tests run too slow | Use `npm run test:parallel` |

## Resources

- 📖 [Full README](./README.md)
- 🏗️ [Best Practices Guide](./BEST_PRACTICES.md)
- 🎓 [Playwright Docs](https://playwright.dev)
- 💬 [Test Example](./main/example.spec.js)

## Next Steps

1. ✅ Create a Page Object for your main page
2. ✅ Write your first test
3. ✅ Run and verify it works
4. ✅ View the HTML report
5. ✅ Add more tests incrementally

Happy testing! 🚀
