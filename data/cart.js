export let cart;
loadCartFromLocalStorage();
export function loadCartFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

export function addToCart(productId, productQuantity) {
  const matchingItem = cart.find(
    (cartItem) => cartItem.productId === productId
  );
  if (matchingItem) {
    matchingItem.quantity += productQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: productQuantity,
      deliveryOptionId: "1",
    });
  }
  saveCartToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveCartToStorage();
}

export function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveCartToStorage();
}

export function updateQuantityInCart(productId, newQuantity) {
  let matchingItem = cart.find((cartItem) => cartItem.productId === productId);
  matchingItem.quantity = newQuantity;
  saveCartToStorage();
}

export async function loadCart() {
  try {
    const response = await fetch("https://supersimplebackend.dev/cart");
    const cart = await response.text();
    console.log(cart);
  } catch (error) {
    console.log("failed to fetch the cart", error);
  }
}
