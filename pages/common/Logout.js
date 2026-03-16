// Perform logout with full flow
await loginPage.logoutWithConfirmation();

// Final validation
await expect(page).toHaveURL(paths.login.url);

await expect(
    page.getByRole('button', { name: 'Log In' })
).toBeVisible();