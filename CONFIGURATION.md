# Framework Configuration Guide

Complete guide for configuring the Playwright framework for your application.

## Environment Variables (.env)

### Application Configuration

#### BASE_URL
The base URL of the application to test
```env
BASE_URL=http://localhost:3000
# Or for production
BASE_URL=https://app.production.com
```

#### ENVIRONMENT
The environment being tested
```env
ENVIRONMENT=development
# Options: development, staging, production
```

### Browser Configuration

#### HEADLESS
Run tests without showing the browser window
```env
HEADLESS=false
# true = run in headless mode (faster, for CI/CD)
# false = show browser (good for debugging)
```

#### SLOW_MO
Add delay between actions (in milliseconds)
```env
SLOW_MO=0
# Useful for debugging: SLOW_MO=1000 = 1 second delay between actions
```

### Timeout Configuration

#### TIMEOUT
Global timeout for all test operations
```env
TIMEOUT=60000
# Increase if your app is slow: 120000
# Decrease for faster feedback: 30000
```

#### NAVIGATION_TIMEOUT
Timeout for page navigation
```env
NAVIGATION_TIMEOUT=30000
```

### Reporting Configuration

#### SCREENSHOT
When to capture screenshots
```env
SCREENSHOT=only-on-failure
# Options:
# - always: Capture after every action
# - only-on-failure: Only on test failure
# - never: Don't capture
```

#### VIDEO
When to record videos
```env
VIDEO=retain-on-failure
# Options:
# - always: Record all tests
# - retain-on-failure: Only keep videos of failed tests
# - never-on-failure: Record all but delete failed ones
# - never: Don't record
```

#### REPORT_DIR
Directory to save reports
```env
REPORT_DIR=playwright-report
```

### Parallel Execution

#### WORKERS
Number of parallel workers (tests running simultaneously)
```env
WORKERS=1
# 1 = Run tests serially (slower but more stable)
# 4 = Run 4 tests in parallel (faster)
# Recommended: number of CPU cores
```

#### RETRIES
Number of times to retry failed tests
```env
RETRIES=0
# 0 = Don't retry (fail immediately)
# 2 = Retry failed tests up to 2 times
# Recommended: 1 for CI/CD, 0 for local development
```

### Debug Configuration

#### DEBUG
Enable debug logging
```env
DEBUG=false
# true = Show debug messages in console
# false = Only show important messages
```

### Test Credentials

#### ADMIN_USERNAME & ADMIN_PASSWORD
Admin credentials for testing
```env
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=AdminPassword123
```

#### USER_USERNAME & USER_PASSWORD
Regular user credentials
```env
USER_USERNAME=user@example.com
USER_PASSWORD=UserPassword123
```

## Configuration Examples

### Development Setup (Local Testing)
```env
BASE_URL=http://localhost:3000
ENVIRONMENT=development
HEADLESS=false
SLOW_MO=0
TIMEOUT=60000
SCREENSHOT=only-on-failure
VIDEO=never
WORKERS=1
RETRIES=0
DEBUG=false
```

### CI/CD Setup (GitHub Actions)
```env
BASE_URL=https://staging.app.com
ENVIRONMENT=staging
HEADLESS=true
SLOW_MO=0
TIMEOUT=60000
SCREENSHOT=always
VIDEO=retain-on-failure
WORKERS=4
RETRIES=2
DEBUG=false
```

### Debug Setup (Troubleshooting)
```env
BASE_URL=http://localhost:3000
ENVIRONMENT=development
HEADLESS=false
SLOW_MO=500
TIMEOUT=120000
SCREENSHOT=always
VIDEO=always
WORKERS=1
RETRIES=0
DEBUG=true
```

### Performance Setup (Fast Execution)
```env
BASE_URL=http://localhost:3000
ENVIRONMENT=development
HEADLESS=true
SLOW_MO=0
TIMEOUT=30000
SCREENSHOT=never
VIDEO=never
WORKERS=8
RETRIES=1
DEBUG=false
```

## Playwright Configuration (playwright.config.js)

### Modifying Browser Projects

#### Add Mobile Testing
```javascript
// In playwright.config.js, add to projects array:
{
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
},
{
    name: 'iPhone 12',
    use: { ...devices['iPhone 12'] },
}
```

#### Add Tablet Testing
```javascript
{
    name: 'iPad',
    use: { ...devices['iPad Pro'] },
}
```

