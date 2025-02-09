import { cart, addToCart, loadCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { search } from "./utils/sharedFunctions.js";
const searchBox = document.querySelector(".search-bar");
loadPage();
async function loadPage() {
  const searchParam = getSearchParam();
  if (!searchParam) {
    await loadProducts();
    await loadCart();
    updateCartQuantity();
    document.querySelector(".loader").classList.add("hidden");
    renderProductsHTML(products);
  } else {
    setParamInSearchBox(searchParam);
    await loadProducts();
    await loadCart();
    updateCartQuantity();
    document.querySelector(".loader").classList.add("hidden");
    renderProductsHTML(getSearchProducts(searchParam));
  }
}
function renderProductsHTML(products) {
  document.querySelector(".js-products-grid").classList.remove("p10");
  if (products.length) {
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
            <div class="product-rating-count link-primary">${
              product.getRating().count
            }</div>
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
  } else {
    document.querySelector(".js-products-grid").innerHTML =
      "No products matched your search.";
    if (
      !document.querySelector(".js-products-grid").classList.contains("p10")
    ) {
      document.querySelector(".js-products-grid").classList.add("p10");
    }
  }
}
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}
function showAddedLabel(productId) {
  document.querySelector(`.added-to-cart-${productId}`).style.opacity = "1";
  setTimeout(() => {
    document.querySelector(`.added-to-cart-${productId}`).style.opacity = "0";
  }, 900);
}

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

function getSearchProducts(searchParam) {
  let productsTemp;
  const searchVal = searchParam.toLowerCase();
  productsTemp = products.filter((product) => {
    const keyWordsStr = product
      .getKeyWords()
      .join()
      .concat(product.getName())
      .toLowerCase();
    if (keyWordsStr.includes(searchVal)) {
      return true;
    }
    return false;
  });
  return productsTemp;
}
function getSearchParam() {
  const searchParam = new URLSearchParams(window.location.search).get("search");
  return searchParam;
}
function setParamInSearchBox(searchParam) {
  searchBox.value = searchParam;
}
