import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import { formatDate } from "./utils/dayjs.js";
import { itemsNumberInCart } from "./checkout/checkoutHeader.js";
import { getProduct, loadProducts } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { search } from "./utils/sharedFunctions.js";
loadOrdersPage();
async function loadOrdersPage() {
  await loadProducts();
  updateQuantityNumber();
  document.querySelector(".loader").classList.add("hidden");

  let ordersHTML = "";
  orders.forEach((order) => {
    const orderId = order.id;
    const orderDate = formatDate(order.orderTime);
    const orderPrice = formatCurrency(order.totalCostCents);
    const orderHeaderHTML = `
      <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${orderPrice}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
      </div>`;
    let orderProductsHTML = ``;
    order.products.forEach((product) => {
      const productInfo = getProduct(product.productId);
      const productName = productInfo.getName();
      const productImage = productInfo.getImage();
      const productQuantity = product.quantity;
      const productArrivingDate = formatDate(product.estimatedDeliveryTime);

      orderProductsHTML += `
            <div class="product-image-container">
              <img src="${productImage}" />
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productName}
              </div>
              <div class="product-delivery-date">Arriving on: ${productArrivingDate}</div>
              <div class="product-quantity">Quantity: ${productQuantity}</div>
              <button class="buy-again-button button-primary js-buy-again-btn" data-product-id='${product.productId}'>
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
`;
    });

    ordersHTML += `
    <div class="order-container">
          ${orderHeaderHTML}

          <div class="order-details-grid">
            ${orderProductsHTML}
          </div>
    </div>`;
  });
  document.querySelector(".orders-grid").innerHTML = ordersHTML;
  document.querySelectorAll(".js-buy-again-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId, 1);
      const lastInnerHTML = button.innerHTML;
      button.innerHTML = "✓ Added";
      setTimeout(() => {
        button.innerHTML = lastInnerHTML;
      }, 1000);
      updateQuantityNumber();
    });
  });
}

function updateQuantityNumber() {
  document.querySelector(".cart-quantity").innerHTML = itemsNumberInCart();
}
const searchBox = document.querySelector(".search-bar");
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    search(searchBox.value);
  }
});
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () => {
  search(searchBox.value);
});
