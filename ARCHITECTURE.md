# Framework Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEST EXECUTION LAYER                         │
│                    (npm test scripts)                           │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │ playwright.config.js │
                    │  (Configuration)    │
                    └──────────┬───────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
    ┌────────┐            ┌────────┐            ┌────────┐
    │Chromium│            │Firefox │            │WebKit  │
    │Project │            │Project │            │Project │
    └────┬───┘            └────┬───┘            └────┬───┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   TEST RUNNERS      │
                    │  (test files)       │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐   ┌──────────────────┐    ┌──────────────┐
│ Page Objects  │   │ Custom Fixtures  │    │ Test Helpers │
│  (src/pages/) │   │  (src/fixtures/) │    │(src/utils/)  │
└───────┬───────┘   └────────┬─────────┘    └──────┬───────┘
        │                    │                     │
   ┌────▼─────┐          ┌───▼────┐           ┌───▼─────┐
   │BasePage  │          │Custom  │           │Logger   │
   │LoginPage │          │Test    │           │Helpers  │
   │Dashboard │          │Fixture │           │Assertions
   │   etc.   │          │        │           │         │
   └──────────┘          └────────┘           └─────────┘
```

## Component Hierarchy

```
Test Execution
    │
    ├─ Global Setup (global-setup.js)
    │
    ├─ Test Suite (*.spec.js files)
    │   │
    │   ├─ beforeAll
    │   │
    │   ├─ Test Cases
    │   │   │
    │   │   ├─ beforeEach
    │   │   │   │
    │   │   │   ├─ Page Object Methods (Login, Dashboard, etc.)
    │   │   │   │   │
    │   │   │   │   ├─ BasePage Methods
    │   │   │   │   │   ├─ click()
    │   │   │   │   │   ├─ fill()
    │   │   │   │   │   ├─ waitForElement()
    │   │   │   │   │   └─ ... (other methods)
    │   │   │   │   │
    │   │   │   │   └─ Utilities
    │   │   │   │       ├─ Logger.info()
    │   │   │   │       ├─ CustomAssert.isVisible()
    │   │   │   │       └─ Helper functions
    │   │   │   │
    │   │   │   └─ afterEach (cleanup)
    │   │   │
    │   │   └─ Assertions & Verification
    │   │
    │   └─ afterAll
    │
    └─ Global Teardown (global-teardown.js)
