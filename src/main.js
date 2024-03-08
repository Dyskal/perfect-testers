import './style/style.css';
import { resetList, setupSearch } from './search.js';
import {setupCart} from "./cart.js";

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="left-col">
      <form class="search-bar">
        <span class="search-icon">&#128269;</span>
        <input id="search" placeholder="Search...">
        <button id="clear" type="reset" class="search-icon">&#10060;</button>
      </form>
      <div id="products"></div>
    </div>
    <div class="right-col">
      <div class="cart">
        <h1 class="cart-title">Your purchases</h1>
        <div id="item-list"></div>
        <div class="separating-line"></div>
        <div class="total-line">
          <h2 class="total-title">TOTAL</h2>
          <h2 id="total-sum"></h2>
          <button id="pay" class="pay-button">PAY</button>
        </div>
      </div>
    </div>
  </div>
`;

setupSearch();
resetList();
setupCart();
