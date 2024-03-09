import { addItemToCart, removeItemFromCart } from './cart.js';
import products from './products.json';

// Create a formatter for the SEK currency
export const numberFormatter = Intl.NumberFormat(Intl.NumberFormat().resolvedOptions().locale, {
  style: 'currency',
  currency: 'SEK',
});

/**
 * Create a product HTML element from a product object
 * @param {Product} product - the product object to create
 * @returns {string} - the product HTML element
 */
function createProduct(product) {
  return `
    <div class="product" data-name="${product.name}" data-price="${product.price}">
      <p>${product.name}</p>
      <img src="img/${product.image}" alt="${product.name} image">
      <p>${numberFormatter.format(product.price)}</p>
      <div>
        <button class="increase">&#10133;</button>
        <span class="quantity">0</span>
        <button class="decrease" disabled>&#10134;</button>
      </div>
    </div>
  `;
}

/**
 * Add event listeners to the product increase and decrease buttons
 */
function addEventListeners() {
  document.querySelectorAll('.increase').forEach((button) => {
    button.addEventListener('click', () => {
      const quantityElement = button.nextElementSibling;
      quantityElement.textContent = String(Number(quantityElement.textContent) + 1);
      quantityElement.nextElementSibling.disabled = false;

      const productData = button.closest('.product').dataset;
      addItemToCart({ name: productData.name, price: Number(productData.price) });
    });
  });

  document.querySelectorAll('.decrease').forEach((button) => {
    button.addEventListener('click', () => {
      const quantityElement = button.previousElementSibling;
      const currentQuantity = Number(quantityElement.textContent);
      if (currentQuantity > 1) {
        quantityElement.textContent = String(currentQuantity - 1);
      } else {
        quantityElement.textContent = '0';
        button.disabled = true;
      }

      const productData = button.closest('.product').dataset;
      removeItemFromCart({ name: productData.name, price: Number(productData.price) });
    });
  });
}

/**
 * Set up the product list events and actions
 */
export function setupProducts() {
  document.querySelector('#products').innerHTML = products.map(createProduct).join('');

  // Add event listeners to products
  addEventListeners();
}

if (import.meta.vitest) {
  const { fireEvent } = await import('@testing-library/dom');

  describe('Search bar unit testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <div id="products"></div>
      `;
      // Set up the search bar events and contents
      setupProducts();
    });

    test('test case 1: setupProducts should populate product list correctly', () => {
      const productElements = document.querySelectorAll('.product');
      // Expect the product elements to be the same as the products file
      expect(productElements.length).toBe(products.length);
      productElements.forEach((productElement, index) => {
        expect(productElement.textContent).toContain(products[index].name);
        expect(productElement.textContent).toContain(products[index].price);
      });
    });

    test('test case 2: createProduct should create a correct product HTML element', () => {
      const product = { name: 'Test Product', price: 100 };
      const productHTML = createProduct(product);
      expect(productHTML).toContain(product.name);
      expect(productHTML).toContain(numberFormatter.format(product.price));
    });
  });

  describe('Search bar integration testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <div id="products"></div>
        <div id="total-sum"></div>
        <div id="item-list"></div>
      `;
      // Set up the product events and contents
      setupProducts();
    });

    test('test case 1: increase button should increase quantity', () => {
      const increaseButtons = document.querySelectorAll('.increase');
      expect(increaseButtons).toHaveLength(products.length);
      increaseButtons.forEach((button) => {
        const quantityElement = button.nextElementSibling;
        // Send an event to the increase button
        fireEvent.click(button);
        // Expect the quantity to increase to 1
        expect(Number(quantityElement.textContent)).toBe(1);
      });
    });

    test('test case 2: decrease button should decrease quantity', () => {
      const decreaseButtons = document.querySelectorAll('.decrease');
      expect(decreaseButtons).toHaveLength(products.length);
      decreaseButtons.forEach((button) => {
        const quantityElement = button.previousElementSibling;
        // Send an event to the increase button first to enable decrease button
        fireEvent.click(quantityElement.previousElementSibling);
        // Expect the quantity to increase to 1
        expect(Number(quantityElement.textContent)).toBe(1);
        // Send an event to the decrease button
        fireEvent.click(button);
        // Expect the quantity to decrease to 0
        expect(Number(quantityElement.textContent)).toBe(0);
      });
    });

    test('test case 3: decrease button should be disabled when quantity is 0', () => {
      const decreaseButtons = document.querySelectorAll('.decrease');
      expect(decreaseButtons).toHaveLength(products.length);
      decreaseButtons.forEach((button) => {
        // Expect the decrease button to be disabled at start
        expect(button.disabled).toBe(true);
        // Send two events to increase then decrease the value
        fireEvent.click(button.previousElementSibling.previousElementSibling);
        fireEvent.click(button);
        // Expect the decrease button to be disabled
        expect(button.disabled).toBe(true);
      });
    });

    test('test case 4: product quantity should not go below 0', () => {
      const decreaseButtons = document.querySelectorAll('.decrease');
      expect(decreaseButtons).toHaveLength(products.length);
      decreaseButtons.forEach((button) => {
        const quantityElement = button.previousElementSibling;
        fireEvent.click(button);
        expect(Number(quantityElement.textContent)).toBe(0);
      });
    });

    test('test case 5: decrease button should not be disabled when quantity is more than 0', () => {
      const decreaseButtons = document.querySelectorAll('.decrease');
      expect(decreaseButtons).toHaveLength(products.length);
      decreaseButtons.forEach((button) => {
        // Send an event to increase first to enable decrease button
        fireEvent.click(button.previousElementSibling.previousElementSibling);
        // Expect the decrease button to be enabled
        expect(button.disabled).toBe(false);
      });
    });
  });
}
