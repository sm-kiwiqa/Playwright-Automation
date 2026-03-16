async function login(page, email, password) {
  await page.goto(process.env.BASE_URL);
  await page.getByPlaceholder('Enter Your Email Here').fill(email);
  await page.getByPlaceholder('Enter Password Here').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
}

module.exports = { login };