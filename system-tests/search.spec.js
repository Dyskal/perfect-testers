import { expect, test } from '@playwright/test';
import products from '../src/products.json' assert { type: 'json' };
import { SearchPage } from './pages/SearchPage.js';

test.describe('Search bar system testing', () => {
  /** @type {SearchPage} */
  let searchPage;

  test.beforeEach(({ page }) => {
    searchPage = new SearchPage(page);
  });

  test('test case 1: should display only matching products when a valid search term is entered', async () => {
    await searchPage.search('hat');
    const visibleProducts = await (await searchPage.getProductList()).allTextContents();
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes('hat'));
    expect(visibleProducts.length).toBe(filteredProducts.length);
    visibleProducts.forEach((product, index) => {
      expect(product).toContain(filteredProducts[index].name);
    });
  });

  test('test case 2: should hide all products when an non-existant search term is entered', async () => {
    await searchPage.search('non-existant');
    const visibleProducts = await searchPage.getProductList();
    await expect(visibleProducts).toHaveCount(0);
  });

  test('test case 3: should reset the product list when the clear button is clicked', async () => {
    await searchPage.search('Hat');
    await searchPage.clearSearch();
    const productList = await searchPage.getProductList();
    await expect(productList).toHaveCount(products.length);
  });

  test('test case 4: should display all products with an empty search bar', async () => {
    await searchPage.search('');
    const visibleProducts = await searchPage.getProductList();
    await expect(visibleProducts).toHaveCount(products.length);
  });

  test('test case 5: should display lowercased-matching products when a valid uppercased search term is entered', async () => {
    await searchPage.search('HAT');
    const visibleProducts = await (await searchPage.getProductList()).allTextContents();
    const filteredProducts = products.filter((product) => product.name.toLowerCase().includes('hat'));
    expect(visibleProducts.length).toBe(filteredProducts.length);
    visibleProducts.forEach((product, index) => {
      expect(product).toContain(filteredProducts[index].name);
    });
  });
});
