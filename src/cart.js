let items = [];
let sum = -1;
function resetCart(){}
function addItemToCart(){}
function removeItemFromCart(){}
function calculateSum(){}

if (import.meta.vitest) {

  // cart suite case
  describe('cart', () => {

    // SETUP phase before each test case
    beforeEach(async () => {
    });

    // TEARDOWN phase after each test case
    afterEach(async () => {
      await resetCart(); // clear cart data
    });

    test('test case 1: cart is initialized empty', () => {
      expect(items).toBe([]);
      expect(sum).toBe(0);
    });

    test('test case 2: add a new item to cart', () => {
    });

    test('test case 3: add more than one item of the same type in the cart', () => {
    });

    test('test case 4: remove an item from cart', () => {
    });

    test('test case 5: remove more than one item of the same type in the cart', () => {
    });

    test('test case 6: payment button resets the cart', () => {
    });
  });
}
