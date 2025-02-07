import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { fetchProducts } from "../data/products.js";
renderCheckoutHeader();

fetchProducts().then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
