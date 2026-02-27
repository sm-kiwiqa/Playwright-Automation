# Project Structure Overview

This document provides a single, consolidated view of the framework created in this repository.  It shows how the folders and files are organized, describes the responsibilities of each component, and explains the two execution styles (single-module and full-run).

---

## 🗂️ Top-Level Layout

```
Playwright-Automation/
├── src/                          # Framework source code
├── config/                       # Configuration objects
├── test-data/                    # Static test data
├── main/                         # Test specifications
├── .github/                      # CI/CD workflows
├── global-setup.js              # Setup before tests
├── global-teardown.js           # Cleanup after tests
├── playwright.config.js         # Playwright config
├── .env                         # Environment variables
├── .env.example                 # Template for .env
├── package.json                 # Dependencies & npm scripts
├── README.md                    # Full documentation
├── QUICKSTART.md                # Quick start guide
├── BEST_PRACTICES.md            # Guidance for writing tests
├── CONFIGURATION.md             # Config reference
├── ARCHITECTURE.md              # System architecture diagrams
└── STRUCTURE.md                 # (you are here)
```

---

## 📁 Detailed Folder Breakdown

### `src/`
Contains all reusable code used by tests.

```
src/
├── pages/              # Page Object Model classes
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── SidebarPage.js
│   ├── SettingsPage.js
│   ├── FeedbackPage.js
│   ├── ShiftsPage.js
│   ├── ToolboxTalkPage.js
│   ├── ReportPage.js
│   ├── DPRPage.js
│   ├── QHSEManagementPage.js
│   ├── QHSECardsPage.js
│   └── EquipmentManagementPage.js
│
├── utils/              # Utilities and helpers
│   ├── logger.js
│   ├── testHelpers.js
│   └── assertions.js
│
└── fixtures/           # Custom Playwright fixtures
    └── customTest.js
```

- **Page Objects** encapsulate UI interactions for each feature and share `BasePage` common methods.
- **SidebarPage** handles scrolling/clicking the navigation menu.
- **utils/** provide logging, retries, custom assertions, etc.
- **fixtures/customTest.js** extends `@playwright/test` with logging, screenshots, and listeners.

### `config/`

- `testConfig.js` centralizes environment variable parsing and default settings (URLs, timeouts, users).  It is imported by `playwright.config.js` and tests.

### `test-data/`

- `testData.js` holds static user accounts, project info, error messages, and other constants.

### `main/`

```
main/
├── example.spec.js          # Demonstrates best practices
├── main.runner.spec.js      # Full application flow
├── settings.flow.spec.js    # Individual module flows
├── shifts.flow.spec.js
├── toolboxtalk.flow.spec.js
├── report.flow.spec.js
├── dpr.flow.spec.js
├── qhsemanagement.flow.spec.js
├── qhsecards.flow.spec.js
├── feedback.flow.spec.js
└── equipmentmanagement.flow.spec.js
```

- Each `*.flow.spec.js` logs in, navigates to a single module, verifies it, and logs out. They can be run individually.
- `main.runner.spec.js` performs one login then executes all module navigations in sequence before logging out.

### `.github/workflows/`

- Contains `playwright.yml`, which runs tests on push/pull-request across browsers and uploads artifacts.

---

## ⚙️ Execution Patterns

There are two ways to execute tests:

1. **Single‑module run** – run a single `*.flow.spec.js` file. Example:

   ```bash
   npm run test -- main/shifts.flow.spec.js
   ```

   The spec will:
   1. Open login page and authenticate.
   2. Scroll sidebar and navigate to "Shift Details".
   3. Assert the Shifts page loaded.
   4. Scroll/logout element into view and click it (catching errors if the browser closes).
   5. End the test.

2. **Full application flow** – run the runner (default `npm test`). It performs a single login and then calls `navigate()` for every module page object, then logs out once.

   ```bash
   npm test          # executes main.runner.spec.js by default
   ```

---

## 🧩 Utility & Support Files

| File | Purpose |
|------|---------|
| `.env` | Local environment variables (ignored) |
| `.env.example` | Template for `.env` |
| `global-setup.js` | Custom code executed once before all tests |
| `global-teardown.js` | Cleanup after all tests |
| `playwright.config.js` | Browser/projects/reporters/timeout configuration |

---

## ✅ Summary

The framework is structured for **modularity and reuse**: page objects isolate UI concerns, utilities provide common behaviour, and fixture/runner files orchestrate login/logout for either granular or broad test runs.  You can add new modules simply by creating a page object and a corresponding flow spec, then optionally including it in the main runner.

Feel free to reference this document whenever you need a bird’s‑eye view of the architecture.

---

**Last updated:** February 27, 2026