```

## File Organization

```
Project Root
│
├── src/                          # Source code
│   ├── pages/                    # Page Objects
│   │   ├── BasePage.js          # Base class
│   │   ├── LoginPage.js         # Login page object
│   │   └── DashboardPage.js     # Dashboard page object
│   │
│   ├── utils/                    # Utilities
│   │   ├── logger.js            # Logging utility
│   │   ├── testHelpers.js       # Helper functions
│   │   └── assertions.js        # Custom assertions
│   │
│   └── fixtures/                 # Test Fixtures
│       └── customTest.js        # Enhanced test fixture
│
├── config/                       # Configuration
│   └── testConfig.js            # Test configuration
│
├── test-data/                    # Test Data
│   └── testData.js              # Test constants
│
├── main/                         # Test Files
│   ├── main.runner.spec.js      # Main runner
│   └── example.spec.js          # Example test
│
├── .github/                      # GitHub
│   └── workflows/
│       └── playwright.yml       # CI/CD workflow
│
├── global-setup.js              # Global setup
├── global-teardown.js           # Global teardown
├── playwright.config.js         # Configuration
├── package.json                 # Dependencies
├── .env                         # Environment vars
├── .env.example                 # Environment template
├── README.md                    # Main documentation
├── QUICKSTART.md                # Quick start guide
├── BEST_PRACTICES.md            # Best practices
├── CONFIGURATION.md             # Configuration guide
└── FRAMEWORK_SETUP.md           # Setup guide
```

## Data Flow

```
┌─────────────────────────────────────────────┐
│          Test Execution Starts              │
└────────────────────┬────────────────────────┘
                     │
     ┌───────────────▼────────────────┐
     │  Load Configuration (.env)     │
     │  config/testConfig.js          │
     └───────────────┬────────────────┘
                     │
     ┌───────────────▼────────────────┐
     │  Initialize Browser            │
     │  (Chromium/Firefox/WebKit)     │
     └───────────────┬────────────────┘
                     │
     ┌───────────────▼────────────────┐
     │  Run Global Setup              │
     │  (global-setup.js)             │
     └───────────────┬────────────────┘
                     │
     ┌───────────────▼────────────────┐
     │  For Each Test File            │
     │  (*.spec.js)                   │
     │  ├─ Run beforeAll hooks        │
     │  │                             │
     │  ├─ For Each Test Case         │
     │  │  ├─ Run beforeEach hooks    │
     │  │  ├─ Execute Test Logic      │
     │  │  │  ├─ Create Page Object   │
     │  │  │  ├─ Call Page Methods    │
     │  │  │  ├─ Use Utilities        │
     │  │  │  └─ Perform Assertions   │
     │  │  └─ Run afterEach hooks     │
     │  │                             │
     │  └─ Run afterAll hooks         │
     └───────────────┬────────────────┘
                     │
     ┌───────────────▼────────────────┐
     │  Run Global Teardown           │
     │  (global-teardown.js)          │
     └───────────────┬────────────────┘
                     │
     ┌───────────────▼────────────────┐
     │  Generate Reports              │
     │  ├─ HTML Report                │
     │  ├─ JSON Report                │
     │  └─ JUnit Report               │
     └───────────────┬────────────────┘
                     │
     ┌───────────────▼────────────────┐
     │  Test Execution Complete       │
     └────────────────────────────────┘
```

## Class Hierarchy

```
BasePage (Parent Class)
├── Common Methods:
│   ├─ navigateTo()
│   ├─ click()
│   ├─ fill()
│   ├─ getText()
│   ├─ isVisible()
│   ├─ waitForElement()
│   ├─ getURL()
│   ├─ takeScreenshot()
│   └─ ... (20+ methods)
│
├── LoginPage (extends BasePage)
│   ├── Selectors:
│   │   ├─ usernameInput
│   │   ├─ passwordInput
│   │   └─ loginButton
│   │
│   └── Methods:
│       ├─ login()
│       ├─ enterUsername()
│       ├─ enterPassword()
│       └─ clickLogin()
│
└── DashboardPage (extends BasePage)
    ├── Selectors:
    │   ├─ userGreeting
    │   ├─ logoutButton
    │   └─ settingsLink
    │
    └── Methods:
        ├─ logout()
        ├─ clickLogout()
        └─ navigateToSettings()
```

## Utility Functions Organization

```
Logger (logger.js)
├── info()
├── success()
├── warning()
├── error()
├── debug()
├── step()
├── section()
└── table()

CustomAssert (assertions.js)
├── isVisible()
├── notVisible()
├── textMatches()
├── urlMatches()
├── hasClass()
├── hasAttribute()
├── isEnabled()
├── isDisabled()
├── elementCount()
├── titleMatches()
├── equals()
└── contains()

TestHelpers (testHelpers.js)
├── retryAsync()
├── waitForCondition()
├── generateRandomString()
├── generateRandomEmail()
├── generateRandomNumber()
├── getTimestamp()
├── formatDate()
├── extractNumber()
├── containsNumber()
├── sleep()
└── retryWithBackoff()
```

## Configuration Flow

```
.env (Environment Variables)
  │
  ├─ BASE_URL, ENVIRONMENT
  ├─ HEADLESS, SLOW_MO
  ├─ TIMEOUT, NAVIGATION_TIMEOUT
  ├─ SCREENSHOT, VIDEO, REPORT_DIR
  ├─ WORKERS, RETRIES
  ├─ DEBUG
  └─ User Credentials
      │
      ▼
