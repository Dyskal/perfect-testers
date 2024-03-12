/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').Locator} Locator
 */

export class ProductPage {
  /**
   * Create a Product page object model
   *
   * @param {Page} page - the current page
   */
  constructor(page) {
    this.page = page;
    this.page.goto('http://localhost:5173').catch(e => e);
  }

  /**
   * Increase the quantity of a product
   * @param productName - the name of the product to increase
   */
  async increaseProductQuantity(productName) {
    const product = this.page.locator(`.product[data-name="${productName}"]`);
    await product.locator('.increase').click();
  }

  /**
   * Decrease the quantity of a product
   * @param productName - the name of the product to decrease
   */
  async decreaseProductQuantity(productName) {
    const product = this.page.locator(`.product[data-name="${productName}"]`);
    await product.locator('.decrease').click();
  }

  /**
   * Get the current quantity of a product
   * @param productName - the name of the product to get the quantity of
   * @return {Promise<string>} - the current quantity of the product
   */
  async getProductQuantity(productName) {
    const product = this.page.locator(`.product[data-name="${productName}"]`);
    return await product.locator('.quantity').textContent();
  }

  /**
   * Check if the decrease button is disabled
   * @param productName - the name of the product to check if the decrease button is disabled
   * @return {Promise<boolean>} - true if the decrease button is disabled, false otherwise
   */
  async isDecreaseButtonDisabled(productName) {
    const product = this.page.locator(`.product[data-name="${productName}"]`);
    return await product.locator('.decrease').isDisabled();
  }
}