#### Remove a Browser
```javascript
// Simply comment out or remove from projects array
// projects: [
//     { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
//     // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },  // Removed
//     { name: 'webkit', use: { ...devices['Desktop Safari'] } },
// ]
```

### Start Web Server Automatically

Uncomment in `playwright.config.js` if you need to start a dev server during tests:

```javascript
webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
},
```

### Add Global Setup/Teardown

Uncomment in `playwright.config.js` if you need setup/teardown logic:

```javascript
globalSetup: require.resolve('./global-setup'),
globalTeardown: require.resolve('./global-teardown'),
```

## Running Tests with Different Configurations

### Override via Command Line

Run with specific settings:
```bash
# Override headless mode
HEADLESS=true npm test

# Override workers
WORKERS=8 npm test

# Override timeout
TIMEOUT=120000 npm test

# Combine multiple overrides
HEADLESS=true WORKERS=4 SLOW_MO=500 npm test
```

### Using npm Scripts

```bash
# Development
npm run test:headed

# Debug mode with UI
npm run test:debug
npm run test:ui

# Performance testing
npm run test:parallel

# Single browser
npm run test:chrome

# By tags
npm run test:smoke
npm run test:critical
```

## Test Data Configuration

### Using testData.js

```javascript
// In test-data/testData.js
export const testData = {
    users: {
        admin: {
            username: 'admin@example.com',
            password: 'AdminPass123!'
        }
    },
    apiUrls: {
        users: '/api/users',
        login: '/api/auth/login'
    }
};

// In your tests
import { testData } from '../test-data/testData.js';
await loginPage.login(testData.users.admin.username, testData.users.admin.password);
```

## Reporters Configuration

The framework includes multiple reporters:

### HTML Report
- **Location:** `playwright-report/index.html`
- **View:** `npm run test:report`

### JSON Report
- **Location:** `playwright-report/results.json`
- **Use:** Integration with CI/CD systems

### JUnit Report
- **Location:** `playwright-report/junit.xml`
- **Use:** Integration with Jenkins, Azure Pipelines, etc.

### Console Reporter
- **Output:** Test results in terminal
- **Always enabled:** Shows test progress

## Troubleshooting Configuration Issues

### Tests are too slow
```env
# Use parallel workers
WORKERS=4
# Don't capture videos
VIDEO=never
# Reduce timeout if possible
TIMEOUT=30000
# Don't use slow motion
SLOW_MO=0
```

### Tests are flaky
```env
# Increase timeout
TIMEOUT=90000
# Use retries
RETRIES=2
# Run serially
WORKERS=1
# Increase slow motion
SLOW_MO=500
```

### Need debugging
```env
HEADLESS=false
DEBUG=true
SLOW_MO=1000
WORKERS=1
SCREENSHOT=always
```

### CI/CD failures
```env
RETRIES=2
HEADLESS=true
WORKERS=4
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure
```

## Multiple Environment Configuration

### Setup for Multiple Environments

Create separate env files:
```bash
.env                  # Default/local
.env.staging          # Staging
.env.production       # Production
```

Update package.json scripts:
```json
{
  "scripts": {
    "test": "playwright test",
    "test:staging": "ENV_FILE=.env.staging playwright test",
    "test:prod": "ENV_FILE=.env.production playwright test"
  }
}
```

## Environment Matrix for CI/CD

Run tests across multiple configurations:

```yaml
# .github/workflows/test-matrix.yml
strategy:
  matrix:
    environment: [staging, production]
    browser: [chromium, firefox, webkit]
    
steps:
  - name: Load environment config
    run: cp .env.${{ matrix.environment }} .env
    
  - name: Run tests
    run: BROWSERS=${{ matrix.browser }} npm test
```

## Best Practices

1. ✅ Use `.env` for environment-specific values
2. ✅ Never commit `.env` file with real passwords
3. ✅ Use `.env.example` as a template
4. ✅ Document all configuration options
5. ✅ Use WORKERS=1 for CI/CD initially, then optimize
6. ✅ Set appropriate retries for flaky environments
7. ✅ Capture videos only on failure in CI/CD
8. ✅ Run tests in headless mode in CI/CD
9. ✅ Different configs for local vs CI/CD
10. ✅ Review reports after each test run

## Support

For configuration issues, check:
1. [Quick Start Guide](./QUICKSTART.md)
2. [Best Practices](./BEST_PRACTICES.md)
3. [Playwright Documentation](https://playwright.dev)
4. Project Issues in GitHub
