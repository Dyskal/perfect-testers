import { expect, test } from '@playwright/test';
import { ProductPage } from './pages/ProductPage.js';

test.describe('Products system testing', () => {
  /** @type {ProductPage} */
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductPage(page);
  });

  test('test case 1: increase button should increase quantity', async () => {
    const productName = 'Hat';
    await productsPage.increaseProductQuantity(productName);
    const quantity = await productsPage.getProductQuantity(productName);
    expect(quantity).toBe('1');
  });

  test('test case 2: decrease button should decrease quantity', async () => {
    const productName = 'Hat';
    await productsPage.increaseProductQuantity(productName);
    await productsPage.decreaseProductQuantity(productName);
    const quantity = await productsPage.getProductQuantity(productName);
    expect(quantity).toBe('0');
  });

  test('test case 3: decrease button should be disabled when quantity is 0', async () => {
    const productName = 'Hat';
    const isDecreaseButtonDisabled = await productsPage.isDecreaseButtonDisabled(productName);
    expect(isDecreaseButtonDisabled).toBe(true);
  });

  test('test case 4: product quantity should not go below 0', async () => {
    const productName = 'Hat';
    const isDecreaseButtonDisabled = await productsPage.isDecreaseButtonDisabled(productName);
    if (!isDecreaseButtonDisabled) {
      await productsPage.decreaseProductQuantity(productName);
      throw new Error(`Decrease button for product ${productName} is not disabled.`);
    }
    const quantity = await productsPage.getProductQuantity(productName);
    expect(quantity).toBe('0');
  });

  test('test case 5: decrease button should not be disabled when quantity is more than 0', async () => {
    const productName = 'Hat';
    await productsPage.increaseProductQuantity(productName);
    const isDecreaseButtonDisabled = await productsPage.isDecreaseButtonDisabled(productName);
    expect(isDecreaseButtonDisabled).toBe(false);
  });
});
