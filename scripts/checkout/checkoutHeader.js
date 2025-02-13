import { cart } from "../../data/cart.js";
export function itemsNumberInCart() {
  let itemsNumber = 0;
  cart.forEach((cartItem) => {
    itemsNumber += cartItem.quantity;
  });
  return itemsNumber;
}
export function renderCheckoutHeader() {
  document.querySelector(
    ".checkout-header-middle-section"
  ).innerHTML = ` Checkout (
     <a class="return-to-home-link" href="index.html">
       ${itemsNumberInCart()} items
     </a>
   )`;
}
