class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
  }

  async navigate(path = '/') {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async clickByRole(role, name) {
    await this.page.getByRole(role, { name }).click();
  }

  async fillByPlaceholder(placeholder, value) {
    await this.page.getByPlaceholder(placeholder).fill(value);
  }

  async clickByText(text) {
    await this.page.getByText(text).click();
  }
}

module.exports = BasePage;