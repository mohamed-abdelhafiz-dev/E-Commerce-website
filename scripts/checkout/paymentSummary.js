import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import { cart } from "../../data/cart.js";
import { getOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
export function renderPaymentSummary() {
  let itemsNumber = 0,
    totalPrice = 0,
    ShippingPrice = 0,
    totalBeforeTax = 0,
    estimatedTax = 0,
    orderTotal = 0,
    deliveryOptionPrice,
    deliveryOptionId;
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
    const product = getProduct(productId);
    let itemsPrice = product.getPrice();
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

          <button class="place-order-button button-primary js-place-order
          ${!itemsNumber ? "disabled" : ""}"
          
                        >
            Place your order
          </button>
        `;
  document.querySelector(".payment-summary").innerHTML = paymentHTML;
  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log("Please Try again later");
      }
      window.location.href = "orders.html";
    });
}
