
const CART_KEY = "meritcare_cart";
const ORDERS_KEY = "meritcare_orders";

// Get Cart Data
export function getSavedCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Cart Loading Error:", error);
    return [];
  }
}

// Save Cart Data
export function saveCartData(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Clear Cart Data
export function clearSavedCart() {
  localStorage.removeItem(CART_KEY);
}

// Get Order History
export function getSavedOrders() {
  try {
    const data = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Order History Loading Error:", error);
    return [];
  }
}

// Save Order History
export function saveOrderData(order) {
  const orders = getSavedOrders();

  orders.push(order);

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
