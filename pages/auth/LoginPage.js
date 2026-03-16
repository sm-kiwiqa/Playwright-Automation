const { expect } = require('@playwright/test');
const BasePage = require('../common/BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailInput = page.getByPlaceholder('Enter Your Email Here');
    this.passwordInput = page.getByPlaceholder('Enter Password Here');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.forgotPasswordLink = page.getByText('Forgot Your Password?');
    this.sidebar = page.locator('.MuiDrawer-paper');
    this.logoutButton = page.locator('li:has-text("Logout")');

    this.logoutPopupText = page.getByText(
      'Are you sure you want to logout?',
      { exact: true }
    );

    this.yesButton = page.getByRole('button', { name: 'Yes' });
    this.noButton = page.getByRole('button', { name: 'No' });
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithRememberMe(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check();
    await this.loginButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async logoutWithConfirmation() {

    await this.sidebar.first().evaluate(el => {
      el.scrollTop = el.scrollHeight;
    });

    // Click Logout
    await this.logoutButton.scrollIntoViewIfNeeded();
    await this.logoutButton.click();

    // Wait for popup
    await expect(this.logoutPopupText).toBeVisible();

    // Click NO first
    await this.noButton.click();

    // Ensure still logged in (popup closed)
    await expect(this.logoutPopupText).not.toBeVisible();

    // Click Logout again
    await this.logoutButton.scrollIntoViewIfNeeded();
    await this.logoutButton.click();

    // Click YES
    await this.yesButton.click();

    // Wait for redirect
    await this.page.waitForURL(process.env.BASE_URL);
  }
}

module.exports = LoginPage;