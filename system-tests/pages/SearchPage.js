/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').Locator} Locator
 */

export class SearchPage {
  /**
   * Create a Search page object model
   *
   * @param {Page} page - the current page
   */
  constructor(page) {
    this.page = page;
    this.page.goto('http://localhost:5173').catch(e => e);
  }

  /**
   * Search for a product by its name
   *
   * @param {string} term - the product name to search for
   */
  async search(term) {
    const search = this.page.locator('#search');
    await search.fill(term);
    await search.press('Enter');
  }

  /**
   * Clear the search form
   */
  async clearSearch() {
    await this.page.locator('#clear').click();
  }

  /**
   * Get the list of visible products locators
   * @return {Promise<Locator>} - the list of visible products
   */
  async getProductList() {
    return this.page.locator('.product:not([hidden])');
  }
}
