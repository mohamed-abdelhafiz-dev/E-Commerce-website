import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import products from "../data/products.js";
import formatCurrency from "./utils/money.js";
import {
  deliveryOptions,
  deliveryOptionDate,
} from "../data/deliveryOptions.js";
import { dayAfter } from "./utils/dayjs.js";

function renderOrderSummary() {
  let orderSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let productName, productImage, productPriceCents;
    products.forEach((product) => {
      if (product.id === productId) {
        productName = product.name;
        productImage = product.image;
        productPriceCents = product.priceCents;
      }
    });

    let deliveryDate = deliveryOptionDate(cartItem.deliveryOptionId);

    orderSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${productId}">
              <div class="delivery-date">
                Delivery date: ${deliveryDate}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${productImage}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${productName}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(productPriceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${
                        cartItem.quantity
                      }</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${productId}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(productId)}
                </div>
              </div>
            </div>
    `;
  });
  document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    const productId = link.dataset.productId;
    link.addEventListener("click", () => {
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
  });

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("click", () => {
      const deliveryOptionId = radio.value;
      const productId = radio.dataset.productId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();

function deliveryOptionsHTML(productId) {
  let deliveryOptionId = "";
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      deliveryOptionId = cartItem.deliveryOptionId;
    }
  });

  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = dayAfter(deliveryOption.deliveryDays);
    const price = !deliveryOption.priceCents
      ? "FREE"
      : `$${formatCurrency(deliveryOption.priceCents)} -`;
    html += ` <div class="delivery-option">
                    <input type="radio" 
                    ${deliveryOption.id === deliveryOptionId ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${productId}"
                      value="${deliveryOption.id}"
                      data-product-id="${productId}">
                    <div>
                      <div class="delivery-option-date">
                        ${deliveryDate}
                      </div>
                      <div class="delivery-option-price">
                        ${price} Shipping
                      </div>
                    </div>
                </div>`;
  });
  return html;
}
