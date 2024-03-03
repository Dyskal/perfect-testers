import './style/style.css';
import { resetList, setupSearch } from './search.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="left-col">
      <form class="search-bar" onsubmit="event.preventDefault();">
        <span class="search-icon">&#128269;</span>
        <input id="search" placeholder="Search...">
        <button id="clear" type="reset" class="search-icon">&#10060;</button>
      </form>
      <div id="products"></div>
    </div>
    <div class="right-col"></div>
  </div>
`;

setupSearch();
resetList();
