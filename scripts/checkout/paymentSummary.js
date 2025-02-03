import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { cart } from "../../data/cart.js";
import { getOption } from "../../data/deliveryOptions.js";
export function renderPaymentSummary() {
  let itemsNumber = 0,
    totalPrice = 0,
    ShippingPrice = 0,
    totalBeforeTax = 0,
    estimatedTax = 0,
    orderTotal = 0;
  let deliveryOptionPrice, deliveryOptionId;
  if (cart) {
    cart.forEach((cartItem) => {
      itemsNumber += cartItem.quantity;
      deliveryOptionId = cartItem.deliveryOptionId;
      const option = getOption(deliveryOptionId);
      deliveryOptionPrice = Number(formatCurrency(option.priceCents));
      ShippingPrice += deliveryOptionPrice;
    });
  }
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const quantity = cartItem.quantity;
    let itemsPrice;
    const product = getProduct(productId);
    itemsPrice = formatCurrency(product.priceCents);
    totalPrice += itemsPrice * quantity;
  });
  totalBeforeTax = totalPrice + ShippingPrice;
  estimatedTax = totalBeforeTax * 0.1;
  orderTotal = totalBeforeTax + estimatedTax;

  const paymentHTML = `
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${itemsNumber}):</div>
            <div class="payment-summary-money">$${totalPrice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${ShippingPrice.toFixed(
              2
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax.toFixed(
              2
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimatedTax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderTotal.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary 
          ${!itemsNumber ? "disabled" : ""}"
          ${
            itemsNumber
              ? 'onclick = "window.location.href=' + "'orders.html'" + '" '
              : ""
          }
                        >
            Place your order
          </button>
        `;
  document.querySelector(".payment-summary").innerHTML = paymentHTML;
}
