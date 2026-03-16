// Login first (important)
await loginPage.navigate('/');

await loginPage.login(
    env.validUser.email,
    env.validUser.password
);