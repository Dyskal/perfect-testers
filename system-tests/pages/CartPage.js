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

  /**
   * Get the name of the first item in the cart
   * @return {Promise<string>} - the name of the first item in the cart
   */
  async getItemName() {
    return await this.page.locator('.item-name').textContent();
  }

  /**
   * Get the number of the first item in the cart
   * @return {Promise<string>} - the number of the first item in the cart
   */
  async getItemNumber() {
    return await this.page.locator('.item-number').textContent();
  }

  /**
   * Get the total price of the first item in the cart
   * @return {Promise<string>} - the total price of the first item in the cart
   */
  async getItemPrice() {
    return await this.page.locator('.item-price').textContent();
  }

  /**
   * Get the sum of all items in the cart
   * @return {Promise<string>} - the sum of all items in the cart
   */
  async getTotalSum() {
    return await this.page.locator('#total-sum').textContent();
  }

  /**
   * Increment the number of the first item in the cart
   */
  async clickMoreButton() {
    await this.page.locator('.more-button').click();
  }

  /**
   * Decrement the number of the first item in the cart
   */
  async clickMinusButton() {
    await this.page.locator('.minus-button').click();
  }

  /**
   * Click the pay button
   */
  async clickPayButton() {
    await this.page.locator('#pay').click();
  }

  /**
   * Get the list of items in the cart
   * @return {Promise<string>} - the list of items in the cart
   */
  async getItemList() {
    return await this.page.locator('#item-list').textContent();
  }
}

// Create a formatter for the SEK currency
export const numberFormatter = Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
});
