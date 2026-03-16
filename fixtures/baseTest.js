const base = require('@playwright/test');
const LoginPage = require('../pages/auth/LoginPage');
const DPRPage = require('../pages/admin/project_management/DPRPage');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dprPage: async ({ page }, use) => {
    await use(new DPRPage(page));
  }
});

exports.expect = base.expect;