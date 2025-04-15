import { getProduct, loadProducts } from "../data/products.js";
import { orders } from "../data/orders.js";
import { formatDate, today } from "./utils/dayjs.js";
import { search } from "./utils/sharedFunctions.js";
import { itemsNumberInCart } from "./checkout/checkoutHeader.js";
loadTrackingPage();
function updateQuantityNumber() {
  document.querySelector(".cart-quantity").innerHTML = itemsNumberInCart();
}
async function loadTrackingPage() {
  await loadProducts();
  updateQuantityNumber();
  document.querySelector(".loader").classList.add("hidden");

  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");
  const order = orders.find((order) => order.id === orderId);
  const product = order.products.find(
    (product) => product.productId === productId
  );
  const productName = getProduct(productId).getName();
  const productImage = getProduct(productId).getImage();
  const productQuantity = product.quantity;
  const orderTime = order.orderTime;
  const arrivingTime = product.estimatedDeliveryTime;
  const deliveryTime = daysBetweenUTC(orderTime, arrivingTime);
  const passedTime = daysBetweenUTC(orderTime, today());
  const progress = (passedTime / deliveryTime) * 100;
  document.querySelector(
    ".order-tracking"
  ).innerHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatDate(arrivingTime)}
        </div>

        <div class="product-info">
          ${productName}
        </div>

        <div class="product-info">
          Quantity:  ${productQuantity}
        </div>

        <img class="product-image" src=" ${productImage}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;
  document.querySelector(".progress-bar").style.width = `${progress}%`;
}
function daysBetweenUTC(date1, date2) {
  const d1 = Date.UTC(
    new Date(date1).getFullYear(),
    new Date(date1).getMonth(),
    new Date(date1).getDate()
  );
  const d2 = Date.UTC(
    new Date(date2).getFullYear(),
    new Date(date2).getMonth(),
    new Date(date2).getDate()
  );

  return Math.abs((d2 - d1) / (1000 * 60 * 60 * 24));
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
