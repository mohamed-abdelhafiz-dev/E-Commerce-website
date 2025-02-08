import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
async function loadCheckoutPage() {
  renderCheckoutHeader();
  await loadProducts();
  await loadCart();
  document.querySelector(".loader").classList.add("hidden");
  renderOrderSummary();
  renderPaymentSummary();
}
loadCheckoutPage();