config/testConfig.js (Parsed Configuration)
  │
  ├─ config object
  ├─ urls object
  ├─ testUsers object
  ├─ timeouts object
  └─ retryConfig object
      │
      ▼
playwright.config.js (Playwright Setup)
  │
  ├─ Browser Projects
  ├─ Reporters
  ├─ Test Settings
  └─ Device Configurations
      │
      ▼
Test Execution
```

## Report Generation

```
Test Execution
  │
  ├─ Results Collection
  │
  ├─ Report Generation
  │   ├─ playwright-report/
  │   │   ├─ index.html       (Interactive HTML Report)
  │   │   ├─ results.json     (JSON Results)
  │   │   ├─ junit.xml        (JUnit XML)
  │   │   ├─ trace files      (Execution Traces)
  │   │   └─ data/            (Report Data)
  │   │
  │   ├─ Screenshots          (playwright-report/screenshots/)
  │   └─ Videos               (playwright-report/videos/)
  │
  ├─ CI/CD Integration
  │   ├─ GitHub Artifacts
  │   ├─ Jenkins Integration
  │   └─ Azure Pipelines
  │
  └─ Report Analysis
      ├─ Test Results
      ├─ Failure Analysis
      ├─ Performance Metrics
      └─ Trend Analysis
```

## Lifecycle Hooks

```
Global
  │
  ├─ global-setup.js          (Runs once at start)
  │
  ├─ Test Suite
  │   │
  │   ├─ test.describe.beforeAll()    (Before suite)
  │   │
  │   ├─ Test Case 1
  │   │   ├─ test.beforeEach()        (Before each test)
  │   │   ├─ Test execution
  │   │   └─ test.afterEach()         (After each test)
  │   │
  │   ├─ Test Case 2
  │   │   ├─ test.beforeEach()
  │   │   ├─ Test execution
  │   │   └─ test.afterEach()
  │   │
  │   └─ test.describe.afterAll()     (After suite)
  │
  └─ global-teardown.js       (Runs once at end)
```

## Test Execution Parallelization

```
Single Worker (WORKERS=1) - Sequential
Test 1 → Test 2 → Test 3 → Test 4
████    ████    ████    ████
12s     24s     36s     48s

Four Workers (WORKERS=4) - Parallel
Process 1: Test 1 ████
Process 2: Test 2 ████
Process 3: Test 3 ████
Process 4: Test 4 ████
Total: ~12s (4x faster)
```

## Environment Configurations

```
Environment Selection
  │
  ├─ Development
  │   ├─ BASE_URL=http://localhost:3000
  │   ├─ HEADLESS=false (show browser)
  │   ├─ WORKERS=1 (serial execution)
  │   └─ RETRIES=0 (fail immediately)
  │
  ├─ Staging
  │   ├─ BASE_URL=https://staging.app.com
  │   ├─ HEADLESS=true
  │   ├─ WORKERS=2
  │   └─ RETRIES=1
  │
  └─ Production
      ├─ BASE_URL=https://app.com
      ├─ HEADLESS=true
      ├─ WORKERS=4
      └─ RETRIES=2
```

## Security & Best Practices

```
Framework Security
  │
  ├─ .env (gitignored)
  │   └─ Never commit passwords
  │
  ├─ .env.example
  │   └─ Template without secrets
  │
  ├─ Credentials in testConfig.js
  │   └─ Never hardcoded in tests
  │
  ├─ Test Data Separation
  │   └─ testData.js for constants
  │
  └─ Error Handling
      └─ Proper logging and cleanup
```

## Performance Optimization

```
Test Performance
  │
  ├─ Parallel Execution (WORKERS=4)
  ├─ Efficient Selectors (data-testid)
  ├─ Proper Waits (explicit, not sleep)
  ├─ Reusable Page Objects
  ├─ Shared Fixtures
  └─ Optimized Configuration
      └─ Result: 4x faster execution
```

---

**Framework Architecture v1.0.0**  
*Enterprise-grade Playwright testing framework with best practices*
