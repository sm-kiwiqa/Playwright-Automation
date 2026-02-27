# Playwright Framework Best Practices

## General Principles

### 1. Page Object Model (POM)
- ✅ Create a page class for each distinct page/feature
- ✅ Keep selectors private and centralized
- ✅ Use descriptive method names
- ✅ Extend BasePage for common functionality
- ❌ Don't hardcode selectors in tests

```javascript
// ✅ Good
export class LoginPage extends BasePage {
    selectors = {
        usernameInput: 'input[name="username"]',
        loginButton: 'button[type="submit"]'
    };
    
    async login(username, password) {
        await this.fill(this.selectors.usernameInput, username);
        await this.click(this.selectors.loginButton);
    }
}

// ❌ Bad
test('login', async ({ page }) => {
    await page.fill('input[name="username"]', 'user');
    await page.click('button[type="submit"]');
});
```

### 2. Test Structure
- ✅ One action per test where possible
- ✅ Use descriptive test names
- ✅ Group related tests with `test.describe()`
- ✅ Use `beforeEach` for setup, `afterEach` for cleanup
- ❌ Don't create tests that depend on other tests

```javascript
// ✅ Good
test.describe('Login Page', () => {
    let loginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });
    
    test('should display login form', async () => {
        expect(await loginPage.isFormVisible()).toBeTruthy();
    });
});

// ❌ Bad - Tests dependent on order
test('step 1', async ({ page }) => {...});
test('step 2', async ({ page }) => {...}); // depends on step 1
```

### 3. Selectors
- ✅ Use data-testid attributes when possible
- ✅ Use semantic HTML (buttons, inputs, links)
- ✅ Use accessible selectors (aria-label, role)
- ✅ Keep selectors stable and maintainable
- ❌ Don't use XPath with complex indexes
- ❌ Don't rely on CSS classes that change

```javascript
// ✅ Good - Stable selectors
selectors = {
    loginButton: '[data-testid="login-button"]',
    usernameInput: 'input[name="username"]',
    errorAlert: '[role="alert"]'
};

// ❌ Bad - Unstable selectors
selectors = {
    button: 'body > div > div > button:nth-child(5)',
    input: '.form-container .inputs .username'
};
```

### 4. Assertions
- ✅ Use custom assertions from `CustomAssert`
- ✅ Include meaningful assertion messages
- ✅ Check one thing per assertion
- ❌ Don't chain multiple conditions in one assertion

```javascript
// ✅ Good
await CustomAssert.isVisible(page, selector);
expect(text).toContain('expected');

// ❌ Bad
if (text.includes('expected') && url.includes('/dashboard')) {
    console.log('OK');
}
```

### 5. Waits and Timeouts
- ✅ Use explicit waits with custom timeouts
- ✅ Await all async operations
- ✅ Use `waitForCondition` for complex waits
- ❌ Don't use `sleep()` unless absolutely necessary
- ❌ Don't set overly long timeouts

```javascript
// ✅ Good
await page.waitForSelector(selector, { timeout: 5000 });
await waitForCondition(() => isLoaded(), 5000);

// ❌ Bad
await page.waitForTimeout(10000); // Generic sleep
await page.waitForSelector(selector, { timeout: 60000 }); // Too long
```

### 6. Error Handling
- ✅ Use try-catch for recoverable errors
- ✅ Log errors with Logger
- ✅ Use retry mechanisms for flaky operations
- ✅ Capture screenshots on failure
- ❌ Don't silently ignore errors

```javascript
// ✅ Good
try {
    await action();
} catch (error) {
    Logger.error(`Action failed: ${error.message}`);
    await page.screenshot({ path: 'error.png' });
    throw error;
}

// ❌ Bad
try {
    await action();
} catch (error) {
    // Silently ignore
}
```

### 7. Logging
- ✅ Use Logger utility for all logging
- ✅ Log test steps and important actions
- ✅ Use appropriate log levels (info, success, warning, error)
- ✅ Turn on DEBUG mode for development
- ❌ Don't use `console.log()` directly

