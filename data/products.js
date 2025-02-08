import formatCurrency from "../scripts/utils/money.js";
class Product {
  #id;
  #image;
  #name;
  #rating;
  #priceCents;
  #keywords;
  constructor(productDetails) {
    this.#id = productDetails.id;
    this.#image = productDetails.image;
    this.#name = productDetails.name;
    this.#rating = productDetails.rating;
    this.#priceCents = productDetails.priceCents;
    this.#keywords = productDetails.keywords;
  }
  getId() {
    return this.#id;
  }
  getImage() {
    return this.#image;
  }
  getName() {
    return this.#name;
  }
  getRating() {
    return this.#rating;
  }
  getPrice() {
    return formatCurrency(this.#priceCents);
  }
  getKeyWords() {
    return this.#keywords;
  }

  setId(id) {
    this.#id = id;
  }
  setImage(image) {
    this.#image = image;
  }
  setName(name) {
    this.#name = name;
  }
  setRating(rating) {
    this.#rating = rating;
  }
  setPrice(priceCents) {
    this.#priceCents = priceCents;
  }
  setKeyWords(keywords) {
    this.#keywords = keywords;
  }
  addExtraInfo() {
    return ``;
  }
}

class Clothing extends Product {
  #sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.#sizeChartLink = productDetails.sizeChartLink;
  }
  getSizeChartLink() {
    return this.#sizeChartLink;
  }
  setSizeChartLink(setSizeChartLink) {
    this.#sizeChartLink = setSizeChartLink;
  }
  addExtraInfo() {
    return `
    <a href='${this.#sizeChartLink}' target='_blank'>Show Size Chart</a>`;
  }
}

export function getProduct(productId) {
  return products.find((product) => product.getId() === productId);
}

export let products = [];

export async function loadProducts() {
  try {
    const response = await fetch("https://supersimplebackend.dev/products");
    const productsList = await response.json();
    products = productsList.map((productDetails) =>
      productDetails.type === "clothing"
        ? new Clothing(productDetails)
        : new Product(productDetails)
    );
    products
      .find(
        (product) =>
          product.getImage() ===
          "images/products/women-chiffon-beachwear-coverup-black.jpg"
      )
      .setImage("images/products/wome-chiffon-beachwear-coverup-black.jpg");
  } catch (error) {
    console.log(error);
  }
}
