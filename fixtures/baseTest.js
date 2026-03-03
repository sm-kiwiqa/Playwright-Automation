const base = require('@playwright/test');
const LoginPage = require('../pages/auth/LoginPage');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

exports.expect = base.expect;