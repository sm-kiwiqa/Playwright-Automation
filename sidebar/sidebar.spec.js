export async function scrollSidebar(page) {
    const sidebar = page.locator('.MuiDrawer-paper').first();
    await sidebar.evaluate(el => el.scrollTop = el.scrollHeight);
}