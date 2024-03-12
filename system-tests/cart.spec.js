import { expect, test } from '@playwright/test';
import { CartPage, numberFormatter } from './pages/CartPage.js';

test.describe('Cart system testing', () => {
  /** @type {CartPage} */
  let cartPage;
  const itemName = 'Hat';
  const itemPrice = 270;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    // Add a new item to the cart
    await page.locator(`[data-name="${itemName}"] > div > .increase`).click();
  });

  test('test case 1: cart contains the item added', async () => {
    expect(await cartPage.getItemName()).toBe(itemName);
    expect(await cartPage.getItemNumber()).toBe('x1');
    expect(await cartPage.getItemPrice()).toBe('- ' + numberFormatter.format(itemPrice));
    expect(await cartPage.getTotalSum()).toBe(numberFormatter.format(itemPrice));
  });

  test('test case 2: should add one copy of the item when the more button is clicked', async () => {
    await cartPage.clickMoreButton();
    expect(await cartPage.getItemNumber()).toBe('x2');
    expect(await cartPage.getItemPrice()).toBe('- ' + numberFormatter.format(2 * itemPrice));
    expect(await cartPage.getTotalSum()).toBe(numberFormatter.format(2 * itemPrice));
  });

  test('test case 3: should remove one copy of the item when the minus button is clicked', async () => {
    await cartPage.clickMoreButton();
    expect(await cartPage.getItemNumber()).toBe('x2');
    expect(await cartPage.getItemPrice()).toBe('- ' + numberFormatter.format(2 * itemPrice));
    expect(await cartPage.getTotalSum()).toBe(numberFormatter.format(2 * itemPrice));

    await cartPage.clickMinusButton();
    expect(await cartPage.getItemNumber()).toBe('x1');
    expect(await cartPage.getItemPrice()).toBe('- ' + numberFormatter.format(itemPrice));
    expect(await cartPage.getTotalSum()).toBe(numberFormatter.format(itemPrice));
  });

  test('test case 4: should reset the cart when the payment button is clicked', async () => {
    await cartPage.clickPayButton();
    expect(await cartPage.getItemList()).toBe('');
    expect(await cartPage.getTotalSum()).toBe(numberFormatter.format(0));
  });
});
