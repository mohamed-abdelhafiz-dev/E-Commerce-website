import { cart, addToCart, loadCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

renderProductsPage();

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}
async function renderProductsPage() {
  await loadProducts();
  await loadCart();
  document.querySelector(".loader").classList.add("hidden");
  updateCartQuantity();
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.getImage()}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.getName()}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.getRating().stars * 10}.png"
            />
            <div class="product-rating-count link-primary">87</div>
          </div>

          <div class="product-price">$${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class='js-quantity-select-${product.getId()}'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

              ${product.addExtraInfo()}

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-${product.getId()}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.getId()}">
             Add to Cart
          </button>
        </div>
  `;
  });
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const productQuantity = Number(
        document.querySelector(`.js-quantity-select-${productId}`).value
      );
      addToCart(productId, productQuantity);
      showAddedLabel(productId);
      updateCartQuantity();
    });
  });
  function showAddedLabel(productId) {
    document.querySelector(`.added-to-cart-${productId}`).style.opacity = "1";
    setTimeout(() => {
      document.querySelector(`.added-to-cart-${productId}`).style.opacity = "0";
    }, 900);
  }
}
