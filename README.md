# Playwright Automation Framework

A comprehensive, production-ready Playwright automation testing framework with best practices and modern tooling.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Writing Tests](#writing-tests)
- [Page Object Model](#page-object-model)
- [Test Reports](#test-reports)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Page Object Model (POM)** - Clean test structure with reusable page objects
- **Cross-browser Testing** - Support for Chromium, Firefox, and WebKit
- **Custom Fixtures** - Enhanced test setup and teardown with logging
- **Comprehensive Logging** - Colored console output with structured logging
- **Custom Assertions** - Enhanced assertions for better test readability
- **Test Helpers** - Retry mechanisms, wait conditions, and data generation
- **Environment Configuration** - Support for multiple environments via .env files
- **Test Tagging** - Organize tests with @smoke, @regression, @critical tags
- **Screenshot & Video** - Automatic capture on failures
- **Multiple Reporters** - HTML, JSON, and JUnit XML reports
- **Parallel Execution** - Run tests in parallel for faster execution
- **GitHub Actions** - Pre-configured CI/CD workflows
- **Debug Mode** - Built-in debugging with UI and trace features

## 📦 Prerequisites

- Node.js 16+ 
- npm or yarn
- Git (for version control)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Playwright-Automation
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Create environment file**
```bash
cp .env.example .env
```

## ⚙️ Configuration

### Environment Variables

Edit the `.env` file in the project root to configure:

```env
# Application URL
BASE_URL=http://localhost:3000

# Run in headless mode
HEADLESS=false

# Screenshot/Video settings
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure

# Parallel workers (1 = serial execution)
WORKERS=1

# Test credentials
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=AdminPassword123

USER_USERNAME=user@example.com
USER_PASSWORD=UserPassword123
```

### Playwright Configuration

The `playwright.config.js` file defines:
- Test timeout (60s by default)
- Browser projects (Chrome, Firefox, Safari)
- Reporters (HTML, JSON, JUnit)
- Screenshot/Video capture settings
- Base URL for tests

## 📁 Project Structure

```
Playwright-Automation/
├── src/
│   ├── pages/              # Page Object Model classes
│   │   └── BasePage.js     # Base class with common methods
│   ├── utils/              # Utility functions
│   │   ├── logger.js       # Logger utility
│   │   ├── testHelpers.js  # Test helper functions
│   │   └── assertions.js   # Custom assertions
│   └── fixtures/           # Custom test fixtures
│       └── customTest.js   # Enhanced test fixture
├── config/
│   └── testConfig.js       # Centralized configuration
├── main/                   # Test files and runners
│   └── main.runner.spec.js # Main test runner
├── test-data/
│   └── testData.js        # Test data constants
├── playwright-report/      # Generated HTML reports
├── test-results/          # Test execution results
├── .github/workflows/     # GitHub Actions workflows
├── .env                   # Environment variables (local development)
├── .env.example           # Environment template
├── playwright.config.js   # Playwright configuration
└── package.json           # Project dependencies and scripts
```

## 🎯 Usage

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run by Tags
```bash
# Smoke tests only
npm run test:smoke

# Regression tests
npm run test:regression

# Critical tests
npm run test:critical
```

### Run by Browser
```bash
# Chromium only
npm run test:chrome

# Firefox only
npm run test:firefox

# WebKit (Safari) only
npm run test:webkit

# All browsers
npm run test:all-browsers
```

### Parallel Execution
```bash
# Run with 4 workers
npm run test:parallel

# Run serially (1 worker)
npm run test:serial
```

### View Test Reports
```bash
npm run test:report
```

### Generate Code
```bash
npm run test:codegen
```

### View Test Traces
```bash
npm run test:trace
```

## ✍️ Writing Tests

### Basic Test Structure

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { Logger } from '../src/utils/logger';

test.describe('Login Feature @smoke', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo('/login');
    });

    test('should successfully login with valid credentials @critical', async () => {
        Logger.step(1, 'Enter username');
        await loginPage.enterUsername('admin@example.com');
        
        Logger.step(2, 'Enter password');
        await loginPage.enterPassword('AdminPassword123');
        
        Logger.step(3, 'Click login button');
        await loginPage.clickLogin();
        
        Logger.success('Login completed successfully');
        expect(await loginPage.isDashboardVisible()).toBeTruthy();
    });

    test('should display error with invalid credentials @regression', async () => {
        await loginPage.enterUsername('invalid@example.com');
        await loginPage.enterPassword('WrongPassword');
        await loginPage.clickLogin();
        
        expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
    });
});
```

### Test Tags

Use tags to organize tests:
- `@smoke` - Quick smoke tests
- `@regression` - Full regression suite
- `@critical` - Critical business flow tests
- `@manual` - Tests requiring manual verification

## 🏗️ Page Object Model

### Create a Page Object

```javascript
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class LoginPage extends BasePage {
    // Selectors
    selectors = {
        usernameInput: 'input[name="username"]',
        passwordInput: 'input[name="password"]',
        loginButton: 'button[type="submit"]',
        errorMessage: '.error-message',
        dashboard: '.dashboard-container',
    };

    /**
     * Enter username
     * @param {string} username - Username value
     */
    async enterUsername(username) {
        Logger.info(\`Entering username: \${username}\`);
        await this.fill(this.selectors.usernameInput, username);
    }

    /**
     * Enter password
     * @param {string} password - Password value
     */
    async enterPassword(password) {
        Logger.info('Entering password');
        await this.fill(this.selectors.passwordInput, password);
    }

    /**
     * Click login button
     */
    async clickLogin() {
        Logger.info('Clicking login button');
        await this.click(this.selectors.loginButton);
    }

    /**
     * Check if error message is visible
     * @returns {Promise<boolean>}
     */
    async isErrorMessageVisible() {
        return await this.isVisible(this.selectors.errorMessage);
    }

    /**
     * Check if dashboard is visible
     * @returns {Promise<boolean>}
     */
    async isDashboardVisible() {
        return await this.isVisible(this.selectors.dashboard);
    }
}
```

### Use Page Object in Tests

```javascript
import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateTo();
    await loginPage.enterUsername('user@example.com');
    await loginPage.enterPassword('Password123');
    await loginPage.clickLogin();
    
    expect(await loginPage.isDashboardVisible()).toBeTruthy();
});
```

## 📊 Test Reports

### HTML Report
Generated in `playwright-report/` directory. View with:
```bash
npm run test:report
```

### JSON Report
Available in `playwright-report/results.json` for CI/CD integration

### JUnit XML Report
Available in `playwright-report/junit.xml` for integration with CI systems

## 🔄 CI/CD Integration

### GitHub Actions

The `.github/workflows/playwright.yml` file provides:
- Automated test execution on push and pull requests
- Cross-browser testing (Chrome, Firefox, Safari)
- Scheduled nightly test runs
- Artifact uploads for reports and results

### Running Tests in CI

```bash
npm run test
```

Reports and artifacts are automatically uploaded and available for download.

## 🐛 Troubleshooting

### Tests fail with "Timeout"
Increase timeout in `.env`:
```env
TIMEOUT=120000
```

### Screenshots not capturing
Ensure `SCREENSHOT` is set correctly:
```env
SCREENSHOT=on-failure
# Options: always, on-failure, never
```

### Parallel tests causing issues
Run serially instead:
```bash
npm run test:serial
```

### Port already in use
Change the port in your `.env`:
```env
BASE_URL=http://localhost:3001
```

### Browser not found error
Reinstall Playwright:
```bash
npx playwright install
```

---

**Last Updated:** February 2026

For questions or issues, please refer to the [GitHub Issues](https://github.com/sm-kiwiqa/Playwright-Automation/issues) page.
