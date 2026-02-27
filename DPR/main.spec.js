import { expect } from '@playwright/test';
import { scrollSidebar } from '../sidebar/sidebar.spec';

export async function featureDPR(page) {
  await scrollSidebar(page, '.MuiList-root', 'Sidebar scrolled to top');
  await page.getByRole('link', { name: 'DPR' }).click();
  await page.getByRole('button', { name: 'DPR', exact: true }).click();
  await page.getByRole('button', { name: 'Open' }).click();
  await page.getByRole('option', { name: 'BH001 - BoatHead' }).click();
  await page.getByRole('textbox', { name: 'Select DPR Date' }).click();
  await page.getByRole('option', { name: 'Choose Monday, February 9th,' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('row', { name: '1 008 WMP001 - WindMil' }).getByLabel('Edit DPR').click();
  await page.locator('textarea[name="last24hours"]').click();
  await page.locator('textarea[name="last24hours"]').fill('test');
  await page.locator('textarea[name="next24hours"]').click();
  await page.locator('textarea[name="next24hours"]').fill('test');
  await page.getByRole('checkbox', { name: 'Show full progress summary in' }).check();
  await page.getByRole('checkbox', { name: 'Show Detailed Progress' }).check();
  await page.locator('textarea[name="remarks"]').click();
  await page.locator('textarea[name="remarks"]').fill('remarks');
  await page.getByRole('button', { name: 'Save & Complete' }).click();
  await page.locator('#mui-180').click();
  await page.locator('#mui-180').fill('01');
  await page.locator('#mui-180').click();
  await page.locator('#mui-180').click();
  await page.locator('#mui-180').click();
  await page.locator('#mui-184').click();
  await page.locator('#mui-184').fill('02');
  await page.locator('#mui-184').press('ArrowLeft');
  await page.locator('#mui-184').press('ArrowLeft');
  await page.locator('#mui-184').fill('2');
  await page.locator('#mui-188').click();
  await page.locator('#mui-188').press('ArrowLeft');
  await page.locator('#mui-188').fill('50');
  await page.locator('#mui-192').click();
  await page.locator('#mui-192').click();
  await page.locator('#mui-192').press('ArrowLeft');
  await page.locator('#mui-192').fill('6');
  await page.getByRole('textbox', { name: 'Add Description here...' }).click();
  await page.getByRole('textbox', { name: 'Add Description here...' }).fill('Remarks');
  await page.getByRole('button', { name: 'Save & Complete' }).click();
  await page.locator('input[name="wantdocumentsection"]').check();
  await page.getByRole('textbox', { name: 'Add Description here...' }).click();
  await page.getByRole('textbox', { name: 'Add Description here...' }).fill('Remarks');
  await page.getByRole('button', { name: 'Save & Complete' }).click();
  await page.getByRole('textbox', { name: 'Add Description here...' }).click();
  await page.getByRole('textbox', { name: 'Add Description here...' }).fill('Remarks');
  await page.getByRole('button', { name: 'Save & Complete' }).click();
  await page.getByRole('textbox', { name: 'Add Description here...' }).click();
  await page.getByRole('textbox', { name: 'Add Description here...' }).fill('Remarks');
  await page.getByRole('button', { name: 'Save & Complete' }).click();
  await page.locator('textarea[name="endClientRepresentative"]').click();
  await page.locator('textarea[name="endClientRepresentative"]').fill('ecr');
  await page.locator('textarea[name="clientRepresentative"]').click();
  await page.locator('textarea[name="clientRepresentative"]').fill('cr');
  await page.locator('textarea[name="reynardRepresentative"]').click();
  await page.locator('textarea[name="reynardRepresentative"]').fill('rp');
  await page.locator('#mui-273').click();
  await page.locator('canvas').click({
    position: {
      x: 195,
      y: 288
    }
  });
  await page.locator('canvas').click({
    position: {
      x: 195,
      y: 280
    }
  });
  await page.getByRole('button', { name: 'Sign' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('row', { name: '1 008 WMP001 - WindMil' }).getByLabel('View DPR').click();
  await page.getByRole('img', { name: 'Reynard Representative' }).click();
  await page.getByRole('button').click();
}