const BasePage = require('../common/BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailInput = page.getByPlaceholder('Enter Your Email Here');
    this.passwordInput = page.getByPlaceholder('Enter Password Here');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.forgotPasswordLink = page.getByText('Forgot Your Password?');
    this.logoutButton = page.getByText('Logout', { exact: true });
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

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = LoginPage;