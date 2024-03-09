/**
 * Product object type
 * @typedef {object} Product
 * @property {string} name - product name
 * @property {number} price - product price
 */
import { numberFormatter, setupProducts } from './product.js';

/**
 * The list of items of the cart
 * @type {Product[]} items
 */
let items = [];
/** The sum of the cart */
let sum = 0;

/**
 * Reset the cart data to default values
 */
function resetCart() {
  items = [];
  sum = 0;
}

/**
 * Add a new item to the cart and update the total sum
 *
 * @param {Product} newItem - new item to add to the cart
 */
export function addItemToCart(newItem) {
  if (newItem.price < 0) {
    throw new Error('Product prices must be non-negative.');
  }

  items.push(newItem);
  sum += newItem.price;

  // Update the app cart
  document.querySelector('#item-list').innerHTML = displayCart();
  addEventToButtons();
}

/**
 * Remove an item from the cart and update the total sum
 *
 * @param {Product} item - item to remove from the cart
 */
export function removeItemFromCart(item) {
  const index = items.findIndex(it => it.name === item.name && it.price === item.price);
  if (index !== -1) {
    items.splice(index, 1);
    sum -= item.price;
  }

  //Update the app cart
  document.querySelector('#item-list').innerHTML = displayCart();
  addEventToButtons();
}

/**
 * Return the list given in parameter without duplicates
 *
 * @param {Product[]} items - item array whose duplicates must be deleted
 * @returns {Product[]} - list without duplicates
 */
