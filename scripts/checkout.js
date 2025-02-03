import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart.js";
renderElementsHeader();
renderOrderSummary();
renderPaymentSummary();

export function renderElementsHeader() {
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
