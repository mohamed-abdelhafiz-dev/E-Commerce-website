import { cart } from "../../data/cart.js";
export function renderCheckoutHeader() {
  let itemsNumber = 0;
  cart.forEach((cartItem) => {
    itemsNumber += cartItem.quantity;
  });
  document.querySelector(
    ".checkout-header-middle-section"
  ).innerHTML = ` Checkout (
     <a class="return-to-home-link" href="amazon.html">
       ${itemsNumber} items
     </a>
   )`;
}