function listDistinct(items) {
  const result = [];
  for (const item of items) {
    if (!result.find((res) => res.name === item.name && res.price === item.price)) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Update the app cart based on the item list and sum total
 */
function displayCart() {
  // Update the sum total
  document.querySelector('#total-sum').innerHTML = numberFormatter.format(sum);

  // Construct the item list and return it
  return listDistinct(items).map((item) => {
    const itemNumber = items.filter((it) => it.name === item.name).length;
    return `
      <div class="item" data-name="${item.name}" data-price="${item.price}">
        <p class="item-name">${item.name}</p>
        <p class="item-number">x${itemNumber}</p>
        <p class="item-price">- ${numberFormatter.format(itemNumber * item.price)}</p>
        <button class="more-button">&#10133;</button>
        <button class="minus-button">&#10134;</button>
      </div>
    `;
  }).join('');
}

/**
 * Add events to the buttons added in the item list of the cart
 */
function addEventToButtons() {
  // Button to add more of the item
  document.querySelectorAll('.more-button').forEach((but) => {
    but.addEventListener('click', () => {
      const productData = but.closest('.item').dataset;
      document.querySelector(`[data-name="${productData.name}"] > div > .increase`).click();
    });
  });

  // Button to remove one copy of the item
  document.querySelectorAll('.minus-button').forEach((but) => {
    but.addEventListener('click', () => {
      const productData = but.closest('.item').dataset;
      document.querySelector(`[data-name="${productData.name}"] > div > .decrease`).click();
    });
  });
}

/**
 * Set up the cart events and actions
 */
export function setupCart() {
  resetCart();

  document.querySelector('#pay').addEventListener('click', () => {
    resetCart();
    document.querySelector('#item-list').innerHTML = displayCart();
  });

  document.querySelector('#total-sum').innerHTML = numberFormatter.format(0);
}

if (import.meta.vitest) {
  const { fireEvent } = await import('@testing-library/dom');

  describe('Cart unit testing', () => {
    // SETUP phase before each test case
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <div id="item-list"></div>
        <h2 id="total-sum"></h2>
        <button id="pay"></button>
      `;
      // Set up the cart events and contents
      setupCart();
    });

    test('test case 1: cart is initialized empty', () => {
      expect(items).toStrictEqual([]);
      expect(sum).toBe(0);
    });

    test('test case 2: add a new item to cart', () => {
      const newItem = { name: 'New Item', price: 10 };
      addItemToCart(newItem);
      expect(items).toStrictEqual([newItem]);
      expect(sum).toBe(newItem.price);
    });

    test('test case 3: add more than one item of the same type in the cart', () => {
      const newItem = { name: 'Same Item', price: 30 };
      addItemToCart(newItem);
      addItemToCart(newItem);
      expect(items).toStrictEqual([newItem, newItem]);
      expect(sum).toBe(newItem.price * 2);
    });

    test('test case 4: remove an item from cart', () => {
      const item1 = { name: 'Product 1', price: 20 };
      const item2 = { name: 'Product 2', price: 40 };
      addItemToCart(item1);
      addItemToCart(item2);
      removeItemFromCart(item2);
      expect(items).toStrictEqual([item1]);
      expect(sum).toBe(item1.price);
    });

    test('test case 5: remove more than one item of the same type in the cart', () => {
      const item = { name: 'Product 1', price: 20 };
      addItemToCart(item);
      addItemToCart(item);
      removeItemFromCart(item);
      removeItemFromCart(item); // Remove another item of the same type
      expect(items).toStrictEqual([]);
      expect(sum).toBe(0);
    });

    test('test case 6: payment button resets the cart', () => {
      const item = { name: 'Product 1', price: 20 };
      addItemToCart(item);
      addItemToCart(item);
      expect(items).toStrictEqual([item, item]);
      expect(sum).toBe(item.price * 2);

      resetCart();

      expect(items).toStrictEqual([]);
      expect(sum).toBe(0);
    });

    test('test case 7: remove a non existing item from cart', () => {
      const item = { name: 'Product 1', price: 20 };
      const item2 = { name: 'Product 2', price: 40 };
      addItemToCart(item);
      removeItemFromCart(item2);
      expect(items).toStrictEqual([item]);
      expect(sum).toBe(item.price);
    });

    test('test case 8 : should throw error when adding an item with negative price', () => {
      const newItem = { name: 'Invalid Item', price: -10 };
      expect(() => addItemToCart(newItem)).toThrow('Product prices must be non-negative.');
    });
  });

  describe('ListDistinct unit testing', () => {
    test('test case 1: ListDistinct with an empty list', () => {
      expect(listDistinct([])).toStrictEqual([]);
    });

    test('test case 2: ListDistinct with 2 different items', () => {
      expect(listDistinct([{ name: 'Item', price: 10 }, { name: 'Item2', price: 20 }]))
        .toStrictEqual([{ name: 'Item', price: 10 }, { name: 'Item2', price: 20 }]);
    });

    test('test case 3: ListDistinct with 2 identical items', () => {
      expect(listDistinct([{ name: 'Item', price: 10 }, { name: 'Item', price: 10 }]))
        .toStrictEqual([{ name: 'Item', price: 10 }]);
    });
  });

  describe('App cart unit testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <div id="item-list"></div>
        <h2 id="total-sum"></h2>
        <button id="pay"></button>
      `;
      // Set up the cart events and contents
      setupCart();
    });

    test('test case 1: cart is initialized empty', () => {
      expect(document.querySelector('#item-list').textContent).toStrictEqual('');
    });

    test('test case 2: total sum is initialized to 0 SEK', () => {
      expect(document.querySelector('#total-sum').textContent).toStrictEqual(numberFormatter.format(0));
    });
  });

  describe('App cart integration testing', () => {
    const itemName = 'Hat';
    const itemPrice = 270;

    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <div id="products"></div>
        <div id="item-list"></div>
        <h2 id="total-sum"></h2>
        <button id="pay"></button>
      `;
      // Set up the cart events and contents
      setupProducts();
      setupCart();
      // Add one item in the cart
      addItemToCart({ name: itemName, price: itemPrice });
    });

    test('test case 1: cart contains the item added', () => {
      expect(document.querySelector('.item-name').textContent).toStrictEqual(itemName);
      expect(document.querySelector('.item-number').textContent).toStrictEqual('x1');
      expect(document.querySelector('.item-price').textContent).toStrictEqual('- ' + numberFormatter.format(itemPrice));
      expect(document.querySelector('#total-sum').textContent).toStrictEqual(numberFormatter.format(itemPrice));
    });

    test('test case 2: should add one copy of the item when the more button is clicked', () => {
      // Click on the more button of the item
      fireEvent.click(document.querySelector('.more-button'));
      // Expect the number to be increase by 1
      expect(document.querySelector('.item-number').textContent).toStrictEqual('x2');
      // Expect the price to be doubled
      expect(document.querySelector('.item-price').textContent).toStrictEqual('- ' + numberFormatter.format(2 * itemPrice));
      // Expect the sum total to be doubled
      expect(document.querySelector('#total-sum').textContent).toStrictEqual(numberFormatter.format(2 * itemPrice));
    });

    test('test case 3: should remove one copy of the item when the minus button is clicked', () => {
      // Click on the more button of the item
      fireEvent.click(document.querySelector('.more-button'));
      // Expect the number to be increase by 1
      expect(document.querySelector('.item-number').textContent).toStrictEqual('x2');
      // Expect the price to be doubled
      expect(document.querySelector('.item-price').textContent).toStrictEqual('- ' + numberFormatter.format(2 * itemPrice));
      // Expect the sum total to be doubled
      expect(document.querySelector('#total-sum').textContent).toStrictEqual(numberFormatter.format(2 * itemPrice));

      // Click on the minus button of the item
      fireEvent.click(document.querySelector('.minus-button'));
      // Expect the number to be decreased by 1
      expect(document.querySelector('.item-number').textContent).toStrictEqual('x1');
      // Expect the price to be half the one previously
      expect(document.querySelector('.item-price').textContent).toStrictEqual('- ' + numberFormatter.format(itemPrice));
      // Expect the sum total to be half the one previously
      expect(document.querySelector('#total-sum').textContent).toStrictEqual(numberFormatter.format(itemPrice));
    });

    test('test case 4: should reset the cart when the payment button is clicked', () => {
      // Click on the payment button of the item
      fireEvent.click(document.querySelector('#pay'));
      expect(document.querySelector('#item-list').textContent).toStrictEqual('');
      expect(document.querySelector('#total-sum').textContent).toStrictEqual(numberFormatter.format(0));
    });
  });
}
