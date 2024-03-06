/**
 * Product object type
 * @typedef {object} Product
 * @property {string} name - product name
 * @property {number} price - product price
 */

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
export function resetCart() {
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
}

if (import.meta.vitest) {
  // cart suite case
  describe('Cart unit testing', () => {
    // SETUP phase before each test case
    beforeEach(() => {
      resetCart();
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

    test('test case 7: remove an non existing item from cart', () => {
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
}
