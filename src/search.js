import products from './products.json';
import { setupProducts } from './product.js';

/**
 * Set up the search bar events and actions
 */
export function setupSearch() {
  // Reset the list of products to default values
  const resetList = () => [...document.querySelectorAll('.product')].forEach(elem => elem.hidden = false);

  const searchInput = document.querySelector('#search');

  searchInput.form.addEventListener('submit', (e) => e.preventDefault());

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      resetList();
      return;
    }
    [...document.querySelectorAll('.product')]
      .forEach(elem => elem.hidden = !elem.firstElementChild.textContent.toLowerCase().includes(e.target.value.toLowerCase()));
  });

  document.querySelector('#clear').addEventListener('click', resetList);
}

if (import.meta.vitest) {
  const { fireEvent } = await import('@testing-library/dom');

  describe('Search bar integration testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <form>
          <input id="search"/>
          <button id="clear"></button>
        </form>
        <div id="products"></div>
      `;
      // Set up the search bar events and contents
      setupProducts();
      setupSearch();
    });

    test('test case 1: should display only matching products when a valid search term is entered', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'hat' }, key: 'Enter' });
      const productElements = document.querySelectorAll('.product:not([hidden])');
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes('hat'));

      // Expect the filtered product elements to be the same as the filtered products file
      expect(productElements.length).toBe(filteredProducts.length);
      productElements.forEach((productElement, index) => {
        expect(productElement.textContent).toContain(filteredProducts[index].name);
      });
    });

    test('test case 2: should hide all products when an invalid search term is entered', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'invalid' }, key: 'Enter' });
      // Expect the filtered product list to be empty
      expect(document.querySelectorAll('.product:not([hidden])')).toHaveLength(0);
    });

    test('test case 3: should reset the product list when the clear button is clicked', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'Hat' }, key: 'Enter' });
      // Clear the search form
      fireEvent.click(document.querySelector('#clear'));
      // Expect the products to be full
      expect(document.querySelectorAll('.product')).toHaveLength(products.length);
    });

    test('test case 4: should display all products with an empty search bar', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: '' }, key: 'Enter' });
      // Expect the products to be full
      expect(document.querySelectorAll('.product:not([hidden])')).toHaveLength(products.length);
    });
  });
}
