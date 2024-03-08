import './style/style.css';
import { setupSearch } from './search.js';
import { setupProducts } from './product.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="left-col">
      <form class="search-bar">
        <span class="search-icon">&#128269;</span>
        <input id="search" placeholder="Search..." autocomplete="off">
        <button id="clear" type="reset" class="search-icon">&#10060;</button>
      </form>
      <div id="products"></div>
    </div>
    <div class="right-col"></div>
  </div>
`;

setupProducts();
setupSearch();