```javascript
// ✅ Good
Logger.section('Login Test');
Logger.step(1, 'Enter credentials');
Logger.success('Login successful');
Logger.warning('Slow response detected');

// ❌ Bad
console.log('Starting login...');
console.log('Login done');
```

### 8. Data Management
- ✅ Use `testData` object for constants
- ✅ Generate random data where needed
- ✅ Use test fixtures for setup data
- ✅ Clean up created data in afterEach
- ❌ Don't hardcode test values in tests

```javascript
// ✅ Good
import { testData } from '../test-data/testData';

test('login', async ({ page }) => {
    await loginPage.login(testData.users.admin.username, 
                         testData.users.admin.password);
});

// ❌ Bad
test('login', async ({ page }) => {
    await loginPage.login('admin@example.com', 'AdminPassword123');
});
```

### 9. Test Tags
- ✅ Use consistent tags (@smoke, @regression, @critical)
- ✅ Tag tests appropriately
- ✅ Run subsets using tags
- ❌ Don't create too many tag variations

```javascript
// ✅ Good
test('should login @smoke @critical', async () => {...});
test('should display error @regression', async () => {...});

// Then run:
// npm run test:smoke
```

### 10. Configuration
- ✅ Use `.env` for environment-specific settings
- ✅ Use `testConfig.js` for framework settings
- ✅ Support multiple environments
- ❌ Don't hardcode URLs or credentials

```javascript
// ✅ Good
BASE_URL=http://localhost:3000
ADMIN_USERNAME=admin@example.com

// In code:
import { config, testUsers } from '../config/testConfig';
await page.goto(config.baseURL);
```

## Performance Tips

### 1. Avoid Common Pitfalls
```javascript
// ❌ Slow - Multiple waits
await page.waitForSelector(selector1);
await page.waitForSelector(selector2);

// ✅ Fast - Parallel waits
await Promise.all([
    page.waitForSelector(selector1),
    page.waitForSelector(selector2)
]);
```

### 2. Use Efficient Selectors
```javascript
// ❌ Slow - Complex selector
page.locator('div > div > div > button');

// ✅ Fast - Specific selector
page.locator('[data-testid="submit-button"]');
```

### 3. Reuse Locators
```javascript
// ❌ Inefficient - Creating locator multiple times
const loginBtn = page.locator('[data-testid="login"]');
await loginBtn.click();
// Later...
const loginBtn = page.locator('[data-testid="login"]'); // Recreated!

// ✅ Efficient - Store locator reference
const loginBtn = page.locator('[data-testid="login"]');
await loginBtn.click();
await loginBtn.waitFor({ state: 'visible' });
```

## Code Quality

### 1. Comments and Documentation
- ✅ Add JSDoc comments to all methods
- ✅ Document expected parameters and return types
- ✅ Explain complex logic

```javascript
/**
 * Login with provided credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @throws {Error} If login fails
 */
async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
}
```

### 2. Code Organization
- Keep methods small and focused
- Use meaningful variable names
- Follow consistent naming conventions
- Extract common patterns into utilities

### 3. DRY Principle (Don't Repeat Yourself)
- Create utility functions for repeated logic
- Use inheritance (BasePage) for common methods
- Group related selectors

## Testing Patterns

### 1. Happy Path vs Error Handling
```javascript
test.describe('Login', () => {
    test('should login successfully @smoke @critical', async () => {
        // Happy path
    });
    
    test('should display error on invalid credentials @regression', async () => {
        // Error path
    });
});
```

### 2. Before/After Hooks
```javascript
test.beforeAll(async () => {
    // Runs once before all tests in describe
});

test.beforeEach(async () => {
    // Runs before each test
});

test.afterEach(async () => {
    // Cleanup after each test
});

test.afterAll(async () => {
    // Cleanup after all tests
});
```

## Debugging Tips

### 1. Use Debug Mode
```bash
npm run test:debug
# Click through actions in inspector
```

### 2. Use UI Mode
```bash
npm run test:ui
# Visual test execution
```

### 3. View Traces
```bash
npm run test:trace
# Review test execution traces
```

### 4. Enable Debug Logging
```bash
DEBUG=true npm test
```

## Resources

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Debugging Tests](https://playwright.dev/docs/debug)
