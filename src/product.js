import products from './products.json';

/**
 * Create a product HTML element from a product object
 * @param {Product} product - the product object to create
 * @returns {string} - the product HTML element
 */
function createProduct(product) {
  return `
    <div class="product">
      <p>${product.name}</p>
      <p>${product.price}</p>
    </div>
  `;
}

/**
 * Set up the product list events and actions
 */
export function setupProducts() {
  document.querySelector('#products').innerHTML = products.map(createProduct).join('');
}

if (import.meta.vitest) {
  describe('Search bar unit testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <div id="products"></div>
      `;
      // Set up the search bar events and contents
      setupProducts();
    });

    test('test case 1: setupProducts should populate products list correctly', () => {
      const productElements = document.querySelectorAll('.product');
      // Expect the product elements to be the same as the products file
      expect(productElements.length).toBe(products.length);
      productElements.forEach((productElement, index) => {
        expect(productElement.textContent).toContain(products[index].name);
        expect(productElement.textContent).toContain(products[index].price);
      });
    });
  });
}
