import { fireEvent } from '@testing-library/dom';
import products from './products.json';

export function resetList() {}

export function setupSearch() {}

if (import.meta.vitest) {
  describe('Search bar integration testing', () => {
    beforeEach(() => {
      // Initialize the document with the correct elements
      document.body.innerHTML = `
        <input id="search"/>
        <button id="clear"></button>
        <div id="products"></div>
      `;
      // Set up the search bar events and contents
      setupSearch();
      resetList();
    });

    test('should filter products when typing in search input a valid item', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'hat' }, key: 'Enter' });
      // Expect the filtered product to be displayed
      expect(document.querySelector('.product').textContent).toContain('Hat');
    });

    test('should filter no products when typing in search input an invalid item', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'hat' }, key: 'Enter' });
      // Expect the filtered product to be empty
      expect(document.querySelector('.product')).toBeNull();
    });

    test('should reset products list when clicking on clear button', () => {
      const input = document.querySelector('#search');
      // Send an event to the search input
      fireEvent.keyUp(input, { target: { value: 'Hat' }, key: 'Enter' });
      // Clear the search form
      fireEvent.click(document.querySelector('#clear'));
      // Expect the products to be full
      expect(document.querySelectorAll('.product')[0].textContent).toContain('Hat');
      expect(document.querySelectorAll('.product')[1].textContent).toContain('Scarf');
    });
  });
}