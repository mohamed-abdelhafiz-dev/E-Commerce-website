import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  updateQuantityInCart,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import {
  deliveryOptions,
  deliveryOptionDate,
} from "../../data/deliveryOptions.js";
import { dayAfter } from "../utils/dayjs.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let orderSummaryHTML = "";
  if (cart.length) {
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      let productName, productImage, productPrice;
      const product = getProduct(productId);
      productName = product.getName();
      productImage = product.getImage();
      productPrice = product.getPrice();

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
                    $${productPrice}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity:
                      <input type="number" min="1" disabled value="${
                        cartItem.quantity
                      }" class="quantity-input quantity-input-${productId}">
                      
                    </span>
                    <span class="update-quantity-link link-primary js-update-link update-${productId}" data-product-id="${productId}">Update</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">Delete</span>
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

    document.querySelectorAll(".js-update-link").forEach((link) => {
      link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        const quantityInput = document.querySelector(
          `.quantity-input-${productId}`
        );

        if (link.innerText === "Update") {
          quantityInput.removeAttribute("disabled");
          link.innerText = "Save";
        } else {
          updateQuantityInCart(productId, Number(quantityInput.value));
          renderOrderSummary();
          renderPaymentSummary();
          renderCheckoutHeader();
        }
      });
    });

    document.querySelectorAll(".js-delete-link").forEach((link) => {
      const productId = link.dataset.productId;
      link.addEventListener("click", () => {
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      });
    });

    document.querySelectorAll(".delivery-option").forEach((option) => {
      option.addEventListener("click", () => {
        const { productId, deliveryOptionId } = option.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  } else {
    orderSummaryHTML = `
        <p>Your cart is empty.</p>
        <a href="amazon.html"
          ><button
            class="button-primary place-order-button"
            style="width: fit-content; font-size: 16px; padding: 8px 15px"
          >
            View products
          </button></a
        >
    `;
    document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;
  }
}

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
    html += `
            <div class="delivery-option"
                  data-product-id="${productId}"
                  data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                    ${deliveryOption.id === deliveryOptionId ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${productId}"
                      value="${deliveryOption.id}"
                      >
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
