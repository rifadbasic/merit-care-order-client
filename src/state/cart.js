
import {
  getSavedCart,
  saveCartData,
} from "../utils/storage.js";

// Cart Data
let cart = getSavedCart();

// Get Current Cart
export function getCart() {
  return cart;
}

// Add Product
export function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCartData(cart);
}

// Increase Quantity
export function increaseQuantity(id) {
  const item = cart.find((item) => item.id === Number(id));

  if (!item) return;

  item.quantity++;

  saveCartData(cart);
}

// Decrease Quantity
export function decreaseQuantity(id) {
  const item = cart.find((item) => item.id === Number(id));

  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== Number(id));
  }

  saveCartData(cart);
}

// Remove Product
export function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== Number(id));

  saveCartData(cart);
}

// Clear Cart After Successful Order
export function clearCart() {
  cart = [];

  saveCartData(cart);
}

// Get Cart Count
export function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Get Cart Total
export function getCartTotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}
