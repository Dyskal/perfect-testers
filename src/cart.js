let items = [];
let sum = -1;

function resetCart() {
  items = [];
  sum = 0;
}

function addItemToCart(newItem) {
  items.push(newItem);
  sum += newItem.price;
}

function removeItemFromCart(item) {
  const index = items.indexOf(item);
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

    // TEARDOWN phase after each test case
    afterEach(() => {
      resetCart(); // clear cart data
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
  });
}
