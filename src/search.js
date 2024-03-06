import { fireEvent } from '@testing-library/dom';
import products from './products.json';

/**
 * Reset the list of products to default values
 */
export function resetList() {
  document.querySelector('#products').innerHTML = products.map((product) => `
      <div class="product">
        <p>${product.name}</p>
        <p>${product.price}</p>
      </div>
    `).join('');
}

/**
 * Set up the search bar events and actions
 */
export function setupSearch() {
  const searchInput = document.querySelector('#search');

  searchInput.form.addEventListener('submit', (e) => e.preventDefault());

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      document.querySelector('#products').innerHTML = products
        .filter((prod) => prod.name.toLowerCase().includes(e.target.value.toLowerCase()))
        .map((product) => `
          <div class="product">
            <p>${product.name}</p>
            <p>${product.price}</p>
          </div>
        `).join('');
    } else if (e.key === 'Escape') {
      searchInput.value = '';
      resetList();
    }
  });

  document.querySelector('#clear').addEventListener('click', resetList);
}

if (import.meta.vitest) {
  describe('Search bar unit testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <form>
          <input id="search"/>
          <button id="clear"></button>
          <div id="products"></div>
        </form>
      `;
      // Set up the search bar events and contents
      setupSearch();
      resetList();
    });

    test('test case 1: resetList should populate products list correctly', () => {
      resetList();
      const productElements = document.querySelectorAll('.product');
      // Expect the product elements to be the same as the products file
      expect(productElements.length).toBe(products.length);
      productElements.forEach((productElement, index) => {
        expect(productElement.textContent).toContain(products[index].name);
        expect(productElement.textContent).toContain(products[index].price);
      });
    });

    test('test case 2: setupSearch should filter products correctly when Enter is pressed', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'hat' }, key: 'Enter' });
      const productElements = document.querySelectorAll('.product');
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes('hat'));
      // Expect the filtered product elements to be the same as the filtered products file
      expect(productElements.length).toBe(filteredProducts.length);
      productElements.forEach((productElement, index) => {
        expect(productElement.textContent).toContain(filteredProducts[index].name);
        expect(productElement.textContent).toContain(filteredProducts[index].price);
      });
    });
  });


  describe('Search bar integration testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <form>
          <input id="search"/>
          <button id="clear"></button>
          <div id="products"></div>
        </form>
      `;
      // Set up the search bar events and contents
      setupSearch();
      resetList();
    });

    test('test case 1: should display only matching products when a valid search term is entered', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'hat' }, key: 'Enter' });
      // Expect the filtered product to be displayed
      expect(document.querySelector('.product').textContent).toContain('Hat');
    });

    test('test case 2: should display no products when an invalid search term is entered', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'invalid' }, key: 'Enter' });
      // Expect the filtered product to be empty
      expect(document.querySelector('.product')).toBeNull();
    });

    test('test case 3: should reset the product list when the clear button is clicked', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'Hat' }, key: 'Enter' });
      // Clear the search form
      fireEvent.click(document.querySelector('#clear'));
      // Expect the products to be full
      expect(document.querySelectorAll('.product').length).toBe(products.length);
    });

    test('test case 4: should display all products when Enter is pressed with an empty search bar', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: '' }, key: 'Enter' });
      // Expect the products to be full
      expect(document.querySelectorAll('.product').length).toBe(products.length);
    });
  });
}
