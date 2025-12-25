export async function scrollSidebar(page, class_name, message) {
  const sidebar = page.locator(class_name).first();
  await sidebar.evaluate(
    el => el.scrollTop = el.scrollHeight
  );
  console.log('✔️ ' + message);
}