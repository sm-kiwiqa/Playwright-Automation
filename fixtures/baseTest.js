const base = require('@playwright/test');
const LoginPage = require('../pages/auth/LoginPage');
const DPRPage = require('../pages/admin/project_management/DPRPage');
const SettingsPage = require('../pages/admin/settings/SettingsPage');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dprPage: async ({ page }, use) => {
    await use(new DPRPage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  }
});

exports.expect = base.expect;