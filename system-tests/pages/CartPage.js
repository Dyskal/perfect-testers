/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').Locator} Locator
 */

export class CartPage {
  /**
   * Create a Cart page object model
   *
   * @param {Page} page - the current page
   */
  constructor(page) {
    this.page = page;
    this.page.goto('http://localhost:5173').catch(e => e);
  }

  async getItemName() {
    return await this.page.locator('.item-name').textContent();
  }

  async getItemNumber() {
    return await this.page.locator('.item-number').textContent();
  }

  async getItemPrice() {
    return await this.page.locator('.item-price').textContent();
  }

  async getTotalSum() {
    return await this.page.locator('#total-sum').textContent();
  }

  async clickMoreButton() {
    await this.page.locator('.more-button').click();
  }

  async clickMinusButton() {
    await this.page.locator('.minus-button').click();
  }

  async clickPayButton() {
    await this.page.locator('#pay').click();
  }

  async getItemList() {
    return await this.page.locator('#item-list').textContent();
  }
}

// Create a formatter for the SEK currency
export const numberFormatter = Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
});
